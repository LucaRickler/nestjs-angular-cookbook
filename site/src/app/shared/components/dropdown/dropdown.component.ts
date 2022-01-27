import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BaseItem } from '../../models/baseItem.entity';
import { BaseService } from '../../services/base-service.interface';

@Component({
  selector: 'cookbook-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less'],
})
export class DropdownComponent<T extends BaseItem> implements OnInit {

  items: T[] = [];

  private _item!: T;
  get item(): T {
    return this._item;
  }
  @Input() set item(value: T) {
    this._item = value;
  }
  @Output() itemChange: EventEmitter<T> = new EventEmitter<T>();

  @Input() emptyText: string = '';
  @Input() itemTypeName: string = '';

  @Input() newItemEnabled: boolean = true;
  @Output() onNewItem: EventEmitter<any> = new EventEmitter<any>();

  @Input() dataObservable: Observable<T[]> | null = null;

  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.dataObservable !== null) {
      this.dataObservable.subscribe(res => {
        this.items = res;
      });
    }
  }

  hasData(): boolean {
    return this.items.length > 0;
  }

  selectItem(item: T) {
    this._item = item;
    this.itemChange.emit(item);
  }

  newItem(): void {
    this.onNewItem.emit();
  }
}
