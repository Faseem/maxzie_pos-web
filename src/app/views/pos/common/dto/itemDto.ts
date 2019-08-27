import { EmployeeDto } from './employeeDto';

export class ItemDto {
    itemId: number;
    employeeId: EmployeeDto;
    itemName: string;
    itemDescription: string;
    
    public static getNewInstance(): ItemDto{
        var instance = new ItemDto();
        instance.employeeId = new EmployeeDto();
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