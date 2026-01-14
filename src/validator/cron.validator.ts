import { ConfigCrone } from "../config/cron.config";
import type { ValidationResult } from "../types/cron.type";

export class CronValidator{
   validateCommandARGS(args: string[]):ValidationResult{
    if (!args || args.length !== 3) {
      return {
        isValid: false,
        error: 'Invalid command format. Usage: <program> "<cron-expression>"',
      };
    }
   return { isValid: true };
   }

   validateCronString(cronString: string):ValidationResult{
    const parts = cronString.trim().split(/\s+/);
     if (parts.length < ConfigCrone.REQUIRED_FIELDS_COUNT) {
      return {
        isValid: false,
        error: `Cron expression must have ${ConfigCrone.REQUIRED_FIELDS_COUNT} fields (minute hour day month weekday command)`,
      };
    }

    return { isValid: true };

   }
}