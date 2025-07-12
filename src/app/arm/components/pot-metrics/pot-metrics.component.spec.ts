import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotMetricsComponent } from './pot-metrics.component';

describe('PotMetricsComponent', () => {
  let component: PotMetricsComponent;
  let fixture: ComponentFixture<PotMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotMetricsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
