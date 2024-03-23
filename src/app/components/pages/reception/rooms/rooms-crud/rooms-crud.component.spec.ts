import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsCrudComponent } from './rooms-crud.component';

describe('RoomsCrudComponent', () => {
  let component: RoomsCrudComponent;
  let fixture: ComponentFixture<RoomsCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsCrudComponent]
    });
    fixture = TestBed.createComponent(RoomsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
