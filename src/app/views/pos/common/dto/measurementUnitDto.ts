export class MeasurementUnitDto {
    measurementUnitId: number;
    measurementUnitCode: string;
    measurementUnitDescription: string;
    
    public static getNewInstance(): MeasurementUnitDto{
        var instance = new MeasurementUnitDto();
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