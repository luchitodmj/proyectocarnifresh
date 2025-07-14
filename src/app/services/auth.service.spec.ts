import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@ionic/storage-angular';

import { AuthService } from './auth.service';
import { DataService } from './data.service';

// Mock para Storage
class MockStorage {
  private data: { [key: string]: any } = {};
  
  create() { 
    return Promise.resolve(this); 
  }
  
  get(key: string) { 
    return Promise.resolve(this.data[key] || null); 
  }
  
  set(key: string, value: any) { 
    this.data[key] = value;
    return Promise.resolve(); 
  }
  
  remove(key: string) { 
    delete this.data[key];
    return Promise.resolve(); 
  }
}

// Mock para DataService
class MockDataService {
  loginUser(email: string, password: string) { 
    return Promise.resolve(
      email === 'test@example.com' && password === 'password123' 
        ? { id: 1, name: 'Test User', email: 'test@example.com' } 
        : null
    ); 
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: Storage, useClass: MockStorage },
        { provide: DataService, useClass: MockDataService }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user with valid credentials', async () => {
    const result = await service.login('test@example.com', 'password123');
    expect(result).toBeTruthy();
  });

  it('should reject user with invalid credentials', async () => {
    const result = await service.login('wrong@example.com', 'wrongpass');
    expect(result).toBeFalsy();
  });
});
