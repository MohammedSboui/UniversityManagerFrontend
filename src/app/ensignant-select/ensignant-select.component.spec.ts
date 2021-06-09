import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsignantSelectComponent } from './ensignant-select.component';

describe('EnsignantSelectComponent', () => {
  let component: EnsignantSelectComponent;
  let fixture: ComponentFixture<EnsignantSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnsignantSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsignantSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
