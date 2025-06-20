import { Router } from "express";
import { getImageInfo } from "./getImageInfo";

const router = Router();

router.get("/:imageName", async (req, res) => {
    const imageName = decodeURIComponent(req.params.imageName);

    try {
        const imageInfo = await getImageInfo(imageName);
        res.json(imageInfo);
    } catch (err) {
        res.status(404).json({ error: `Image "${imageName}" not found` });
    }
});

export default router;
