import { EmployeeDto } from './employeeDto';

export class CategoryDto {
    categoryId: number;
    categoryEnteredDate: Date;
    categoryName: string;
    categoryDescription: string;
    
    public static getNewInstance(): CategoryDto{
        var instance = new CategoryDto();
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