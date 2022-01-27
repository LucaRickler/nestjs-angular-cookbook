import Utils from '../utils';

export class Time {
  public cookingTime?: number;
  public restingTime?: number;
  public prepTime?: number;

  constructor() {
    this.cookingTime = undefined;
    this.restingTime = undefined;
    this.prepTime = undefined;
  }

  anyTime(): boolean {
    return this.cookingTime !== undefined || this.prepTime !== undefined || this.restingTime !== undefined;
  }

  add(...other: Time[]): Time {
    other.forEach(o => {
      this.cookingTime = Utils.addUndefined(this.cookingTime, o.cookingTime);
      this.prepTime = Utils.addUndefined(this.prepTime, o.prepTime);
      this.restingTime = Utils.addUndefined(this.restingTime, o.restingTime);
    });
    return this;
  }
}