# Kakuro Helper 🤓

A web application that helps solve Kakuro puzzles by finding all possible number combinations that meet specific constraints.

## Features

- **Find all combinations**: Enter the number of cells and target sum to see all possible digit combinations
- **Exclude digits**: Specify digits that cannot be used (e.g., if they're already used elsewhere)
- **Include digits**: Require specific digits to be part of the solution
- **Smart highlighting**: Numbers that appear in all solutions are highlighted in green
- **Dark mode support**: Automatic theme switching based on system preferences
- **Responsive design**: Works seamlessly on mobile and desktop devices

## How to Use

1. **How many numbers?** - Enter the number of cells in your Kakuro segment (1-9)
2. **Sum of numbers?** - Enter the target sum for that segment
3. **Exclude?** - (Optional) Enter digits you want to exclude from solutions
4. **Include?** - (Optional) Enter digits that must be included in solutions
5. Click **Compute** to see all possible combinations

The app will show you all valid combinations and highlight numbers that appear in every solution, helping you identify guaranteed placements.

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the Kakuro Helper.
