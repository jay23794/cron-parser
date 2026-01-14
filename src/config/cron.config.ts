import { CroneResult } from "../enum/app.enum";
import type {  CronField, CronFieldName } from "../types/cron.type";

export class ConfigCrone {
    static readonly FIELD_CONFIG: Record<CronFieldName, CronField> = {
        minute: { min: 0, max: 59, label: CroneResult.Minute },
        hour: { min: 0, max: 23, label: CroneResult.Hour },
        dayOfMonth: { min: 1, max: 31, label: CroneResult.DayOfMonth },
        month: { min: 1, max: 12, label:  CroneResult.Month },
        dayOfWeek: { min: 0, max: 6, label:  CroneResult.DayOfWeek },
    }

    static readonly REQUIRED_FIELDS_COUNT = 6;
 
    static readonly FIELD_ORDER: CronFieldName[] = [
    'minute',
    'hour',
    'dayOfMonth',
    'month',
    'dayOfWeek',
  ];
  
}