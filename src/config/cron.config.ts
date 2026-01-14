import type {  CronField, CronFieldName } from "../types/cron.type";

export class ConfigCrone {
    static readonly FIELD_CONFIG: Record<CronFieldName, CronField> = {
        minute: { min: 0, max: 59, label: 'minute' },
        hour: { min: 0, max: 23, label: 'hour' },
        dayOfMonth: { min: 1, max: 31, label: 'day of month' },
        month: { min: 1, max: 12, label: 'month' },
        dayOfWeek: { min: 0, max: 6, label: 'day of week' },
    }

    static readonly REQUIRED_FIELDS_COUNT = 6;
 
    static readonly FIELD_ORDER: CronFieldName[] = [
    'minute',
    'hour',
    'dayOfMonth',
    'month',
    'dayOfWeek',
  ];
    static CronFieldName: any;
}