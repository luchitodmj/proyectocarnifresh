import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: false,
})
export class CamaraPage implements OnInit {
  capturedImage: string | undefined;
  photos: string[] = [];

  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.checkPermissions();
  }

  async checkPermissions() {
    try {
      // Solicitar permisos de cámara al iniciar
      const permissionStatus = await Camera.checkPermissions();
      console.log('Estado de permisos de cámara:', permissionStatus);
      
      if (permissionStatus.camera !== 'granted') {
        await Camera.requestPermissions();
      }
    } catch (error) {
      console.error('Error al verificar permisos:', error);
    }
  }

  async takePicture() {
    try {
      // Verificar si estamos en un simulador
      if (Capacitor.isNativePlatform() && this.platform.is('android') && !this.platform.is('mobileweb')) {
        // En dispositivo real o simulador con cámara
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          saveToGallery: true
        });
        
        // Imagen capturada disponible como URI
        this.capturedImage = image.webPath;
        
        // Agregar a la galería de fotos
        if (this.capturedImage) {
          this.photos.unshift(this.capturedImage);
          this.showToast('Imagen capturada correctamente');
        }
      } else {
        // En simulador sin cámara o web, mostrar una imagen de prueba
        this.showSimulatorAlert('Cámara');
        // Usar una imagen de prueba para simulador
        this.capturedImage = 'https://picsum.photos/500/500';
        this.photos.unshift(this.capturedImage);
      }
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      this.showToast('Error al capturar imagen: ' + error);
    }
  }

  async selectFromGallery() {
    try {
      if (Capacitor.isNativePlatform() && this.platform.is('android') && !this.platform.is('mobileweb')) {
        // En dispositivo real o simulador con galería
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Photos
        });
        
        this.capturedImage = image.webPath;
        
        if (this.capturedImage) {
          this.photos.unshift(this.capturedImage);
          this.showToast('Imagen seleccionada correctamente');
        }
      } else {
        // En simulador o web, mostrar una imagen de prueba
        this.showSimulatorAlert('Galería');
        // Usar una imagen de prueba para simulador
        this.capturedImage = 'https://picsum.photos/500/500?random=' + Math.random();
        this.photos.unshift(this.capturedImage);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      this.showToast('Error al seleccionar imagen: ' + error);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async showSimulatorAlert(source: string) {
    const alert = await this.alertController.create({
      header: 'Simulador detectado',
      subHeader: `Acceso a ${source}`,
      message: `Estás ejecutando la app en un simulador. Se mostrará una imagen de prueba en lugar de usar la ${source.toLowerCase()} real.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
