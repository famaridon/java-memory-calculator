export type BytesUnit = 'B' | 'K' | 'M' | 'G' | 'T' | 'P' | 'E' | 'Z' | 'Y';

const SIZES: BytesUnit[] = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

const UNITS: Map<BytesUnit, number> = new Map([
    ['B', 1],
    ['K', 1024],
    ['M', 1024 * 1024],
    ['G', 1024 * 1024 * 1024],
    ['T', 1024 * 1024 * 1024 * 1024],
    ['P', 1024 * 1024 * 1024 * 1024 * 1024],
    ['E', 1024 * 1024 * 1024 * 1024 * 1024 * 1024],
    ['Z', 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024],
    ['Y', 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024],
]);

const PARSE_REGEX = /^(?<value>[0-9.]+)(?<unit>[A-Z])$/;

export class BytesSize {

    constructor(
        public readonly bytes: number) {
    }

    public static parse(input: string): BytesSize {
        const parseResult = PARSE_REGEX.exec(input);
        if (!parseResult || !parseResult.groups) {
            throw new Error('Non parsable input ' + input);
        }

        const value = parseResult.groups['value'];
        const unit = UNITS.get(parseResult.groups['unit'] as BytesUnit);

        if(!unit) {
            throw new Error('Unknow unit '+ parseResult.groups['unit']);
        }

        return new BytesSize(parseFloat(value) * unit );
    }

    public stringify(decimals?: number): string {
        if (this.bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals || 0,
            i = Math.floor(Math.log(this.bytes) / Math.log(k));
        return parseFloat((this.bytes / Math.pow(k, i)).toFixed(dm)) + SIZES[i];
    }

}