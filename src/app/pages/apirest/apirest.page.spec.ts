import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ApirestPage } from './apirest.page';
import { ApiService } from 'src/app/services/api.service';

// Mock para ApiService
class MockApiService {
  getCountries() {
    return of([
      { 
        name: { common: 'Spain', official: 'Kingdom of Spain' },
        flags: { png: 'https://example.com/spain.png', svg: 'https://example.com/spain.svg' }
      },
      { 
        name: { common: 'Mexico', official: 'United Mexican States' },
        flags: { png: 'https://example.com/mexico.png', svg: 'https://example.com/mexico.svg' }
      }
    ]);
  }
}

describe('ApirestPage', () => {
  let component: ApirestPage;
  let fixture: ComponentFixture<ApirestPage>;
  let apiService: ApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ApirestPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        { provide: ApiService, useClass: MockApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApirestPage);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries on init', () => {
    // El ngOnInit ya se ejecutó en el fixture.detectChanges()
    expect(component.countries.length).toBe(2);
    expect(component.countries[0].name.common).toBe('Spain');
    expect(component.loading).toBeFalsy();
  });
});
