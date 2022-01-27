import { Observable } from 'rxjs';
import { BaseItem } from '../models/baseItem.entity';

export interface BaseService<T extends BaseItem> {
  items: Observable<T[]>;
  refreshItems(): Observable<T[]>;
}