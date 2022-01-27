import { Type } from 'class-transformer';
import { BaseItem } from './baseItem.entity';
import { Time } from './time.entity';

export class Recipe implements BaseItem {
  id?: number;
  title?: string;
  desc?: string;
  @Type(type => Time)
  time: Time;

  get name(): string | undefined {
    return this.title;
  }

  set name(value: string | undefined) {
    this.title = value;
  }

  constructor() {
    this.id = undefined;
    this.title = undefined;
    this.desc = undefined;
    this.time = new Time();
  }
}
