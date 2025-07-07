import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WateringControlsComponent } from './watering-controls.component';

describe('WateringControlsComponent', () => {
  let component: WateringControlsComponent;
  let fixture: ComponentFixture<WateringControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WateringControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WateringControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
