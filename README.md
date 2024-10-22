# Vercel Deployment Cleanup Script

This Node.js script is designed to safely clean up old Vercel deployments for a specified project, while keeping the last 5 deployments intact. It uses the Vercel API to list and remove deployments.

## Prerequisites

1. **Node.js**: Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
2. **Vercel API Token**:
   - You need a Vercel Personal Access Token for authentication.
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens) to generate a token.

## Setup

1. Clone or download this repository to your local machine.
2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Set the Vercel token as an environment variable:

   **Linux/macOS:**
   ```bash
   export VERCEL_TOKEN=your_vercel_token_here
   ```

   **Windows (Command Prompt):**
   ```bash
   set VERCEL_TOKEN=your_vercel_token_here
   ```

   **Windows (PowerShell):**
   ```powershell
   $env:VERCEL_TOKEN="your_vercel_token_here"
   ```

## Usage

1. Open a terminal and navigate to the directory where the script is located.
2. Run the script with the following command:

   ```bash
   node delete-old-deployments.js <project-name>
   ```

   Replace `<project-name>` with your actual project name.

   ### Example

   ```bash
   node delete-old-deployments.js my-vercel-project
   ```

## How It Works

1. The script accepts the **project name** as a command-line argument.
2. It retrieves a list of deployments for the specified project using the Vercel API.
3. It filters deployments to ensure only those belonging to the specified project are considered.
4. It keeps the last 5 deployments and marks the older ones for deletion.
5. The script displays a list of deployments that will be deleted and prompts for manual confirmation.
6. If confirmed, it deletes the marked deployments.

## Safety Features

- **Strict Project Filtering**: The script filters deployments by the specified project name to avoid unintended deletions.
- **Manual Confirmation**: Before deletion, the script displays a list of deployments and asks for confirmation.
- **Dry Run**: The initial run lists the deployments to be deleted without performing any deletions, allowing you to verify the results.

## Error Handling

- If no project name is provided, the script will display an error and exit.
- If there are 5 or fewer deployments, the script will exit without deleting any deployments.
- Any errors encountered during the process will be caught and displayed in the console.

## Notes

- **Be cautious** when using this script, as it can permanently delete deployments if used incorrectly.
- Always verify the list of deployments before confirming deletion.
- The script assumes you have sufficient permissions to delete deployments in the specified project.

## Dependencies

- [Node.js](https://nodejs.org/)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [dotenv](https://www.npmjs.com/package/dotenv)

## License

This script is open-source and available for use under the [MIT License](https://opensource.org/licenses/MIT).