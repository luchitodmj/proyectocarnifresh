import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertSettingsPage } from './alert-settings.page';

describe('AlertSettingsPage', () => {
  let component: AlertSettingsPage;
  let fixture: ComponentFixture<AlertSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
