import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Unit } from '../../../../shared/models/unit.entity';
import { UnitService } from '../../../../shared/services/unit/unit.service';

@Component({
  selector: 'cookbook-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.less']
})
export class CreateUnitComponent implements OnInit {

  unit: Unit;

  errorStatus: number = 0;
  errorMessage: string = '';

  constructor(
    private unitService: UnitService,
  ) {
    this.unit = new Unit()
  }

  ngOnInit(): void {
  }

  saveUnit(): Observable<Unit> {
    return this.unitService.newUnit(this.unit).pipe(tap({
      complete: () => {
        this.unitService.getAll()
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          if (err instanceof HttpErrorResponse) {
            this.errorStatus = err.status;
            this.errorMessage = err.message;
          }
        }
      },

    }));
  }

}
