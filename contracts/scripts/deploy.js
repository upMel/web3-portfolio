const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const Portfolio = await hre.ethers.getContractFactory("Portfolio");
  const portfolio = await Portfolio.deploy();
  await portfolio.waitForDeployment();

  const address = await portfolio.getAddress();
  console.log("Portfolio deployed to:", address);

  const fs = require("fs");
  const deploymentInfo = {
    network: hre.network.name,
    address,
    deployedAt: new Date().toISOString(),
  };
  fs.writeFileSync(
    "../frontend/src/lib/deployment.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("Deployment info saved to frontend/src/lib/deployment.json");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
