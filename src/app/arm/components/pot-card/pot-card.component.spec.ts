import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotCardComponent } from './pot-card.component';

describe('PotCardComponent', () => {
  let component: PotCardComponent;
  let fixture: ComponentFixture<PotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
