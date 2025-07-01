import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private _storage: Storage | null = null;
  private readonly AUTH_TOKEN_KEY = 'auth_token';
  private readonly USER_DATA_KEY = 'user_data';

  constructor(
    private router: Router,
    private storage: Storage,
    private dataService: DataService
  ) {
    this.initStorage();
  }

  async initStorage() {
    this._storage = await this.storage.create();
    this.checkToken();
  }

  async checkToken() {
    const token = await this._storage?.get(this.AUTH_TOKEN_KEY);
    if (token) {
      this._isAuthenticated.next(true);
    }
  }

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  get isAuthenticatedValue(): boolean {
    return this._isAuthenticated.value;
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      // Usar el DataService para autenticar al usuario
      const user = await this.dataService.loginUser(email, password);
      
      if (user) {
        // Autenticación exitosa
        const token = 'jwt-token-' + Math.random().toString(36).substring(2);
        
        await this._storage?.set(this.AUTH_TOKEN_KEY, token);
        await this._storage?.set(this.USER_DATA_KEY, user);
      
        this._isAuthenticated.next(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  }

  async logout() {
    await this._storage?.remove(this.AUTH_TOKEN_KEY);
    await this._storage?.remove(this.USER_DATA_KEY);
    this._isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  async getUserData() {
    return await this._storage?.get(this.USER_DATA_KEY);
  }
}
