import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPotDialogComponent } from './add-pot-dialog.component';

describe('AddPotDialogComponent', () => {
  let component: AddPotDialogComponent;
  let fixture: ComponentFixture<AddPotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPotDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
