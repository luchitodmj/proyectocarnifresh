import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  userName: string = 'Usuario';
  userEmail: string = '';
  userPhone: string = '';
  
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // Obtener el email del usuario desde el estado de navegación o localStorage
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.userEmail = navigation.extras.state['email'];
    } else {
      // En una aplicación real, aquí se obtendría la información del usuario desde un servicio
      this.userEmail = 'usuario@ejemplo.com';
    }
  }

  async saveProfile() {
    // En una aplicación real, aquí se guardaría la información del usuario
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Información de perfil actualizada correctamente',
      buttons: ['OK']
    });

    await alert.present();
  }

  async changePassword() {
    // Validar que las contraseñas coincidan
    if (this.newPassword !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    // Validar que la contraseña tenga al menos 8 caracteres
    if (this.newPassword.length < 8) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La contraseña debe tener al menos  caracteres',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    // En una aplicación real, aquí se cambiaría la contraseña del usuario
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Contraseña cambiada correctamente',
      buttons: ['OK']
    });

    await alert.present();
    
    // Limpiar los campos
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
