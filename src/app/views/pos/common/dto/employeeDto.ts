export class EmployeeDto {
    employeeId: number;
    employeeName: string;
    employeeDescription: string;
    
    public static getNewInstance(): EmployeeDto{
        var instance = new EmployeeDto();
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