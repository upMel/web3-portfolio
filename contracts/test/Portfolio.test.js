const { expect } = require("chai");
const hre = require("hardhat");

describe("Portfolio", function () {
  let portfolio;
  let owner;
  let other;

  beforeEach(async function () {
    [owner, other] = await hre.ethers.getSigners();
    const Portfolio = await hre.ethers.getContractFactory("Portfolio");
    portfolio = await Portfolio.deploy();
    await portfolio.waitForDeployment();
  });

  it("should deploy with owner set correctly", async function () {
    expect(await portfolio.owner()).to.equal(owner.address);
  });

  it("should allow owner to add a project", async function () {
    await portfolio.addProject("DeFi App", "A decentralized finance app", "https://example.com");
    const count = await portfolio.projectCount();
    expect(count).to.equal(1);
  });

  it("should return the correct project data", async function () {
    await portfolio.addProject("NFT Marketplace", "Buy and sell NFTs", "https://nft.example.com");
    const project = await portfolio.getProject(1);
    expect(project.name).to.equal("NFT Marketplace");
    expect(project.active).to.be.true;
  });

  it("should revert if non-owner tries to add a project", async function () {
    await expect(
      portfolio.connect(other).addProject("Hack", "attempt", "http://x.com")
    ).to.be.revertedWithCustomError(portfolio, "OwnableUnauthorizedAccount");
  });

  it("should allow owner to remove a project", async function () {
    await portfolio.addProject("Old Project", "Deprecated", "http://x.com");
    await portfolio.removeProject(1);
    await expect(portfolio.getProject(1)).to.be.revertedWith("Project does not exist");
  });

  it("should return all active projects", async function () {
    await portfolio.addProject("Project A", "Desc A", "http://a.com");
    await portfolio.addProject("Project B", "Desc B", "http://b.com");
    await portfolio.removeProject(1);
    const all = await portfolio.getAllProjects();
    expect(all.length).to.equal(1);
    expect(all[0].name).to.equal("Project B");
  });
});
