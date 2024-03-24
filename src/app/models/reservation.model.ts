export class ReservationRequest {
	client_id: number;
	room_id: number;
	reservation_from: any;
	reservation_until: any;
	payment?: number;
	price: number;
	entry_date: any;

	getDisabled() {
		return !this.client_id || !this.room_id || !this.reservation_from || !this.reservation_until;
	}
}

export class ReservationResponse {
	checkInDate: any;
	checkOutDate: any;
	clientId: number;
	creatorUserId: number;
	entryDate: any;
	priceReservation: number;
	reservationFrom: any;
	reservationId: number;
	reservationUntil: any;
	roomId: number;
	status: number;
}