import { EmployeeDto } from './employeeDto';
import { ItemDto } from './itemDto';
import { SaleDto } from './saleDto';
import { BatchItemDto } from './batchItem';
import { MeasurementUnitDto } from './measurementUnitDto';

export class SaleItemDto {
    saleItemId: number;
    saleId: SaleDto;
    batchItemId: BatchItemDto;
    measurementUnitId: MeasurementUnitDto;
    saleItemSellingPrice:number;
    saleItemDiscount: number;
    saleItemQuantity: number;
    saleItemTotalPrice: number;
    saleItemTotalPriceAfterDiscount: number;
    
    public static getNewInstance(): SaleItemDto{
        var instance = new SaleItemDto();
        instance.saleId = new SaleDto();
        instance.measurementUnitId = new MeasurementUnitDto();
        instance.batchItemId = new BatchItemDto();
        return instance;
    }

    fromJSON(json) {
      for (var propName in json){
          var obj = json[propName];
          if(propName == "saleId"){
            this[propName] = SaleDto.getNewInstance().fromJSON(obj);   
          }else if(propName == "batchItemId"){
            this[propName] = BatchItemDto.getNewInstance().fromJSON(obj);
          }else if(propName == "measurementUnitId"){
            this[propName] = MeasurementUnitDto.getNewInstance().fromJSON(obj);
          }else{
            this[propName] = obj;
          }
      }
      return this;
    }
}