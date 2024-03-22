export class ClientRequest {
	identification_no: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	email: string;
	phone_number: string;

	getDisabled() {
		return !this.identification_no || !this.first_name || !this.middle_name || !this.last_name || !this.email || !this.phone_number;
	}

	toString() {
		return this.identification_no + " " + this.first_name  + " " + this.last_name+ " " + this.middle_name + " " + this.email + " " + this.phone_number;
	}
}