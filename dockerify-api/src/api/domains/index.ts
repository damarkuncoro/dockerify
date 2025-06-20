import { Router } from "express";
import { getDomains } from "./getDomains";
import { getContainersByDomain } from "./getContainersByDomain";
import { getVolumesByDomain } from "./getVolumesByDomain";
import {
  startContainer,
  stopContainer,
  restartContainer,
  removeContainer,
} from "@/api/containers/actions";
import { removeVolume } from "@/api/volumes/actions";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await getDomains();
    res.setHeader("Content-Type", "application/json");
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(result);
  } catch (err) {
    console.error(err);
    // Log the error for debugging
    console.error("Error loading domains:", err);
    // Send a 500 response with an error message
    res.status(500).json({ error: "Failed to load domains" });
  }
});

router.get("/:domain", async (req, res) => {
  try {
    const domain = req.params.domain;
    const containers = await getContainersByDomain(domain);
    const volumes = await getVolumesByDomain(domain);
    res.setHeader("Content-Type", "application/json");
    res.json({
      domain,
      containers,
      volumes
    });
  } catch (err) {
    console.error("Error loading domain details:", err);
    res.status(500).json({ error: "Failed to load domain info" });
  }
});

router.get("/:domain/containers", async (req, res) => {
  try {
    const result = await getContainersByDomain(req.params.domain);
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to load containers" });
  }
});


router.get("/:domain/volumes", async (req, res) => {
  try {
    const result = await getVolumesByDomain(req.params.domain);
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to load volumes" });
  }
});


router.post("/container/:id/start", async (req, res) => {
  try {
    await startContainer(req.params.id);
    res.json({ message: "Container started" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to start container", details: err.message });
  }
});

router.post("/container/:id/stop", async (req, res) => {
  try {
    await stopContainer(req.params.id);
    res.json({ message: "Container stopped" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to stop container", details: err.message });
  }
});

router.post("/container/:id/restart", async (req, res) => {
  try {
    await restartContainer(req.params.id);
    res.json({ message: "Container restarted" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to restart container", details: err.message });
  }
});

router.delete("/container/:id", async (req, res) => {
  try {
    await removeContainer(req.params.id);
    res.json({ message: "Container removed" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove container", details: err.message });
  }
});

router.delete("/volume/:name", async (req, res) => {
  try {
    await removeVolume(req.params.name);
    res.json({ message: "Volume removed" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove volume", details: err.message });
  }
});

export default router;
