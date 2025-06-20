import express from "express";
import cors from "cors";
import domainRoutes from "./api/domains";
import containerRouters from "./api/containers";
import volumesRouters from "./api/volumes";
import imageRoutes from "./api/images";
import networkRoutes from "./api/networks";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dockerify API is running!");
});

app.use("/api/domains", domainRoutes); // <- PENTING
app.use("/api/containers", containerRouters); // <- PENTING
app.use("/api/volumes", volumesRouters); // <- PENTING
app.use("/api/images", imageRoutes);
app.use("/api/networks", networkRoutes);

app.listen(PORT, () => {
  console.log(`Dockerify running on http://localhost:${PORT}`);
});
