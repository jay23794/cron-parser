
import { ConfigCrone } from "../config/cron.config";
import type { CroneFunction, ParsedCronExpression } from "../types/cron.type";
import { CroneFieldParser } from "./crone.field.parser";

export class CronExpressionParser {
    constructor(private fieldParser: CroneFieldParser) {

    }
    parseField(cronExpressiom: CroneFunction): ParsedCronExpression {
        const result: Partial<ParsedCronExpression> = {
            command: cronExpressiom.command,
        };

        for (const fieldName of ConfigCrone.FIELD_ORDER) {
            const config = ConfigCrone.FIELD_CONFIG[fieldName]
            const value = cronExpressiom[fieldName]

            result[fieldName] = this.fieldParser.parse(value,
                config.min,
                config.max,
                config.label)
        }
        return result as ParsedCronExpression
    }
}