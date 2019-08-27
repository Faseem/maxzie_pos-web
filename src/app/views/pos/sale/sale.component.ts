import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { APIConfig } from '../../../configurations/ApiConfig';
import { ItemDto } from '../common/dto/itemDto';
import { ItemsService } from '../common/services/items.service';
import { BatchItemService } from '../common/services/batch-item.service';
import { BatchItemDto } from '../common/dto/batchItem';
import { SaleDto } from '../common/dto/saleDto';
import { SaleItemDto } from '../common/dto/saleItem';
import { CustomerDto } from '../common/dto/customerDto';
import { SaleService } from '../common/services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})

  
export class SaleComponent implements OnInit {

  public url = 'assets/mock/data.json';
  public api = 'http';
  public params = {};
  public query = '';
  
  public urlCustomer = 'assets/mock/data.json';
  public apiCustomer = 'http';
  public paramsCustomer = {};
  public queryCustomer = '';
  
  discountRupee:number;
  discountPercentage:number;

  discountRupeeTotalSale:any;
  discountPercentageTotalSale:any;

  itemSelected:ItemDto;
  batchItems: Array<BatchItemDto> = [];
  batchItemSelected:BatchItemDto;
  sale:SaleDto = SaleDto.getNewInstance();
  saleItem:SaleItemDto = SaleItemDto.getNewInstance();

  customerSelected: CustomerDto = CustomerDto.getNewInstance();

  buttomText:string = 'ADD';

  selectedIndex:number;


  public itemSearchSelected (result) {
    this.query = result;
    this.setItemByItemName(result);
  }

  constructor(
    private apiConfig: APIConfig,
    private itemsService: ItemsService,
    private batchItemServices: BatchItemService,
    private saleService: SaleService
  ) 
  { }

  ngOnInit() {
    this.url = this.apiConfig.items.getItemNamesByBrandAndCategory()
  }

  onItemSelectedEvent(event: ItemDto){
    this.itemSelected = event;
    this.loadAvailableBatchItems();
  }

  setItemByItemName(itemName){
    this.itemsService.getItemByName(itemName)
    .subscribe(res=>{
      this.itemSelected = ItemDto.getNewInstance().fromJSON(res.response);
      this.loadAvailableBatchItems();
    },
    err=>{
      console.log(err);
    });
  }

  loadAvailableBatchItems(){
    this.batchItems = [];
    this.batchItemSelected = undefined;
    this.batchItemServices.getAvailableItemsByItemId(this.itemSelected.itemId)
    .subscribe(res=>{
      if(res.response){
        res.response.forEach(bi=>{
          let batchItem:BatchItemDto = BatchItemDto.getNewInstance().fromJSON(bi);
          if(this.sale.saleItems){
            this.sale.saleItems.forEach(si=>{
              if(si.batchItemId.batchItemId == batchItem.batchItemId){
                batchItem.availableQuantity = batchItem.availableQuantity - si.saleItemQuantity;
              }
            });
          }
          this.batchItems.push(batchItem);
        });
        if(this.batchItems.length==1){
          this.selectBatchItem(this.batchItems[0]);
        }
      }
      console.log(this.batchItems);
    },
    err=>{
      console.log(err);
    });
  }

  selectBatchItem(batchItem: BatchItemDto){
    this.discountPercentage = undefined;
    this.discountRupee = undefined;
    this.batchItemSelected = batchItem;
    this.saleItem = SaleItemDto.getNewInstance();
    this.saleItem.batchItemId = BatchItemDto.getNewInstance().fromJSON(batchItem);
    this.saleItem.saleItemSellingPrice = this.batchItemSelected.sellingPrice;
    this.saleItem.saleItemQuantity = 1;
    this.saleItem.saleItemTotalPrice = this.saleItem.saleItemSellingPrice * this.saleItem.saleItemQuantity;
    this.saleItem.saleItemTotalPriceAfterDiscount = this.saleItem.saleItemSellingPrice * this.saleItem.saleItemQuantity;
  }

  isSelected(batchItem){
    return batchItem == this.batchItemSelected;
  }

  onChangeSelligPrice(){
    this.setSaleItemPrices();
  }

  onChangeQuantity(){
    if(this.batchItemSelected.availableQuantity<this.saleItem.saleItemQuantity){
      this.saleItem.saleItemQuantity = this.batchItemSelected.availableQuantity;
    }
    if(this.saleItem.saleItemQuantity<1){
      this.saleItem.saleItemQuantity = 1;
    }

    if(!this.saleItem.saleItemQuantity){
      this.saleItem.saleItemQuantity = 1;
    }
    this.setSaleItemPrices();
  }

  onChangeDiscountPercentage(){
    if(!this.discountPercentage || this.discountPercentage>100 || this.discountPercentage<0){
      this.discountPercentage = 0;
      this.discountRupee = 0.00;
    }
    this.discountRupee = (this.discountPercentage/100)*this.saleItem.saleItemTotalPrice;
    this.setSaleItemPrices();
  }

  onChangeDiscountRupee(){
    if(!this.discountRupee || this.discountRupee>this.saleItem.saleItemTotalPrice || this.discountRupee<0){
      this.discountRupee = 0.00;
      this.discountPercentage = 0;
    }
    this.discountPercentage = (this.discountRupee/this.saleItem.saleItemSellingPrice)*100;
    this.setSaleItemPrices();
  }

