import { CroneResult } from "../enum/app.enum";

  export const FIELD_CONFIG = {
    minute: { min: 0, max: 59, label: CroneResult.Minute },
    hour: { min: 0, max: 23, label: CroneResult.Hour },
    dayOfMonth: { min: 1, max: 31, label: CroneResult.DayOfMonth },
    month: { min: 1, max: 12, label: CroneResult.Month },
    dayOfWeek: { min: 0, max: 6, label: CroneResult.DayOfWeek },
  } as const;