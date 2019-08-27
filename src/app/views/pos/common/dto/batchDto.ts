import { EmployeeDto } from './employeeDto';

export class BatchDto {
    batchId: number;
    employeeId: EmployeeDto;
    batchDate: Date;
    batchTotal:number;
    batchItemsCount: number;

    
    public static getNewInstance(): BatchDto{
        var instance = new BatchDto();
        instance.employeeId = EmployeeDto.getNewInstance();
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