import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    // Deshabilitar el menú en las páginas de login y registro
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.url;
      if (url.includes('/login') || url.includes('/register')) {
        this.menuCtrl.enable(false, 'main-menu');
      } else {
        this.menuCtrl.enable(true, 'main-menu');
      }
    });
  }

  closeMenu() {
    this.menuCtrl.close('main-menu');
  }

  logout() {
    // En una aplicación real, aquí se cerraría la sesión
    this.closeMenu();
    this.router.navigate(['/login']);
  }
}
