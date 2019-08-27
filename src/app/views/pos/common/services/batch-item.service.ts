import { Injectable } from '@angular/core';
import { APIConfig } from '../../../../configurations/ApiConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchItemService {

  constructor(
    private config: APIConfig,
    private httpClient: HttpClient
  ) { }

  getAvailableItemsByItemId(itemId): Observable<any>{
    return this.httpClient.get(
      this.config.batchItems.getAvailableBatchItemsByItemId(itemId)
    );
  }
}