  setSaleItemPrices(){
    if(!this.discountRupee){
      this.discountRupee = 0.00;
      this.discountPercentage = 0;
    }
    this.saleItem.saleItemTotalPrice = this.saleItem.saleItemSellingPrice * this.saleItem.saleItemQuantity;
    this.saleItem.saleItemDiscount = this.discountRupee;
    this.saleItem.saleItemTotalPriceAfterDiscount = this.saleItem.saleItemTotalPrice - this.discountRupee;
  }

  addSaleItem(){
    /* if(this.buttomText=='UPDATE'){
      this.sale.saleItems.splice(this.selectedIndex, 1);
    } */
    this.buttomText = 'ADD';
    this.sale.saleItems.push(SaleItemDto.getNewInstance().fromJSON(this.saleItem));
    this.sale.saleNumberOfItems = this.sale.saleNumberOfItems ? this.sale.saleNumberOfItems+1 : 1;
    this.sale.saleTotal = this.sale.saleTotal ? this.sale.saleTotal+(this.saleItem.saleItemTotalPrice) : this.saleItem.saleItemTotalPrice;
    this.sale.saleTotalAfterDiscount = this.sale.saleTotalAfterDiscount ? this.sale.saleTotalAfterDiscount+this.saleItem.saleItemTotalPriceAfterDiscount : this.saleItem.saleItemTotalPriceAfterDiscount;
    this.sale.saleTotalDiscount = this.sale.saleTotalDiscount ? this.sale.saleTotalDiscount+this.saleItem.saleItemDiscount : this.saleItem.saleItemDiscount;
    this.resetItemSelectForm()
  }

  saleItemReselected(saleItem: SaleItemDto, index){
    this.discountPercentageTotalSale = 0;
    this.discountRupeeTotalSale = 0.00;
    this.selectedIndex = index;
    this.sale.saleItems.splice(index, 1);
    this.discountPercentage = (saleItem.saleItemDiscount/saleItem.saleItemSellingPrice)*100;
    this.discountRupee = saleItem.saleItemDiscount;
    this.batchItems = [];
    this.saleItem = SaleItemDto.getNewInstance().fromJSON(saleItem);
    this.batchItemSelected = BatchItemDto.getNewInstance().fromJSON(saleItem.batchItemId);
    this.batchItems.push(this.batchItemSelected);
    this.buttomText = 'UPDATE';
    this.resetSaleValues();
  }

  removeSaleItem(saleItem){
    const index = this.sale.saleItems.indexOf(saleItem, 0);
    if (index > -1) {
      this.sale.saleItems.splice(index, 1);
    }
    this.resetSaleValues();
  }

  resetItemSelectForm(){
    this.query = '';
    this.saleItem = SaleItemDto.getNewInstance();
    this.discountPercentage = undefined;
    this.discountRupee = undefined;
    this.batchItemSelected = undefined;
    this.batchItems = [];
    this.itemSelected = undefined;
  }

  isAddItemDisabled(){
    return this.batchItemSelected == undefined || 
    this.saleItem.saleItemSellingPrice == undefined ||
    this.saleItem.saleItemSellingPrice <= 0 ||
    this.saleItem.saleItemQuantity == undefined ||
    this.saleItem.saleItemQuantity <= 0;
  }

  onCustomerSelected(customerName){
    this.sale.customerId.customerName = customerName;
  }

  onDiscountRupeeTotalSaleChanged(){
    if(!this.discountRupeeTotalSale || this.discountRupeeTotalSale<0 || this.discountRupeeTotalSale>this.sale.saleTotalAfterDiscount){
      this.discountPercentageTotalSale = 0;
      this.discountRupeeTotalSale = 0.00;
    }else{
      this.discountPercentageTotalSale = (this.discountRupeeTotalSale/this.sale.saleTotalAfterDiscount)*100;
    }
    this.resetSaleValues();
  }

  onDiscountPercntageTotalSaleChanged(){
    if(!this.discountPercentageTotalSale || this.discountPercentageTotalSale<0 || this.discountPercentageTotalSale>100){
      this.discountPercentageTotalSale = 0;
      this.discountRupeeTotalSale = 0.00;
    }else{
      this.discountRupeeTotalSale = (100-this.discountPercentage)*this.sale.saleTotalAfterDiscount;
    }
    this.resetSaleValues();
  }

  resetSaleValues(){
    let totalSalePrice:number = 0.00;
    let totalSaleDiscount: number = 0.00;
    let totalSalePriceAfterDiscount: number = 0.00;
    let numberOfSaleItem: number = 0;

    this.sale.saleItems.forEach(si=>{
      totalSalePrice += si.saleItemTotalPrice;
      totalSaleDiscount += si.saleItemDiscount;
      totalSalePriceAfterDiscount += si.saleItemTotalPriceAfterDiscount;
      numberOfSaleItem +=1;
    });

    if(this.discountRupeeTotalSale){
      if(this.discountRupeeTotalSale > totalSalePriceAfterDiscount || this.discountRupeeTotalSale < 0){
        this.discountRupeeTotalSale = 0.00;
        this.discountPercentageTotalSale = 0;
      }else{
        totalSaleDiscount = totalSaleDiscount + this.discountRupeeTotalSale;
        totalSalePriceAfterDiscount = totalSalePriceAfterDiscount - this.discountRupeeTotalSale
      }
    }

    this.sale.saleTotal = totalSalePrice;
    this.sale.saleTotalAfterDiscount = totalSalePriceAfterDiscount;
    this.sale.saleTotalDiscount = totalSaleDiscount;
    this.sale.saleNumberOfItems = numberOfSaleItem;
  }

  saveSale(){
    this.saleService.addSale(this.sale)
    .subscribe(res=>{
      console.log(res);
    },
    err=>{
      console.log(err);
    })
  }

}
