import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  register() {
    // Validar campos
    if (!this.name) {
      this.mostrarAlerta('El nombre es obligatorio');
      return;
    }

    if (!this.email) {
      this.mostrarAlerta('El correo electrónico es obligatorio');
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

    if (this.password !== this.confirmPassword) {
      this.mostrarAlerta('Las contraseñas no coinciden');
      return;
    }

    // En una aplicación real, aquí se enviarían los datos a un servicio de autenticación
    // Por ahora, simplemente mostraremos un mensaje de éxito y navegaremos a la página de inicio
    this.mostrarAlerta('Registro exitoso').then(() => {
      this.router.navigate(['/home'], { state: { email: this.email } });
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
