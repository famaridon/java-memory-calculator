import { BytesSize } from "./bytes-size";

describe('BytesSize', () => {
 
    it('should serialize 1B as human redable string', () => {
      const bytes = new BytesSize(1);
      expect(bytes.stringify()).toEqual('1B');
    });

    it('should serialize 1024B as human redable string 1K', () => {
      const bytes = new BytesSize(1024);
      expect(bytes.stringify()).toEqual('1K');
    });

    it('should serialize 2587B as human redable string 3K (rounded upper)', () => {
      const bytes = new BytesSize(2587);
      expect(bytes.stringify()).toEqual('3K');
    });

    it('should serialize 2354B as human redable string 3K (rounded upper)', () => {
      const bytes = new BytesSize(2587);
      expect(bytes.stringify()).toEqual('3K');
    });

    it('should parse 128M as 1.28e+8', () => {
      const bytes = BytesSize.parse('128M');
      expect(bytes.stringify()).toEqual('128M');
    });

    it('should parse 3K as 3072', () => {
      const bytes = BytesSize.parse('3K');
      expect(bytes.bytes).toEqual(3072);
    });

    it('should parse 2.5K as 2560', () => {
      const bytes = BytesSize.parse('2.5K');
      expect(bytes.bytes).toEqual(2560);
    });

    it('should throw error if string is not parsable', () => {
      expect(() => BytesSize.parse('3WF')).toThrowError('Non parsable input 3WF');
    });

    it('should throw error if unit is found', () => {
      expect(() => BytesSize.parse('3W')).toThrowError('Unknow unit W');
    });

});