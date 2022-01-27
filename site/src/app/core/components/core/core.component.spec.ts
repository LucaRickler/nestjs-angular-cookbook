import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreComponent } from './core.component';

describe('CoreComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CoreComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CoreComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-template'`, () => {
    const fixture = TestBed.createComponent(CoreComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-template');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CoreComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('angular-template app is running!');
  });
});
