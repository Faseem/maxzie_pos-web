import { BatchDto } from './batchDto';
import { ItemDto } from './itemDto';
import { MeasurementUnitDto } from './measurementUnitDto';

export class BatchItemDto {
    batchItemId: number;
    batchId: BatchDto;
    itemId: ItemDto;
    measurementUnitId: MeasurementUnitDto;
    totalQuantity: string;
    isExpiring: string;
    expDate: number;
    manDate: string;
    buyingPrice: string;
    sellingPrice: number;
    availableQuantity: number;
    
    public static getNewInstance(): BatchItemDto{
        var instance = new BatchItemDto();
        instance.batchId = BatchDto.getNewInstance();
        instance.measurementUnitId = MeasurementUnitDto.getNewInstance();
        instance.itemId = ItemDto.getNewInstance();
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