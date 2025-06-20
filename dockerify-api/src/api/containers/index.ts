// projects/dockerify/src/api/containers/index.ts
import { Router } from "express";
import { getAllContainers } from "./getAllContainers";
import {startContainer, stopContainer, restartContainer, removeContainer} from "./actions"


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

router.post('/:id/start', async (req, res) => {
  const containerId = req.params.id;
  try {
    await startContainer(containerId);
    res.send({ message: 'Container started' });
  } catch (err) {
    res.status(500).send({ error: "500" });
  }
});


router.post('/:id/stop', async (req, res) => {
  const containerId = req.params.id;
  try {
    await stopContainer(containerId);
    res.send({ message: 'Container started' });
  } catch (err) {
    res.status(500).send({ error: "500" });
  }
});


router.post('/:id/restart', async (req, res) => {
  const containerId = req.params.id;
  try {
    await restartContainer(containerId);
    res.send({ message: 'Container started' });
  } catch (err) {
    res.status(500).send({ error: "500" });
  }
});
router.post('/:id/remove', async (req, res) => {
  const containerId = req.params.id;
  try {
    await removeContainer(containerId);
    res.send({ message: 'Container started' });
  } catch (err) {
    res.status(500).send({ error: "500" });
  }
});

export default router;