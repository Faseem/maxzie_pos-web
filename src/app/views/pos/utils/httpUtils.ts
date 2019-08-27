import {Headers, Http, RequestOptions} from "@angular/http";
import {Injectable, OnInit} from "@angular/core";
//import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ItemDto } from '../common/dto/itemDto';
import { tap } from 'rxjs/operators';

const globalRequestOptions = new RequestOptions({
  headers: new Headers({'Content-Type': 'application/json'}),
  withCredentials: true
});

const headers = {}

@Injectable({
    providedIn: "root"
})
export class HttpUtils {
  ngOnInit() {
    console.log('init')
  }

  constructor(private _http: HttpClient) {
  }

  httpGet(url: string, headers?: Headers): any {
    return this._http
      .get<ItemDto>(url,{ observe: 'response' });
  }

  /* return this.httpClient.get<Customer[]>(url,{ observe: 'response' }).pipe(tap(res => {
    this.retrieve_pagination_links(res);
  })); */

  httpPost(url: string, body: any, headers?: Headers): any {
    return this._http
      //.post(url, body, (headers != null) ? headers : globalRequestOptions)
      .post(url, body, {
        headers:{'Content-Type': 'application/json'}
      });
  }

  httpPostOnlyHeaders(url: string, body: any, headers?: Headers): any {
    return this._http
    //.post(url, body, (headers != null) ? headers : globalRequestOptions)
    .post(url, body,  {
        headers:{'Content-Type': 'application/json'}
      });
  }

  httpPut(url: string, body: any, headers?: Headers): any {
    return this._http
      //.put(url, body, (headers != null) ? headers : globalRequestOptions)
      .put(url, body, {
        headers:{'Content-Type': 'application/json'}
      });
  }

  httpPatch(url: string, body: any, headers?: Headers): any {
    return this._http
      .patch(url, body, {
        headers:{'Content-Type': 'application/json'}
      });
  }

  retunJson(res){
      return res.json();
  }

  
}
