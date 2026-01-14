import type { TestCase } from "../types/cron.type";


export const validTests: TestCase[] = [
    {
        name: 'Single values',
        input: '5 14 15 6 5 /usr/bin/cmd',
        expected: {
            minute: '5',
            hour: '14',
            dayOfMonth: '15',
            month: '6',
            dayOfWeek: '5',
            command: '/usr/bin/cmd',
        },
    },
    {
        name: 'Comma-separated values',
        input: '0,15,30,45 9,12,18 1,15 1,6,12 1,3,5 /task.sh',
        expected: {
            minute: '0 15 30 45',
            hour: '9 12 18',
            dayOfMonth: '1 15',
            month: '1 6 12',
            dayOfWeek: '1 3 5',
        },
    },
    {
        name: 'Simple ranges',
        input: '0-5 8-17 1-7 1-6 0-4 /backup.sh',
        expected: {
            minute: '0 1 2 3 4 5',
            hour: '8 9 10 11 12 13 14 15 16 17',
            dayOfMonth: '1 2 3 4 5 6 7',
            month: '1 2 3 4 5 6',
            dayOfWeek: '0 1 2 3 4',
        },
    },
    {
        name: 'Comma + Range mixed',
        input: '0,30 9 1-7,15-21 * 1,3,5 /mixed.sh',
        expected: {
            minute: '0 30',
            hour: '9',
            dayOfMonth: '1 2 3 4 5 6 7 15 16 17 18 19 20 21',
            dayOfWeek: '1 3 5',
        },
    },
    {
        name: 'Multiple ranges',
        input: '0 9 1-3,10-12,20-22 * * /cmd',
        expected: {
            dayOfMonth: '1 2 3 10 11 12 20 21 22',
        },
    },
    {
        name: 'Step syntax',
        input: '*/15 */6 */10 */3 */2 /script.sh',
        expected: {
            minute: '0 15 30 45',
            hour: '0 6 12 18',
            dayOfMonth: '1 11 21 31',
            month: '1 4 7 10',
            dayOfWeek: '0 2 4 6',
        },
    },
    {
        name: 'Wildcard',
        input: '* * * * * /echo',
        expected: {
            minute: '0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59',
            hour: '0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23',
        },
    },

]
