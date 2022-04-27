import { Component, OnInit } from '@angular/core';
import { BytesSize } from 'src/app/memory-calcularor/beans/bytes-size';
import { JavaMemoryCalculatorOptions } from 'src/app/memory-calcularor/beans/java-memory-calculator-options';
import { JVMMemoryOptions } from 'src/app/memory-calcularor/beans/jvm-memory-options';
import { Percentage } from 'src/app/memory-calcularor/beans/percentage';
import { JavaMemoryCalculatorService, JVM_DEFAULTS } from 'src/app/memory-calcularor/services/java-memory-calculator.service';

@Component({
  selector: 'app-memory-calculator',
  templateUrl: './memory-calculator.component.html',
  styleUrls: ['./memory-calculator.component.scss']
})
export class MemoryCalculatorComponent implements OnInit {
  public javaOpts = '';
  public memoryCalculatorOptions: JavaMemoryCalculatorOptions = {
    totalMemory: BytesSize.parse('1G'),
    headRoom: new Percentage(25),
    totalClassCount: 20_000,
    threadCount: 200,
    jvmPresetOptions: { ...JVM_DEFAULTS }
  };

  constructor(private memoryCalculatorService: JavaMemoryCalculatorService) { }

  ngOnInit(): void {
    const jvmOptionsDefault = this.memoryCalculatorService.compute(this.memoryCalculatorOptions);
    this.memoryCalculatorOptions.jvmPresetOptions = jvmOptionsDefault;
    this.javaOpts = this.memoryCalculatorService.buildJvmOptionsArguments(jvmOptionsDefault);
  }

}
