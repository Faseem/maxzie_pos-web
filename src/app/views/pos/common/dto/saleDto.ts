import { EmployeeDto } from './employeeDto';
import { BatchItemDto } from './batchItem';
import { CustomerDto } from './customerDto';
import { SaleItemDto } from './saleItem';

export class SaleDto {
    saleId: number;
    saleItems: Array<SaleItemDto>;
    employeeId: EmployeeDto;
    customerId: CustomerDto;
    saleDate: Date;
    saleTotal: number;
    saleTotalDiscount: number;
    saleTotalAfterDiscount: number;
    saleNumberOfItems:number;
    
    public static getNewInstance(): SaleDto{
        var instance = new SaleDto();
        instance.employeeId = new EmployeeDto();
        instance.customerId = new CustomerDto();
        instance.saleItems = [];
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