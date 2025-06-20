import { Router } from "express";
import { getAllNetworks } from "./getAllNetworks";
import { getNetworkByName } from "./getNetworkByName";


const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await getAllNetworks();
    res.json(result);
  } catch (err) {
    console.error("Failed to fetch networks", err);
    res.status(500).json({ error: "Failed to fetch networks" });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const result = await getNetworkByName(req.params.name);
    res.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(404).json({ error: message });
  }
});

export default router;
