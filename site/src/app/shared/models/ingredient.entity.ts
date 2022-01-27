import { Type } from 'class-transformer';
import { Unit } from './unit.entity';
import { BaseItem } from './baseItem.entity';

export class Ingredient implements BaseItem {
  id?: number;
  name?: string;
  unitId?: number;

  private _unit: Unit;
  get unit(): Unit {
    return this._unit;
  }
  @Type(() => Unit)
  set unit(value: Unit) {
    this._unit = value;
    this.unitId = value.id;
  }

  constructor() {
    this.id = undefined;
    this.name = undefined;
    this._unit = new Unit();
  }
}
