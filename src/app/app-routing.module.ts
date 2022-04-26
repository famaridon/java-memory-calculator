import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemoryCalculatorComponent } from 'src/app/memory-calcularor/memory-calculator/memory-calculator.component';

const routes: Routes = [
  {
    path: "",
    component: MemoryCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
