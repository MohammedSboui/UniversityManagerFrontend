import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursSelectComponent } from './cours-select.component';

describe('CoursSelectComponent', () => {
  let component: CoursSelectComponent;
  let fixture: ComponentFixture<CoursSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
