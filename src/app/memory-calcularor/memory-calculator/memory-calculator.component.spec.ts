import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MemoryCalculatorComponent } from './memory-calculator.component';

describe('MemoryCalculatorComponent', () => {
  let component: MemoryCalculatorComponent;
  let fixture: ComponentFixture<MemoryCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryCalculatorComponent ],
      imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
