import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypesListComponent } from 'src/app/components/pages/reception/room-types/room-types-list/room-types-list.component';

describe('RoomTypesListComponent', () => {
  let component: RoomTypesListComponent;
  let fixture: ComponentFixture<RoomTypesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomTypesListComponent]
    });
    fixture = TestBed.createComponent(RoomTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
