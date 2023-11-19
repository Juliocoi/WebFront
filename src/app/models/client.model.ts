import { City } from "./city.model";

export interface Client {
  id: string;
  name: string;
  sexo: string;
  idade: number;
  city: City;
}