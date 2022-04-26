import { Injectable } from '@angular/core';
import { BytesSize } from 'src/app/memory-calcularor/beans/bytes-size';
import { JavaMemoryCalculatorOptions } from 'src/app/memory-calcularor/beans/java-memory-calculator-options';
import { JVMMemoryOptions } from 'src/app/memory-calcularor/beans/jvm-memory-options';

export const JVM_DEFAULTS = {
  maxDirectMemorySize: BytesSize.parse('10M'),
  reservedCodeCacheSize: BytesSize.parse('240M'),
  xss: BytesSize.parse('1M'),
}

@Injectable({
  providedIn: 'root'
})
export class JavaMemoryCalculatorService {

  constructor() { }

  public compute(options: JavaMemoryCalculatorOptions): JVMMemoryOptions {

    const totalMemory = options.totalMemory.bytes;
    const headroom = totalMemory * (options.headRoom.value / 100);
    const directMemory = options.jvmPresetOptions.maxDirectMemorySize?.bytes || JVM_DEFAULTS.maxDirectMemorySize.bytes;

    const metaspace = options.jvmPresetOptions.maxMetaspaceSize?.bytes || (5800 * options.totalClassCount) + 14000000;
    const reservedCodeCache = options.jvmPresetOptions.reservedCodeCacheSize?.bytes || JVM_DEFAULTS.reservedCodeCacheSize.bytes;
    const threadStack = options.jvmPresetOptions.xss?.bytes || JVM_DEFAULTS.xss.bytes;
    const threadCount = options.threadCount;

    const xmx = totalMemory - (headroom + directMemory + metaspace + reservedCodeCache + (threadStack * threadCount))

    if(xmx <= 0 ){
      throw new Error('Not enough memory');
    }

    return {
      xmx: new BytesSize(xmx),
      xss: new BytesSize(threadStack),
      maxDirectMemorySize: new BytesSize(directMemory),
      maxMetaspaceSize: new BytesSize(metaspace),
      reservedCodeCacheSize: new BytesSize(reservedCodeCache),
    }
  }

  public buildJvmOptionsArguments(options: JVMMemoryOptions): string {
    let result = '';
    if(options.xss) {
      result+=`-Xss${options.xss.stringify()} `
    }
    if(options.maxDirectMemorySize) {
      result+=`-XX:MaxDirectMemorySize=${options.maxDirectMemorySize.stringify()} `
    }
    if(options.maxMetaspaceSize) {
      result+=`-XX:MaxMetaspaceSize=${options.maxMetaspaceSize.stringify()} `
    }
    if(options.reservedCodeCacheSize) {
      result+=`-XX:ReservedCodeCacheSize=${options.reservedCodeCacheSize.stringify()} `
    }
    if(options.xmx) {
      result+=`-Xmx${options.xmx.stringify()} `
    }
    return result;
  }
}
