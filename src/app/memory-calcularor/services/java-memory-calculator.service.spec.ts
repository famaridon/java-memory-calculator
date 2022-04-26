import { TestBed } from '@angular/core/testing';
import { BytesSize } from 'src/app/memory-calcularor/beans/bytes-size';
import { Percentage } from 'src/app/memory-calcularor/beans/percentage';

import { JavaMemoryCalculatorService } from './java-memory-calculator.service';

describe('JavaMemoryCalculatorService', () => {
  let calculator: JavaMemoryCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    calculator = TestBed.inject(JavaMemoryCalculatorService);
  });

  it('should be created', () => {
    expect(calculator).toBeTruthy();
  });

  it('should compute jvm memory with jvm defaults', () => {
    const result = calculator.compute({
      headRoom: new Percentage(25),
      totalMemory: BytesSize.parse('1G'),
      totalClassCount: 20000,
      threadCount:125,
      jvmPresetOptions: { }
    });
    expect(result.xss?.stringify())
      .withContext('-Xss').toEqual('1M');
    expect(result.maxDirectMemorySize?.stringify())
      .withContext('-XX:MaxDirectMemorySize').toEqual('10M');
    expect(result.maxMetaspaceSize?.stringify())
      .withContext('-XX:MaxMetaspaceSize').toEqual('124M');
    expect(result.reservedCodeCacheSize?.stringify())
      .withContext('-XX:ReservedCodeCacheSize').toEqual('240M');
    expect(result.xmx?.stringify())
      .withContext('-Xmx').toEqual('269M');
  });

  it('should compute jvm memory with preset', () => {
    const result = calculator.compute({
      headRoom: new Percentage(25),
      totalMemory: BytesSize.parse('512M'),
      totalClassCount: 20394,
      threadCount:125,
      jvmPresetOptions: {
        xss: BytesSize.parse('512K'),
        reservedCodeCacheSize: BytesSize.parse('64M'),
        maxDirectMemorySize: BytesSize.parse('10M'),
        maxMetaspaceSize: BytesSize.parse('128M'),
      }
    });
    expect(result.xss?.stringify())
      .withContext('-Xss').toEqual('512K');
    expect(result.maxDirectMemorySize?.stringify())
      .withContext('-XX:MaxDirectMemorySize').toEqual('10M');
    expect(result.maxMetaspaceSize?.stringify())
      .withContext('-XX:MaxMetaspaceSize').toEqual('128M');
    expect(result.reservedCodeCacheSize?.stringify())
      .withContext('-XX:ReservedCodeCacheSize').toEqual('64M');
    expect(result.xmx?.stringify())
      .withContext('-Xmx').toEqual('120M');
  });

  it('should throw error when memory is tow low', () => {
    expect( () => calculator.compute({
      headRoom: new Percentage(25),
      totalMemory: BytesSize.parse('64M'),
      totalClassCount: 20000,
      threadCount:125,
      jvmPresetOptions: { }
    })).toThrowError('Not enough memory');
  });

  it('should build jvm memory args when all options are provided', () => {
    const result = calculator.buildJvmOptionsArguments({
      xss: BytesSize.parse('512K'),
      xmx: BytesSize.parse('120M'),
      reservedCodeCacheSize: BytesSize.parse('64M'),
      maxDirectMemorySize: BytesSize.parse('10M'),
      maxMetaspaceSize: BytesSize.parse('128M'),
    
    });
    expect(result).toContain('-Xss512K');
    expect(result).toContain('-XX:MaxDirectMemorySize=10M');
    expect(result).toContain('-XX:MaxMetaspaceSize=128M');
    expect(result).toContain('-XX:ReservedCodeCacheSize=64M');
    expect(result).toContain('-Xmx120M');
  });

});
