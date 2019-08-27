export class CustomerDto {
    customerId: number;
    customerName: string;
    customerDescription: string;
    customerEnteredDate: Date;
    
    public static getNewInstance(): CustomerDto{
        var instance = new CustomerDto();
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