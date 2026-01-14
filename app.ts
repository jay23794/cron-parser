import { MainCron } from "./src/cron.main";

function main(): void {
    const parser = new MainCron()
    const output = parser.parse(process.argv);
    console.log(output);

    if (output.startsWith('Error:')) {
        process.exit(1);
    }
}
main()