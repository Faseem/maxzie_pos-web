
export class BrandDto {
    brandId: number;
    brandEnteredDate: Date;
    brandName: string;
    brandDescription: string;
    
    public static getNewInstance(): BrandDto{
        var instance = new BrandDto();
        return instance;
    }

    fromJSON(json) {
      for (var propName in json){
          var obj = json[propName];
          this[propName] = obj;
      }
      return this;
    }
}