import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypesCrudComponent } from './room-types-crud.component';

describe('RoomTypesCrudComponent', () => {
  let component: RoomTypesCrudComponent;
  let fixture: ComponentFixture<RoomTypesCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomTypesCrudComponent]
    });
    fixture = TestBed.createComponent(RoomTypesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
