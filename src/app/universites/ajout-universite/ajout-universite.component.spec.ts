import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutUniversiteComponent } from './ajout-universite.component';

describe('AjoutUniversiteComponent', () => {
  let component: AjoutUniversiteComponent;
  let fixture: ComponentFixture<AjoutUniversiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutUniversiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutUniversiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
