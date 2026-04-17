const { ethers } = require("ethers");

const PORTFOLIO_ABI = [
  "function getAllProjects() view returns (tuple(uint256 id, string name, string description, string url, uint256 createdAt, bool active)[])",
  "function getProject(uint256 id) view returns (tuple(uint256 id, string name, string description, string url, uint256 createdAt, bool active))",
  "function projectCount() view returns (uint256)",
  "event ProjectAdded(uint256 indexed id, string name)",
  "event ProjectRemoved(uint256 indexed id)",
];

function getProvider() {
  const rpcUrl = process.env.RPC_URL || "http://localhost:8545";
  return new ethers.JsonRpcProvider(rpcUrl);
}

function getContract() {
  const address = process.env.CONTRACT_ADDRESS;
  if (!address) throw new Error("CONTRACT_ADDRESS not set in environment");
  return new ethers.Contract(address, PORTFOLIO_ABI, getProvider());
}

async function getAllProjects() {
  const contract = getContract();
  const projects = await contract.getAllProjects();
  return projects.map(formatProject);
}

async function getProjectById(id) {
  const contract = getContract();
  const project = await contract.getProject(id);
  return formatProject(project);
}

function formatProject(p) {
  return {
    id: Number(p.id),
    name: p.name,
    description: p.description,
    url: p.url,
    createdAt: new Date(Number(p.createdAt) * 1000).toISOString(),
  };
}

module.exports = { getAllProjects, getProjectById };
