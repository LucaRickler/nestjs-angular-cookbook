import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubRecipeContainerComponent } from './sub-recipe-container.component';

describe('SubRecipeContainerComponent', () => {
  let component: SubRecipeContainerComponent;
  let fixture: ComponentFixture<SubRecipeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubRecipeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubRecipeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
