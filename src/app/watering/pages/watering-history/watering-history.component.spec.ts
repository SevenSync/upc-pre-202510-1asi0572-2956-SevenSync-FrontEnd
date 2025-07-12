import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WateringHistoryComponent } from './watering-history.component';

describe('WateringHistoryComponent', () => {
  let component: WateringHistoryComponent;
  let fixture: ComponentFixture<WateringHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WateringHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WateringHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
