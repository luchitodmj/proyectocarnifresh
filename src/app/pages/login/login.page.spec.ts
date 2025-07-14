import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import { LoginPage } from './login.page';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

// Mocks para los servicios
class MockAuthService {
  login(email: string, password: string) {
    return Promise.resolve(email === 'test@example.com' && password === 'password123');
  }
}

class MockDataService {
  loginUser(email: string, password: string) {
    return Promise.resolve(email === 'test@example.com' && password === 'password123' ? { id: 1, name: 'Test User' } : null);
  }
}

class MockAlertController {
  create(options: any) {
    return Promise.resolve({
      present: () => Promise.resolve(),
    });
  }
}

class MockToastController {
  create(options: any) {
    return Promise.resolve({
      present: () => Promise.resolve(),
    });
  }
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let authService: AuthService;
  let alertController: AlertController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', redirectTo: '' },
          { path: 'register', redirectTo: '' }
        ])
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: DataService, useClass: MockDataService },
        { provide: AlertController, useClass: MockAlertController },
        { provide: ToastController, useClass: MockToastController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    alertController = TestBed.inject(AlertController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email correctly', () => {
    expect(component.validarEmail('test@example.com')).toBeTruthy();
    expect(component.validarEmail('invalid-email')).toBeFalsy();
    expect(component.validarEmail('')).toBeFalsy();
  });

  it('should show alert for empty email', async () => {
    spyOn(component, 'mostrarAlerta');
    component.email = '';
    component.password = 'password123';
    
    await component.login();
    
    expect(component.mostrarAlerta).toHaveBeenCalledWith('El campo de correo no puede estar vacio.');
  });

  it('should show alert for invalid email', async () => {
    spyOn(component, 'mostrarAlerta');
    component.email = 'invalid-email';
    component.password = 'password123';
    
    await component.login();
    
    expect(component.mostrarAlerta).toHaveBeenCalledWith('El correo electrónico no es válido');
  });

  it('should show alert for empty password', async () => {
    spyOn(component, 'mostrarAlerta');
    component.email = 'test@example.com';
    component.password = '';
    
    await component.login();
    
    expect(component.mostrarAlerta).toHaveBeenCalledWith('La contraseña es obligatoria');
  });

  it('should show alert for password length outside valid range', async () => {
    spyOn(component, 'mostrarAlerta');
    component.email = 'test@example.com';
    
    // Password too short
    component.password = '123';
    await component.login();
    expect(component.mostrarAlerta).toHaveBeenCalledWith('La contraseña debe tener entre 4 y 8 caracteres');
    
    // Password too long
    component.password = '123456789';
    await component.login();
    expect(component.mostrarAlerta).toHaveBeenCalledWith('La contraseña debe tener entre 4 y 8 caracteres');
  });

  it('should navigate to home page on successful login', async () => {
    // Configurar los spies antes de la llamada al método
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true) as any);
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(true));
    const toastSpy = spyOn(TestBed.inject(ToastController), 'create').and.returnValue(
      Promise.resolve({
        present: () => Promise.resolve()
      } as any)
    );
    
    component.email = 'test@example.com';
    component.password = 'pass'; // 4 caracteres, cumple con la validación de 4-8 caracteres
    
    await component.login();
    
    expect(loginSpy).toHaveBeenCalledWith('test@example.com', 'pass');
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should show error alert on failed login', async () => {
    // Configurar los spies antes de la llamada al método
    const alertSpy = spyOn(component, 'mostrarAlerta').and.callThrough();
    const createAlertSpy = spyOn(TestBed.inject(AlertController), 'create').and.returnValue(
      Promise.resolve({
        present: () => Promise.resolve()
      } as any)
    );
    const loginSpy = spyOn(authService, 'login').and.returnValue(Promise.resolve(false));
    
    // Usar una contraseña válida en términos de longitud (entre 4 y 8 caracteres)
    component.email = 'wrong@example.com';
    component.password = 'wrong'; // 5 caracteres, cumple con la validación
    
    await component.login();
    
    expect(loginSpy).toHaveBeenCalledWith('wrong@example.com', 'wrong');
    expect(alertSpy).toHaveBeenCalledWith('Credenciales incorrectas');
  });

  it('should navigate to register page', () => {
    spyOn(router, 'navigate');
    
    component.goToRegister();
    
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });
});
