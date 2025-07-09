import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WateringScheduleComponent } from './watering-schedule.component';

describe('WateringScheduleComponent', () => {
  let component: WateringScheduleComponent;
  let fixture: ComponentFixture<WateringScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WateringScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WateringScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
