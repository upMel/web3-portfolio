const express = require("express");
const { getAllProjects, getProjectById } = require("../services/contractService");

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const projects = await getAllProjects();
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid project ID" });
    }
    const project = await getProjectById(id);
    res.json({ success: true, data: project });
  } catch (err) {
    if (err.message?.includes("Project does not exist")) {
      return res.status(404).json({ error: "Project not found" });
    }
    next(err);
  }
});

module.exports = router;
