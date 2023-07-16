export interface Hotel {
	//UTILICE LA TABLA DE LA DB PARA SABER QUE TIPOS DE DATOS DEBO TRAERME, ASI LE ESPESIFICO A TYPESCRIP LOS TYPES.
	key: string;
	id: string;
	name: string;
	description: string;
	country: string;
	city: string;
	maxCapacity: string;
	services:string;
	hotelCategory:string;
	photo: string;
}
