(async () => {
  require("dotenv").config();
  const fetch = await import("node-fetch"); // Use dynamic import for node-fetch

  // Get the project name from command line arguments
  const projectName = process.argv[2];
  const vercelToken = process.env.VERCEL_TOKEN; // Set Vercel token as an environment variable

  if (!projectName) {
    console.error("Please provide a project name as a command-line argument.");
    process.exit(1);
  }

  if (!vercelToken) {
    console.error("Please set the VERCEL_TOKEN environment variable.");
    process.exit(1);
  }

  // Fetch deployments from the Vercel API
  const getDeployments = async () => {
    try {
      const response = await fetch.default(
        `https://api.vercel.com/v6/deployments?limit=100`, // Fetch up to 100 deployments
        {
          headers: {
            Authorization: `Bearer ${vercelToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch deployments: ${response.statusText}`);
      }

      const data = await response.json();
      return data.deployments;
    } catch (error) {
      console.error("Error fetching deployments:", error.message);
      process.exit(1);
    }
  };

  // Delete deployment by ID
  const deleteDeployment = async (id) => {
    try {
      const response = await fetch.default(
        `https://api.vercel.com/v13/deployments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${vercelToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete deployment: ${response.statusText}`);
      }

      console.log(`Deleted deployment: ${id}`);
    } catch (error) {
      console.error("Error deleting deployment:", error.message);
    }
  };

  // Main function
  const main = async () => {
    const deployments = await getDeployments();

    // Filter deployments strictly by the specified project name
    const filteredDeployments = deployments.filter(
      (deployment) => deployment.name === projectName
    );

    if (filteredDeployments.length <= 5) {
      console.log(
        `There are 5 or fewer deployments for the project "${projectName}". No old deployments to delete.`
      );
      return;
    }

    // Exclude the last 5 deployments
    const oldDeployments = filteredDeployments.slice(5);

    if (oldDeployments.length === 0) {
      console.log(`No old deployments found for the project "${projectName}".`);
      return;
    }

    // Display deployments that will be deleted
    console.log(
      `The following deployments for "${projectName}" will be deleted:`
    );
    oldDeployments.forEach((deployment) =>
      console.log(`- ${deployment.url} (ID: ${deployment.uid})`)
    );

    // Manual confirmation before deletion
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      "Are you sure you want to delete these deployments? (yes/y/no/n): ",
      async (answer) => {
        if (["yes", "y"].includes(answer.toLowerCase())) {
          // Delete each old deployment
          for (const deployment of oldDeployments) {
            await deleteDeployment(deployment.uid);
          }

          console.log(
            `All old deployments for the project "${projectName}", except the last 5, have been deleted successfully.`
          );
        } else {
          console.log("Deletion canceled. No deployments were removed.");
        }

        rl.close();
      }
    );
  };

  main();
})();
