import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-apirest',
  templateUrl: './apirest.page.html',
  styleUrls: ['./apirest.page.scss'],
  standalone: false,
})
export class ApirestPage implements OnInit {
  countries: any[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar paises:', error);
        this.loading = false;
      }
    });

  }

}
