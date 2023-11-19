import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {

  loading = false
  cities: City[] = [];

  constructor(
    private cityService: CityService 
  ) { }

  ngOnInit() {
    this.loading = true;
    this.cityService.list().then(cities => {
      this.cities = cities;
      this.loading = false;
    });

  }

  async onChange(event: any): Promise<void> {
    this.loading = true;
    const value = event.detail.value;
    this.cities = await this.cityService.getByName(value);
    this.loading = false;
  }

  async deleteCity(id: string): Promise<void>{
    await this.cityService.delete(id)
    const item = this.cities.findIndex(city => city.id === id)
    this.cities.splice(item, 1)
  }

}
