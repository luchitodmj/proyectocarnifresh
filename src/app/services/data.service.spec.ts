import { TestBed } from '@angular/core/testing';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

import { DataService } from './data.service';

// Mock para SQLite
class MockSQLite {
  create() {
    const mockSQLiteObject = {
      executeSql: () => Promise.resolve({
        rows: {
          length: 1,
          item: (index: number) => ({ id: 1, name: 'Test User', email: 'test@example.com' })
        }
      }),
      _objectInstance: {},
      databaseFeatures: {},
      openDBs: {},
      addTransaction: () => {},
      transaction: () => Promise.resolve({}),
      readTransaction: () => Promise.resolve({}),
      startNextTransaction: () => {},
      open: () => Promise.resolve({}),
      close: () => Promise.resolve({}),
      attach: () => Promise.resolve({}),
      detach: () => Promise.resolve({})
    };
    return Promise.resolve(mockSQLiteObject as unknown as SQLiteObject);
  }
}

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SQLite, useClass: MockSQLite }
      ]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Prueba adicional para verificar que loginUser funciona correctamente
  it('should login user successfully', async () => {
    const user = await service.loginUser('test@example.com', 'password123');
    expect(user).toBeTruthy();
    expect(user.id).toBe(1);
  });
});
