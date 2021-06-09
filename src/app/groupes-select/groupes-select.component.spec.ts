import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupesSelectComponent } from './groupes-select.component';

describe('GroupesSelectComponent', () => {
  let component: GroupesSelectComponent;
  let fixture: ComponentFixture<GroupesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupesSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
