import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantSettingsFormComponent } from './plant-settings-form.component';

describe('PlantSettingsFormComponent', () => {
  let component: PlantSettingsFormComponent;
  let fixture: ComponentFixture<PlantSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantSettingsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
