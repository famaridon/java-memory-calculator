
export class Percentage {

    constructor(
        public readonly value: number) {
        if (value < 0) {
            throw new Error('Only positive value are allowed');
        }
        if (value > 100) {
            throw new Error('Value must not exceed 100');
        }
    }

}