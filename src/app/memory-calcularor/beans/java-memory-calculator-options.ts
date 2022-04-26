import { BytesSize } from "./bytes-size";
import { JVMMemoryOptions } from "./jvm-memory-options";
import { Percentage } from "./percentage";

export type JavaMemoryCalculatorOptions = {
    totalMemory: BytesSize;
    headRoom: Percentage;
    totalClassCount: number;
    threadCount: number;
    jvmPresetOptions: JVMMemoryOptions;
  }