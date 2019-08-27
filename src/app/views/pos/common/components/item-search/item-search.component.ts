import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { ItemDto } from '../../dto/itemDto';
import { APIConfig } from '../../../../../configurations/ApiConfig';
import { CategoryDto } from '../../dto/categoryDto';
import { BrandDto } from '../../dto/brand';
import { GeneralService } from '../../services/general.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { CategoryService } from '../../services/category.service';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit {

  @ViewChild('addCategoryModal', {static: false}) public primaryModal: ModalDirective;

  @Output() itemSelectedEvent = new EventEmitter<ItemDto>();
  @Output() brandChangedEvent = new EventEmitter<ItemDto>();
  @Input() isEnableAdding:boolean;

  public url = 'assets/mock/data.json';
  public api = 'http';
  public params = {};
  public query = '';

  model:any;

  categories: Array<CategoryDto> = [];
  brands: Array<BrandDto> = [];

  itemSelected:ItemDto;

  categorySelected:CategoryDto = CategoryDto.getNewInstance();
  brandSelected:BrandDto = BrandDto.getNewInstance();

  isCategorySeaching:boolean = false;
  categorySearchedName:string;
  categorySearchedDescription:string;

  search = (text$: Observable<string>) =>
    text$.pipe(
		debounceTime(300),
		distinctUntilChanged(),
		tap(() => console.log('searching')),
		switchMap(term =>
		  this.itemsService
		  .getItemByNameBrandAndCategory(
			  term,
        this.brandSelected.brandId,
        this.categorySelected.categoryId)
			  .pipe(
				tap(() => console.log("OK")),
				catchError(() => {
				return of([]);
				}
			   )
			  )
		),
		tap(() => console.log("searched"))
	)

  constructor(
    private itemsService: ItemsService,
    private apiConfig: APIConfig,
    private generalService: GeneralService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.url = this.apiConfig.items.getItemNamesByBrandAndCategory();
    this.loadBrandsAndCategories();
  }

  public itemSearchSelected (result) {
    if(result){
      if(result.itemId){
        //this.query = result;
        this.model = result.itemName;
        this.itemSelectedEvent.emit(ItemDto.getNewInstance().fromJSON(result));
        //this.setItemByItemNameBrandAndCategory(result);
      }  
    }
  }

  getCategoryName(){
    return this.categorySelected ? this.categorySelected.categoryName : 'Select Category';
  }
  getBrandName(){
    return this.brandSelected ? this.brandSelected.brandName : 'Select Brand';
  }

  onCategoryChanged(category){
    this.categorySelected = category;
    this.params = this.brandSelected && this.categorySelected  ?
      {
        categoryId: this.categorySelected.categoryId,
        brandId:this.brandSelected.brandId
      } :
      {};
  }

  onBrandChanged(brand){
    this.brandSelected = brand;
    this.params = this.brandSelected && this.categorySelected  ?
      {
        categoryId: this.categorySelected.categoryId,
        brandId:this.brandSelected.brandId
      } :
      {};
  }


  loadBrandsAndCategories(){
    this.generalService.getAvailableItemsByItemId()
    .subscribe(res=>{
      this.brands = res.response.brandDtos;
      this.categories = res.response.categoryDtos;
      this.categorySelected = this.categories ? this.categories.length == 1 ? this.categories[0] : undefined : undefined;
      this.brandSelected = this.brands ? this.brands.length == 1 ? this.brands[0] : undefined : undefined;
      this.params = this.brandSelected && this.categorySelected  ?
      {
        categoryId: this.categorySelected.categoryId,
        brandId:this.brandSelected.brandId
      } :
      {};
    },
    err=>{
      console.log(err);
    });
  }

  /* setItemByItemNameBrandAndCategory(itemName){
    this.itemsService.getItemByNameBrandAndCategory(itemName, this.brandSelected.brandId, this.categorySelected.categoryId)
    .subscribe(res=>{
      this.itemSelected = ItemDto.getNewInstance().fromJSON(res.response);
      this.itemSelectedEvent.emit(this.itemSelected);
    },
    err=>{
      console.log(err);
    });
  } */

  isCategoryAvailable(){
    this.isCategorySeaching = true;
    this.categoryService.getCategoryByName(this.categorySearchedName)
     .subscribe(res=>{
      let category = CategoryDto.getNewInstance().fromJSON(res.response); 
      this.categorySearchedName = category.categoryName;
      this.categorySearchedDescription = category.categoryDescription;
      // /this.isCategorySeaching = false;
     },
     er=>{
      this.isCategorySeaching = false;
     })
  }

  isAddCategoryDisabled(){
    if(this.isCategorySeaching){
      return true;
    }
    if(!this.categorySearchedName || !this.categorySearchedDescription){
      return true;
    }
    return false;
  }

  

}
