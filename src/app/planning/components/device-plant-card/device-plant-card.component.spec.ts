import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePlantCardComponent } from './device-plant-card.component';

describe('DevicePlantCardComponent', () => {
  let component: DevicePlantCardComponent;
  let fixture: ComponentFixture<DevicePlantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicePlantCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicePlantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
