import { Component, OnInit } from '@angular/core';
import { CustomerDto } from '../../dto/customerDto';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {

  public urlCustomer = 'assets/mock/data.json';
  public apiCustomer = 'http';
  public paramsCustomer = {};
  public queryCustomer = '';

  customerSelected: CustomerDto = CustomerDto.getNewInstance();

  constructor() { }

  ngOnInit() {
  }

  onCustomerSelected(customerName){
    console.log(customerName);
  }

}
