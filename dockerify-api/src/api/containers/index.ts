// projects/dockerify/src/api/containers/index.ts
import { Router } from "express";
import { getAllContainers } from "./getAllContainers";


const router = Router();
router.get("/", async (req, res) => {
  try {
    const containers = await getAllContainers();
    res.json(containers);
  } catch (err) {
    console.error("Failed to list all containers", err);
    res.status(500).json({ error: "Failed to fetch containers" });
  }
});

export default router;