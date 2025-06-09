import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage  {

  email:string = '';
  password: string ='';

  constructor(private router: Router,
              private alertController: AlertController

  ) { }

  async mostrarAlerta(mensaje: string){
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  login() {
    if (!this.email){
      this.mostrarAlerta('El campo de correo no puede estar vacio.');
      return;
    }
    if (!this.validarEmail(this.email)) {
        this.mostrarAlerta('El correo electrónico no es válido');
        return;
      }
      if (!this.password) {
        this.mostrarAlerta('La contraseña es obligatoria');
        return;
      }
      if (this.password.length < 4 || this.password.length > 8) {
        this.mostrarAlerta('La contraseña debe tener entre 4 y 8 caracteres');
        return;
      }

      this.router.navigate(['/home'], { state: { email: this.email } });
    }
    
  goToRegister() {
    // Navegar a la página de registro
    this.router.navigate(['/register']);
  }
}

