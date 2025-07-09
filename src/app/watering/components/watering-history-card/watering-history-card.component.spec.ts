import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WateringHistoryCardComponent } from './watering-history-card.component';

describe('WateringHistoryCardComponent', () => {
  let component: WateringHistoryCardComponent;
  let fixture: ComponentFixture<WateringHistoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WateringHistoryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WateringHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
