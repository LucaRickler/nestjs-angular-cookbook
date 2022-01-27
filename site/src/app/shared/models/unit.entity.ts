import { BaseItem } from './baseItem.entity';

export class Unit implements BaseItem {
  id?: number;
  name?: string;
  symbol?: string;

  constructor() {
    this.id = undefined;
    this.name = undefined;
    this.symbol = undefined;
  }
}
