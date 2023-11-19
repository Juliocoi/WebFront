import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly URL = "http://localhost:5237";

  constructor(
    private http: HttpClient
  ) { }

  async list(): Promise<Client[]> {
    return await this.http.get(`${this.URL}/clients`).toPromise() as Client[];
  }

  async create(name: string, state: string): Promise<void> {
    await this.http.post(`${this.URL}/clients`, {
      name,
      state
    }).toPromise();
  }

  async find(id: string): Promise<Client> {
    return await this.http.get(`${this.URL}/clients/${id}`).toPromise() as Client;
  }

  async getByName(name: string): Promise<Client[]> {
    return await this.http.get(`${this.URL}/clients-by-name`, {
      params: { name }
    }).toPromise() as Client[];
  }

  async delete(id: string): Promise<void>{
    await this.http.delete(`${this.URL}/clients/${id}`).toPromise();
  }

}
