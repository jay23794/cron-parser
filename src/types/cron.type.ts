
export type CroneFunction = {
  minute: string;
  hour: string;
  dayOfMonth: string;
  dayOfWeek: string;
  month: string;
  command: string;
};


export interface ParsedCronExpression {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
  command: string;
}

export type CronFieldName = 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface CronField {
  min: number;
  max: number;
  label: string;
}

export interface TestCase {
    name: string;
    input: string;
    expected: {
        minute?: string;
        hour?: string;
        dayOfMonth?: string;
        month?: string;
        dayOfWeek?: string;
        command?: string;
    };
    shouldFail?: boolean;
}
