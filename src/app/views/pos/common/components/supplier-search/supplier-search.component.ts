import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SupplierDto } from '../../dto/supplierDto';

@Component({
  selector: 'app-supplier-search',
  templateUrl: './supplier-search.component.html',
  styleUrls: ['./supplier-search.component.scss']
})
export class SupplierSearchComponent implements OnInit {

  @Output() suplierSelectedEvent = new EventEmitter<SupplierDto>();
  
  public urlSupplier = 'assets/mock/data.json';
  public apiSupplier = 'http';
  public paramsSupplier = {};
  public querySupplier = '';

  supplierSelected: SupplierDto = SupplierDto.getNewInstance();

  constructor() { }

  ngOnInit() {
  }

  onSupplierSelected(){
    
  }

}
