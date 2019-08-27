export class SupplierDto {
    supplierId: number;
    supplierName: string;
    supplierDescription: string;
    supplierEnteredDate: Date;
    
    public static getNewInstance(): SupplierDto{
        var instance = new SupplierDto();
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