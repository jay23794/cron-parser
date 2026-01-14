export class CroneFieldParser {
    parse(value: string, min: number, max: number, fieldName: string): number[] {
        if (!value.trim()) {
            throw new Error(`Empty value for ${fieldName}`);
        }

        if (value.startsWith("*/")) {
            return this.parseStep(value, min, max, fieldName);
        }

        if (value.includes(",") && value.includes("-")) {
            return this.paserCommaAndDash(value, min, max, fieldName);
        }

        if (value.startsWith("*")) {
            return this.parseWildcard(min, max);
        }
        if (value.includes(",")) {
            return this.parseCommaSeparated(value, min, max, fieldName);
        }

        // Handle range: n-m
        if (value.includes("-")) {
            return this.parseRange(value, min, max, fieldName);
        }
        // Handle single number
        return this.parseSingle(value, min, max, fieldName);
    }
    paserCommaAndDash(
        value: string,
        min: number,
        max: number,
        fieldName: string
    ): number[] {
        const result: number[] = [];
        const partsForComma = value.split(",");

        for (let index = 0; index < partsForComma.length; index++) {
            const item = partsForComma[index]!;
            const num = Number.parseInt(item);
            const partsForDash: number[] = [];
            if (!item.includes("-")) {
                if (Number.isInteger(num)) {
                    result.push(num);
                }
            } else {
                partsForDash.push(...item.split("-").map(Number));
                if (partsForDash.length < 2) {
                    throw new Error(`Expression should be in range e.g 1-6 ${fieldName}`);
                }
                for (let i = partsForDash[0]!; i <= partsForDash.at(-1)!; i++) {
                    result.push(i);
                }

                partsForDash.length = 0;
            }
        }

        return [...new Set(result)].sort((a, b) => a - b);
    }
    parseCommaSeparated(
        value: string,
        min: number,
        max: number,
        fieldName: string
    ): number[] {
        const result: number[] = [];
        const parts = value.split(",");
        console.log("Parsing parts:....", parts);
        for (const part of parts) {
            const num = Number.parseInt(part);
            if (!Number.isInteger(num))
                throw new Error(`Expression should be number ${fieldName}`);

            if (num < min) {
                throw new Error(
                    `Expression should be in range of ${min} - ${max} ${fieldName}`
                );
            }

            if (num > max) {
                throw new Error(
                    `Expression should be number ${min} - ${max} ${fieldName}`
                );
            }
            result.push(num);
        }
        return [...new Set(result)].sort((a, b) => a - b);
    }
    parseRange(
        value: string,
        min: number,
        max: number,
        fieldName: string
    ): number[] {
        const result: number[] = [];
        const parts = value.split("-").map(Number);
        for (let index = 0; index < parts.length; index++) {
            const num = parts[index] ?? -1;
            if (num === -1) {
                throw new Error(`Expression is Invalid  ${fieldName}`);
            }
            if (num > parts[index + 1]!) {
                throw new Error(
                    `Expression should be in incremented range e.g 3-4 ${fieldName}`
                );
            }
            if (num < min) {
                throw new Error(
                    `Expression should be in range of ${min} - ${max} ${fieldName}`
                );
            }

            if (num > max) {
                throw new Error(
                    `Expression should be number ${min} - ${max} ${fieldName}`
                );
            }
        }
        // check sequence
        for (let index = parts[0]!; index <= parts.at(-1)!; index++) {
            result.push(index);
        }
        return [...new Set(result)].sort((a, b) => a - b);
    }
    parseWildcard(min: number, max: number): number[] {
        const result: number[] = [];
        for (let index = min; index <= max; index++) {
            result.push(index);
        }
        return result;
    }
    parseStep(
        value: string,
        min: number,
        max: number,
        fieldName: string
    ): number[] {
        const step = parseInt(value.slice(2), 10);

        if (Number.isNaN(step) || step <= 0) {
            throw new Error(`Invalid step value in ${fieldName}: ${value}`);
        }

        const result: number[] = [];
        for (let i = min; i <= max; i += step) {
            result.push(i);
        }

        return [...new Set(result)].sort((a, b) => a - b);
    }
    private parseSingle(
        value: string,
        min: number,
        max: number,
        fieldName: string
    ): number[] {
        const num = parseInt(value, 10);
        const trimmed = value.trim();  
        if (!trimmed) {
            throw new Error(`Empty value in ${fieldName}`);
        }

        if (num < min || num > max) {
            throw new Error(
                `${fieldName} value ${value} is out of range (${min}-${max})`
            );
        }

        return [num];
    }
   
}
