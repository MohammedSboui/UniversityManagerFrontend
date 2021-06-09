import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleSelectComponent } from './salle-select.component';

describe('SalleSelectComponent', () => {
  let component: SalleSelectComponent;
  let fixture: ComponentFixture<SalleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalleSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
