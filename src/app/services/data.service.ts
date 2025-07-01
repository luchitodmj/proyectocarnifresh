import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    this.dbInstance = await this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });
    await this.createTables();
  }

  async createTables() {
    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT
      )`
    );
  }

  async registerUser(name: string, email: string, password: string) {
    try {
      const result = await this.dbInstance.executeSql(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, password]
      );
      console.log('Usuario registrado exitosamente:', result);
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM users WHERE email = ? AND password = ?`,
        [email, password]
      );
      const user = result.rows.item(0);
      console.log('Usuario autenticado exitosamente:', user);
      return user;
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      return null;
    }
  }
}
