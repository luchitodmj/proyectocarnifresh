import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  userEmail: string = '';
  refrigeratedCount: number = 0;
  frozenCount: number = 0;
  expiringCount: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtener el email del usuario desde el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.userEmail = navigation.extras.state['email'];
    }
    
    // En una aplicación real, estos datos vendrían de un servicio
    // Por ahora, usamos datos de ejemplo
    this.refrigeratedCount = 3;
    this.frozenCount = 5;
    this.expiringCount = 2;
  }

  goToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  goToProductList() {
    this.router.navigate(['/product-list']);
  }

  goToAlertSettings() {
    this.router.navigate(['/alert-settings']);
  }

  logout() {
    // En una aplicación real, aquí se cerraría la sesión
    this.router.navigate(['/login']);
  }
}
