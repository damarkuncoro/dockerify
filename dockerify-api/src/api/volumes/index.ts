// projects/dockerify/src/api/volumes/index.ts
import { Router } from "express";
import { getAllVolumes } from "./getAllVolumes";
import { getVolumeById } from "./getVolumeByID";



const router = Router();
router.get("/", async (req, res) => {
  try {
    const volumes = await getAllVolumes();
    res.json(volumes);
  } catch (err) {
    console.error("Failed to list all volumes", err);
    res.status(500).json({ error: "Failed to fetch volumes" });
  }
});

router.get("/:volumeId", async (req, res) => {
  try {
    const result = await getVolumeById(req.params.volumeId);
    res.json(result);
  } catch (err) {
    console.error("Failed to list all volumes", err);
    res.status(404).json({ error:  `Volume "${req.params.volumeId}" not found` });
  }
});


export default router;