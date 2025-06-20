// projects/dockerify/src/api/containers/getAllContainers.ts
import Docker from "dockerode";

const docker = new Docker();

export async function getAllContainers() {
  const containers = await docker.listContainers({ all: true });

  return containers.map(container => ({
    id: container.Id,
    name: container.Names?.[0]?.replace(/^\//, '') || "",
    image: container.Image,
    state: container.State,
    status: container.Status,
    ports: container.Ports.map(p => `${p.PrivatePort}->${p.PublicPort ?? '-'}/${p.Type}`),
    labels: container.Labels
  }));
}
