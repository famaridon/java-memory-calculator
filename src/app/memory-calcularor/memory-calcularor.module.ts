import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryCalculatorComponent } from './memory-calculator/memory-calculator.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MemoryCalculatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MemoryCalculatorComponent
  ]
})
export class MemoryCalcularorModule { }
