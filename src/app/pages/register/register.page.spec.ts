import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController, ToastController } from '@ionic/angular';

import { RegisterPage } from './register.page';
import { DataService } from 'src/app/services/data.service';

// Mock para DataService
class MockDataService {
  registerUser(name: string, email: string, password: string) {
    return Promise.resolve(email !== 'existente@example.com');
  }
}

// Mock para AlertController
class MockAlertController {
  create(options: any) {
    return Promise.resolve({
      present: () => Promise.resolve(),
      onDidDismiss: () => Promise.resolve()
    });
  }
}

// Mock para ToastController
class MockToastController {
  create(options: any) {
    return Promise.resolve({
      present: () => Promise.resolve()
    });
  }
}

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let dataService: DataService;
  let alertController: AlertController;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        FormsModule
      ],
      providers: [
        { provide: DataService, useClass: MockDataService },
        { provide: AlertController, useClass: MockAlertController },
        { provide: ToastController, useClass: MockToastController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dataService = TestBed.inject(DataService);
    alertController = TestBed.inject(AlertController);
    toastController = TestBed.inject(ToastController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email correctly', () => {
    expect(component.validarEmail('test@example.com')).toBeTruthy();
    expect(component.validarEmail('invalid-email')).toBeFalsy();
  });

  it('should show alert when name is empty', async () => {
    const alertSpy = spyOn(component, 'mostrarAlerta').and.callThrough();
    const createAlertSpy = spyOn(alertController, 'create').and.callThrough();
    
    component.name = '';
    component.email = 'test@example.com';
    component.password = 'password';
    component.confirmPassword = 'password';
    
    await component.register();
    
    expect(alertSpy).toHaveBeenCalledWith('El nombre es obligatorio');
  });

  it('should show alert when passwords do not match', async () => {
    const alertSpy = spyOn(component, 'mostrarAlerta').and.callThrough();
    
    component.name = 'Test User';
    component.email = 'test@example.com';
    component.password = 'password1';
    component.confirmPassword = 'password2';
    
    await component.register();
    
    expect(alertSpy).toHaveBeenCalledWith('Las contraseñas no coinciden');
  });

  it('should register user successfully and navigate to login', async () => {
    const routerSpy = spyOn(router, 'navigate');
    const toastSpy = spyOn(toastController, 'create').and.callThrough();
    const dataServiceSpy = spyOn(dataService, 'registerUser').and.returnValue(Promise.resolve(true));
    
    component.name = 'Test User';
    component.email = 'test@example.com';
    component.password = 'pass';
    component.confirmPassword = 'pass';
    
    await component.register();
    
    expect(dataServiceSpy).toHaveBeenCalledWith('Test User', 'test@example.com', 'pass');
    expect(toastSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to login page', () => {
    const routerSpy = spyOn(router, 'navigate');
    
    component.goToLogin();
    
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });
});
