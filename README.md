# Vercel Deployment Cleanup Script

This Node.js script is designed to clean up old Vercel deployments for a specified project, while keeping the last 5 deployments intact. It uses the Vercel CLI to list and remove deployments.

## Prerequisites

1. **Node.js**: Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
2. **Vercel CLI**: Install the Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

3. **Authentication**: Ensure that you are logged in to your Vercel account using the Vercel CLI:

   ```bash
   vercel login
   ```

## Setup

1. Clone or download this repository to your local machine.
2. Save the script as `delete-old-deployments.js`.

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
2. It retrieves a list of deployments for the specified project using the Vercel CLI.
3. It excludes the last 5 deployments from deletion to ensure that recent deployments are preserved.
4. The script then iterates through the remaining deployments and removes each one using the Vercel CLI.

## Error Handling

- If no project name is provided, the script will display an error and exit.
- If there are 5 or fewer deployments, the script will exit without deleting any deployments.
- Any errors encountered during the process will be caught and displayed in the console.

## Notes

- **Be careful** when running this script, as it will permanently delete deployments.
- The script assumes that you have sufficient permissions to delete deployments in the specified project.

## Dependencies

- [Node.js](https://nodejs.org/)
- [Vercel CLI](https://vercel.com/docs/cli)
- [child_process](https://nodejs.org/api/child_process.html) (Node.js core module)

## License

This script is open-source and available for use under the [MIT License](https://opensource.org/licenses/MIT).