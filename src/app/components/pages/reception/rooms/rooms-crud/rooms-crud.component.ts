import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, RoomType, RoomTypeResponse } from 'src/app/models/room.model';
import { RoomTypeService } from 'src/app/services/room-type.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-rooms-crud',
  templateUrl: './rooms-crud.component.html',
  styleUrls: ['./rooms-crud.component.scss']
})
export class RoomsCrudComponent implements OnInit {

  roomTypes: RoomTypeResponse[] = [];
  curRoomType!: RoomTypeResponse;
  room: Room;

  constructor(
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.room = new Room();
  }

  ngOnInit(): void {
    this.roomTypeService.findAll().subscribe({
      next: (response) => {
        this.roomTypes = response ?? [];
      },
      error: _ => window.alert("Something went wrong")
    });
  }

  onSave() {
  }
}
