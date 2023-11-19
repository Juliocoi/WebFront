import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private readonly URL = "http://localhost:5237";

  constructor(
    private http: HttpClient
  ) { }

  async list(): Promise<City[]> {
    return await this.http.get(`${this.URL}/cities`).toPromise() as City[];
  }

  async create(name: string, state: string): Promise<void> {
    await this.http.post(`${this.URL}/cities`, {
      name,
      state
    }).toPromise();
  }

  async find(id: string): Promise<City> {
    return await this.http.get(`${this.URL}/cities/${id}`).toPromise() as City;
  }

  async getByName(name: string): Promise<City[]> {
    return await this.http.get(`${this.URL}/cities-by-name`, {
      params: { name }
    }).toPromise() as City[];
  }

  async delete(id: string): Promise<void>{
    await this.http.delete(`${this.URL}/cities/${id}`).toPromise();
  }

}
