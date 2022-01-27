import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ModalHostComponent } from '../../../../shared/components/modal-host/modal-host.component';
import { Ingredient } from '../../../../shared/models/ingredient.entity';
import { IngredientService } from '../../../../shared/services/ingredient/ingredient.service';
import { UnitService } from '../../../../shared/services/unit/unit.service';

@Component({
  selector: 'cookbook-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.less']
})
export class CreateIngredientComponent implements OnInit {

  ingredient: Ingredient;

  @ViewChild('modal') modalHost!: ModalHostComponent;

  errorStatus: number = 0;
  errorMessage: string = '';

  constructor(
    private ingredientService: IngredientService,
    public unitService: UnitService,
  ) {
    this.ingredient = new Ingredient();
  }

  ngOnInit(): void {
    this.ingredient = new Ingredient();
    this.unitService.refreshItems();
  }

  saveIngredient(): Observable<Ingredient> {
    return this.ingredientService.newIngredient(this.ingredient).pipe(tap({
      complete: () => {
        // this.ingredientService.getAll();
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          this.errorStatus = err.status;
          this.errorMessage = err.message;
        }
      },
    }));
  }

  newUnit(): void {
    const modalRef = this.modalHost.open();
    modalRef.closed.subscribe(res => {
      if (res) {
        this.ingredient.unit = res;
      }
    });
  }
}
