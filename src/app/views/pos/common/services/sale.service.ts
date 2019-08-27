import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from '../../../../configurations/ApiConfig';
import { SaleDto } from '../dto/saleDto';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(
    private config: APIConfig,
    private httpClient: HttpClient
  ) { 
    
  }

  addSale(sale:SaleDto){
    return this.httpClient.post(this.config.sale.baseUrl(), sale);
  }
}
