import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage  {

  email:string = '';
  password: string ='';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private dataService: DataService,
    private toastController: ToastController
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

  async login() {
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

    try {
      // Usar el servicio de autenticación para iniciar sesión
      const success = await this.authService.login(this.email, this.password);
      
      if (success) {
        // Mostrar mensaje de éxito
        const toast = await this.toastController.create({
          message: 'Inicio de sesión exitoso',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        toast.present();
        
        // Navegar a la página principal
        this.router.navigate(['/home']);
      } else {
        this.mostrarAlerta('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      this.mostrarAlerta('Error al iniciar sesión');
    }
  }
    
  goToRegister() {
    // Navegar a la página de registro
    this.router.navigate(['/register']);
  }
}

