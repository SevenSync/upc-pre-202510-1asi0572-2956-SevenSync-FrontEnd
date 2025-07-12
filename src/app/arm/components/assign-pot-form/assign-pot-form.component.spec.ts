import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPotFormComponent } from './assign-pot-form.component';

describe('AssignPotFormComponent', () => {
  let component: AssignPotFormComponent;
  let fixture: ComponentFixture<AssignPotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignPotFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignPotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
