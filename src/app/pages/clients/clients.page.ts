import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  loading = false;
  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.loading = true;
    this.clientService.list().then(clients => {
      this.clients = clients;
      this.loading = false;
    })
  }

  async onChange(event: any): Promise<void>{
    this.loading = true;
    const value = event.detail.value;
    this.clients = await this.clientService.getByName(value);
    this.loading = false
  }

  async deleteItem(id: string): Promise<void>{
    await this.clientService.delete(id);
    const item = this.clients.findIndex(c => c.id === id)
    this.clients.splice(item, 1)
  }
}
