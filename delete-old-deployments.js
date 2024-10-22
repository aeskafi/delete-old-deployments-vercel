const { execSync } = require("child_process");

// Get the project name from command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error("Please provide a project name as a command-line argument.");
  process.exit(1);
}

try {
  // Get the list of deployments in JSON format for the provided project name
  const deployments = JSON.parse(execSync(`vercel list ${projectName} --json`));

  // Check if there are more than 5 deployments
  if (deployments.length <= 5) {
    console.log(
      "There are 5 or fewer deployments. No old deployments to delete."
    );
    process.exit(0);
  }

  // Get deployment IDs, excluding the latest 5
  const oldDeployments = deployments.slice(5); // Exclude the last 5 deployments

  // Delete each old deployment
  oldDeployments.forEach((deployment) => {
    console.log(`Deleting deployment: ${deployment.uid}`);
    execSync(`vercel remove ${deployment.uid} --yes`);
  });

  console.log(
    "All old deployments, except the last 5, have been deleted successfully."
  );
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
