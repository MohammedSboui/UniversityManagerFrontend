import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSalleComponent } from './ajout-salle.component';

describe('AjoutSalleComponent', () => {
  let component: AjoutSalleComponent;
  let fixture: ComponentFixture<AjoutSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutSalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
