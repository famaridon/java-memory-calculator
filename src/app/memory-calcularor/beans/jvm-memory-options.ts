import { BytesSize } from "./bytes-size";

export type JVMMemoryOptions = {
    maxDirectMemorySize?: BytesSize;
    maxMetaspaceSize?: BytesSize;
    reservedCodeCacheSize?: BytesSize;
    xss?: BytesSize;
    xmx?: BytesSize;
  }