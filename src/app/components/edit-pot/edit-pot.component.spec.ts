import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPotComponent } from './edit-pot.component';

describe('EditPotComponent', () => {
  let component: EditPotComponent;
  let fixture: ComponentFixture<EditPotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
