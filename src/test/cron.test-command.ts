import { MainCron } from "../cron.main";
import type { TestCase } from "../types/cron.type";
import { validTests } from "./cron.test.constants";

export class CroneTestRunner {
    private passed = 0;
    private failed = 0;
    private parser: MainCron;
    constructor() {
        this.parser = new MainCron()
    }
    async runTests() {
        console.log('Running Cron Parser Test Suite');
        await this.runValidTests();
        this.printSummary();
    }

    private async runValidTests() {
        for (const test of validTests) {
            this.runTest(test);
        }
    }

    private runTest(test: TestCase) {
        try {
            const args = ['node', 'index.js', test.input];
            console.log(test.shouldFail)
            const output = this.parser.parse(args);

            if (test.shouldFail) {
                console.log(`  Expected: Should fail`);
                console.log(`  Got: Success`);
                this.failed++;
                return;
            }

            // Check if output contains expected values
            let passed = true;
            for (const [field, expectedValue] of Object.entries(test.expected)) {
                if (!output.includes(expectedValue)) {
                    passed = false;
                    console.log(`  Field: ${field}`);
                    console.log(`  Expected: ${expectedValue}`);
                    console.log(`  Not found in output`);
                    break;
                }
            }

            if (passed) {
                this.passed++;
            } else {
                this.failed++;
            }
        } catch (error) {
            if (test.shouldFail) {
                this.passed++;
            } else {
                console.log(`  Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                this.failed++;
            }
        }
    }

    private printSummary() {
        console.log(`Total: ${this.passed + this.failed}`);
        console.log(
            `Success Rate: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(2)}%`
        );

        if (this.failed === 0) {
            console.log(`All tests passed`);
        } else {
            console.log(`Some test cased are failed`);
        }
    }
}

const runner = new CroneTestRunner();
runner.runTests();