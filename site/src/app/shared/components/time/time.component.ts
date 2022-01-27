import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Time } from '../../models/time.entity';

@Component({
  selector: 'cookbook-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.less']
})
export class TimeComponent implements OnInit {

  @Input() editMode: boolean = false;
  @Input() canEdit: boolean = true;

  @Input() time: Time = new Time();
  @Output() timeChange = new EventEmitter<Time>();

  constructor() { }

  ngOnInit(): void {
  }

}
