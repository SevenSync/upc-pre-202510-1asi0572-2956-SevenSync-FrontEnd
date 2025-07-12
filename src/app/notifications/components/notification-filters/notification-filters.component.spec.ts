import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFiltersComponent } from './notification-filters.component';

describe('NotificationFiltersComponent', () => {
  let component: NotificationFiltersComponent;
  let fixture: ComponentFixture<NotificationFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
