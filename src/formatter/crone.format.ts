import { ConfigCrone } from "../config/cron.config";
import type { ParsedCronExpression } from "../types/cron.type";

export class CroneOutputFormatter {
    format(output:ParsedCronExpression):string{
        const lines:string[]=[]
        for(const fieldName of ConfigCrone.FIELD_ORDER){
            const config = ConfigCrone.FIELD_CONFIG[fieldName].label
            const value = output[fieldName]
            const formattedValues = value.join(' ');
            lines.push(this.formatLine(config, formattedValues));
           
        }
        lines.push(this.formatLine('command', output.command));
        return lines.join('\n');
    }

    private formatLine(label: string, value: string): string {
        const paddedLabel = label.padEnd(14);
        return `${paddedLabel} ${value}`;
  }
}