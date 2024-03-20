export interface RoomAvailableResponse {
	occupied: boolean;
	number: number;
	level: number;
	availableDate: Date;
	type: any;
}

export interface RoomResponse {
	room_id: number;
	room_type_id: number;
	room_code: String;
	htl_level: number;
}

export interface RoomTypeResponse {
	room_type_id: number;
	room_type_name: String;
	number_of_beds: number;
	price: number;
}

export class RoomType {
  public roomTypeId!: number;
  public roomTypeName!: string;
  public numberOfBeeds!: number;
  public price!: number;
}

export class Room {
  public roomId!: number;
  public roomType!: RoomType;
  public roomCode!: string;
  public htlLevel!: number;
}
