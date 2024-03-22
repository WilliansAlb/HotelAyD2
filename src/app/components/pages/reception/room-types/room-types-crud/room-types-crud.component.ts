import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomType } from 'src/app/models/room.model';
import { RoomTypeService } from 'src/app/services/room-type.service';

@Component({
  selector: 'app-room-types-crud',
  templateUrl: './room-types-crud.component.html',
  styleUrls: ['./room-types-crud.component.scss']
})
export class RoomTypesCrudComponent implements OnInit {

  roomTypeId!: number;
  roomType!: RoomType;

  constructor(
    private roomTypeService: RoomTypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.roomType = new RoomType();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.roomTypeId = Number(params.get('roomTypeId') ?? 0);
        if (!this.roomTypeId) {
          void this.router.navigate(['/reception', 'rooms-types']);
          return;
        }

        this.roomTypeService.findById(this.roomTypeId).subscribe({
          next: (response) => {
            this.roomType = response;
          },
          error: _ => {
            console.log('error');
          }
        });
      }
    });
  }

  onSave() {
    if (!this.roomType.roomTypeName || !this.roomType.price || !this.roomType.numberOfBeds) {
      window.alert('formulario invalido');
      return;
    }

    this.roomTypeService.update(this.roomType).subscribe({
      next: (response) => {
        window.alert('Cambios guardados con éxito');
        void this.router.navigate(['/reception', 'rooms-types']);
      },
      error: _ => {
        window.alert('Error en el servidor, intente mas tarde');
      }
    });
  }
}
