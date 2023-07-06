export interface Hotel {
	//UTILICE LA TABLA DE LA DB PARA SABER QUE TIPOS DE DATOS DEBO TRAERME, ASI LE ESPESIFICO A TYPESCRIP LOS TYPES.
	id: number;
	name: string;
	description: string;
	country: string;
	city: string;
	maxCapacity: number;
	photo: string;
}