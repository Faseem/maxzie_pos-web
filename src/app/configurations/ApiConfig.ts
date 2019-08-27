import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class APIConfig {

  // ---------------------------------------------------------------------------------
  // ------------------------------ ROOT CONFIGURATIONS ------------------------------
  //public ROOT_URL = RootUrls.DEFAULT_API_URL;
  public ROOT_URL = environment.BACKEND_URL;


  // ------------------------------------ LOGIN --------------------------------------
  public AUTHENTICATE = 'login';  //  authenticate
  public AUTHENTICATE_URL = this.ROOT_URL + this.AUTHENTICATE;  //  Get authenticate url

  // --------------------------------- items -------------------------------------
  public items = {
    baseUrl: () => {
      return this.ROOT_URL + '/item';
    },
    getItems: () => {
      return this.items.baseUrl();
    },
    getItemNamesByBrandAndCategory: () => {
        return this.items.baseUrl()+'/names';
    },
    getItemByName: (itemName) => {
        return this.items.baseUrl()+'/names/'+itemName;
    },

    getItemByNameBrandAndCategory : (itemName, brandId, categoryId) => {
      return this.items.baseUrl()+'/names/'+itemName;
    },

    searchItemsByNameBrandAndCategory : (itemName, brandId, categoryId) => {
      return this.items.baseUrl()+'/search/byCategoryByBrandAndItemName?'+
      'nameToSeach='+itemName +
      '&categoryId='+categoryId +
      '&brandId='+brandId;
    }


  }

   // --------------------------------- batchItems -------------------------------------
   public batchItems = {
    baseUrl: () => {
      return this.ROOT_URL + '/batchItems';
    },
    getAvailableBatchItemsByItemId: (itemId) => {
      return this.batchItems.baseUrl()+'/availableItems/'+itemId;
    }
  }

  // --------------------------------- General Service -------------------------------------
  public generalService = {
    baseUrl: () => {
      return this.ROOT_URL + '/generalService';
    },
    getBrandsAndCategories: () => {
      return this.generalService.baseUrl()+'/barndsAndItems';
    }
  }

  // --------------------------------- sale -------------------------------------
  public sale = {
    baseUrl: () => {
      return this.ROOT_URL + '/sale';
    }
  }

  // --------------------------------- categories -------------------------------------
  public categories = {
    baseUrl: () => {
      return this.ROOT_URL + '/category';
    },
    getCategoryByName: (name) => {
      return this.categories.baseUrl()+'/names/'+name;
    }
  }
}
