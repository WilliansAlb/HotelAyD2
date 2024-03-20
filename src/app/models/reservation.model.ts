export class ReservationRequest {
	client_id: number;
	room_id: number;
	reservation_from: any;
	reservation_until: any;

	getDisabled(){
		return !this.client_id || !this.room_id || !this.reservation_from || !this.reservation_until;
	}
}