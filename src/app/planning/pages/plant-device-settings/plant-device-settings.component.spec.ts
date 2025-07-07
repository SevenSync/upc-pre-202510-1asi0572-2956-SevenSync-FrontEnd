import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDeviceSettingsComponent } from './plant-device-settings.component';

describe('PlantDeviceSettingsComponent', () => {
  let component: PlantDeviceSettingsComponent;
  let fixture: ComponentFixture<PlantDeviceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantDeviceSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantDeviceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
