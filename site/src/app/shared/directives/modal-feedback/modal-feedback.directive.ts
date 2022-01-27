import { Directive, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseItem } from '../../models/baseItem.entity';

@Directive({
  selector: '[cookbookModalFeedback]'
})
export class ModalFeedbackDirective<T extends BaseItem> {

  constructor() { }

  @Input() captureItem!: Observable<T>;

  onClose(): Observable<T> {
    return this.captureItem;
  }

}
