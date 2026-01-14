
import { CroneOutputFormatter } from "./formatter/crone.format";
import  { CronExpressionParser } from "./parser/cron.expression.parse";
import { CroneFieldParser } from "./parser/crone.field.parser";
import type { CroneFunction } from "./types/cron.type";
import { CronValidator } from "./validator/cron.validator";

export class MainCron {
    private validator: CronValidator;
    private expressionParse: CronExpressionParser;
    private format: CroneOutputFormatter;
    constructor(
    ) {
        this.validator = new CronValidator();
        this.expressionParse = new CronExpressionParser(new CroneFieldParser())
        this.format = new CroneOutputFormatter()
    }

    parse(args: string[]): string {

        // Validation of command
        const argsValidation = this.validator.validateCommandARGS(args)
        if (!argsValidation.isValid) {
            throw new Error(argsValidation.error!);
        }
        const cronString = args[2] ?? ""
        const cronExpressionValidation = this.validator.validateCronString(cronString)

        if (!cronExpressionValidation.isValid) {
            throw new Error(argsValidation.error!);
        }


        // Extract expression from command
        const parts = cronString.trim().split(/\s+/);

        const [minute = "", hour = "", dayOfMonth = "", month = "", dayOfWeek = "", command = ""] = parts;

        // convert command to objects
        const expression: CroneFunction = {
            minute, hour, dayOfMonth, month, dayOfWeek, command
        }
        const parsed =  this.expressionParse.parseField(expression)
        return this.format.format(parsed)
        
    }
}
