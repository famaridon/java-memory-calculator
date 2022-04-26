import { Percentage } from "./percentage";

describe('Percentage', () => {
 
    it('should construct', () => {
      expect(new Percentage(10)).toBeTruthy();
    });

    it('should throw error when value is less than zero', () => {
      expect(() => new Percentage(-25)).toThrowError('Only positive value are allowed');
    });

    it('should throw error when value is grater than zero', () => {
      expect(() => new Percentage(150)).toThrowError('Value must not exceed 100');
    });


});