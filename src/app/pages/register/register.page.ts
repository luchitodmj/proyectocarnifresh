import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';


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
    private alertController: AlertController,
    private dataService: DataService,
    private toastController: ToastController
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

  async register() {
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

    try {
      // Usar el DataService para registrar al usuario en la base de datos SQLite
      const success = await this.dataService.registerUser(this.name, this.email, this.password);
      
      if (success) {
        // Mostrar mensaje de éxito
        const toast = await this.toastController.create({
          message: 'Usuario registrado exitosamente',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        await toast.present();
        
        // Navegar a la página de login
        this.router.navigate(['/login']);
      } else {
        this.mostrarAlerta('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      this.mostrarAlerta('Error al registrar usuario');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
