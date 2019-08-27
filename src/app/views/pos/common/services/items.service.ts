import { Injectable } from '@angular/core';
import { APIConfig } from '../../../../configurations/ApiConfig';
import { HttpUtils } from '../../utils/httpUtils';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private config: APIConfig,
    private httpClient: HttpClient
  ) { }

  getItemByName(itemName): Observable<any>{
    return this.httpClient.get(
      this.config.items.getItemByName(itemName)
    );
  }

  getItemByNameBrandAndCategory(itemName, brandId, categoryId): Observable<any>{
    return this.httpClient.get(
              this.config.items.searchItemsByNameBrandAndCategory(itemName, brandId, categoryId)
           ).pipe(
			            map(response => this.returnResponse(response))
		        );
  }

  returnResponse(response:any){
    return response.response;
  }

}
