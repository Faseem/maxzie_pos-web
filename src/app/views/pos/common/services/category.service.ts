import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from '../../../../configurations/ApiConfig';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private config: APIConfig,
    private httpClient: HttpClient
  ) { }

  getCategoryByName(name):any{
    return this.httpClient.get(
      this.config.categories.getCategoryByName(name)
    );
  }
}
