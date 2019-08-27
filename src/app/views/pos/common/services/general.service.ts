import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from '../../../../configurations/ApiConfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private config: APIConfig,
    private httpClient: HttpClient
  ) { 

  }

  getAvailableItemsByItemId(): Observable<any>{
    return this.httpClient.get(
      this.config.generalService.getBrandsAndCategories()
    );
  }
}
