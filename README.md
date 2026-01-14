# 🕒 Cron Expression Parser

A TypeScript-based command-line application that parses and expands cron expressions into human-readable format.

---

## 📋 Table of Contents

- [What is Cron?](#-what-is-cron)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Supported Syntax](#-supported-syntax)
- [Examples](#-examples)
- [Running Tests](#-running-tests)
- [Architecture](#-architecture)
---

## 🤔 What is Cron?

**Cron** is a time-based job scheduler in Unix-like operating systems. A **cron expression** is a string that defines a schedule for when a job should run.

### Cron Expression Format

```
* * * * * command
│ │ │ │ │
│ │ │ │ └─── Day of Week (0-6, Sunday=0)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of Month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

### Example
```bash
*/15 0 1,15 * 1-5 /usr/bin/find
```
This means: "Run `/usr/bin/find` at minute 0, 15, 30, and 45 of hour 0 on the 1st and 15th day of every month, and on every weekday (Monday-Friday)."

---

## ✨ Features

- ✅ Parse all standard cron expression formats
- ✅ Support for wildcards (`*`)
- ✅ Support for ranges (`1-5`)
- ✅ Support for lists (`1,2,3`)
- ✅ Support for step values (`*/15`)
- ✅ Support for mixed expressions (`1-5,10,15-20`)
- ✅ Comprehensive error handling
- ✅ Type-safe with TypeScript
- ✅ Clean, modular architecture
- ✅ Duplicate value removal
- ✅ Extensive test coverage

---

## 📁 Project Structure

```
cron-parser/
├── src/
│   ├── config/
│   │   └── cron.config.ts          # Configuration and constants
│   ├── parsers/
│   │   ├── crone.field.parser.ts     # Field parsing logic
│   │   └── cron.expression.parse.ts  # Expression parsing
│   ├── validators/
│   │   └── cron.validator.ts        # Validation logic
│   ├── formatters/
│   │   └── crone.format.ts          # Output formatting
│   ├── types/
│   │   └── cron.types.ts            # TypeScript interfaces
│   ├── cron.main.ts                 # Main orchestrator
│   └── index.ts                     # Entry point
│   ├── test/
│       └── cron.test-command.ts     # Test
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v22.14.0 or higher)
- **npm** (v10.9.2)

Check your versions:
```bash
node --version  # Should be v18+
npm --version
```

---
## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/cron-parser.git
cd cron-parser
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install development tools

```bash
npm install -D tsx typescript @types/node
```

---

## 🚀 Usage

### Basic Command

```bash
npx tsx src/app.ts "<cron-expression>"
```

### Example

```bash
npx tsx src/app.ts "*/15 0 1,15 * 1-5 /usr/bin/find"
```

### Output

```
minute         0 15 30 45
hour           0
day of month   1 15
month          1 2 3 4 5 6 7 8 9 10 11 12
day of week    1 2 3 4 5
command        /usr/bin/find
```

---

## 📖 Supported Syntax

### 1. **Wildcards** - Match all values

```bash
npx tsx src/index.ts "* * * * * /command"
```

### 2. **Single Values** - Specific value

```bash
npx tsx src/index.ts "5 14 15 6 5 /command"
```

### 3. **Ranges** - Range of values

```bash
npx tsx src/index.ts "0-5 8-17 1-7 1-6 0-4 /command"
```

### 4. **Lists** - Comma-separated values

```bash
npx tsx src/index.ts "0,15,30,45 9,12,18 * * * /command"
```

### 5. **Step Values** - Every nth value

```bash
npx tsx src/index.ts "*/15 */6 * * * /command"
```

### 6. **Mixed** - Combination of above

```bash
npx tsx src/index.ts "0,30 9 1-7,15-21 * 1,3,5 /command"
```

---
## 💡 Examples

### Example 1: Every 15 minutes
```bash
npx tsx src/index.ts "*/15 * * * * /backup.sh"
```
**Output:**
```
minute         0 15 30 45
hour           0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
day of month   1 2 3 4 5 ... 31
month          1 2 3 4 5 6 7 8 9 10 11 12
day of week    0 1 2 3 4 5 6
command        /backup.sh
```

### Example 2: Weekdays at 9 AM
```bash
npx tsx src/index.ts "0 9 * * 1-5 /workday.sh"
```
**Output:**
```
minute         0
hour           9
day of month   1 2 3 4 5 ... 31
month          1 2 3 4 5 6 7 8 9 10 11 12
day of week    1 2 3 4 5
command        /workday.sh
```

### Example 3: First and 15th of every month
```bash
npx tsx src/index.ts "0 0 1,15 * * /payroll.sh"
```
**Output:**
```
minute         0
hour           0
day of month   1 15
month          1 2 3 4 5 6 7 8 9 10 11 12
day of week    0 1 2 3 4 5 6
command        /payroll.sh
```

---

## 🧪 Running Tests

### Run all tests

```bash
npx tsx test/CronParser.test.ts
```

### Test categories

The test suite includes:
- ✅ **Valid expressions** (10 tests)
- ❌ **Invalid expressions** (11 tests)
```

## 🏗️ Architecture

The project follows a clean, modular architecture with separation of concerns:

### Components

#### 1. **CronValidator**
- Validates command-line arguments
- Validates cron expression format

#### 2. **CroneFieldParser**
- Parses wildcards (`*`)
- Parses step values (`*/n`)
- Parses ranges (`n-m`)
- Parses lists (`n,m,o`)
- Parses single values
- Removes duplicates

#### 3. **CronExpressionParser**
- Splits cron string into fields
- Validates field count
- Extracts command

#### 4. **CroneOutputFormatter**
- Formats parsed results
- Pads field labels
- Formats error messages

#### 5. **MainCron**
- Orchestrates all components
- Handles errors
- Returns formatted output

### Data Flow

```
Input String
    ↓
[Validate Args]
    ↓
[Parse Expression] → Split into fields
    ↓
[Parse Each Field] → minute, hour, day, month, weekday
    ↓
[Validate Values]
    ↓
[Format Output]
    ↓
Display Result
```

---
