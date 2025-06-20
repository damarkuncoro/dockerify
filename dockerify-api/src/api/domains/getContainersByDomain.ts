import docker from "@/lib/docker";

export async function getContainersByDomain(targetDomain: string) {
  const containers = await docker.listContainers({ all: true });
  const matched: any[] = [];

  for (const container of containers) {
    const details = await docker.getContainer(container.Id).inspect();
    const envVars = details.Config.Env || [];
    const virtualHost = envVars.find((e) => e.startsWith("VIRTUAL_HOST="));
    const domain = virtualHost?.split("=")[1];

    if (domain === targetDomain) {
      matched.push({
        id: container.Id,
        name: container.Names?.[0]?.replace("/", "") || container.Id,
        image: container.Image,
        state: container.State,
        status: container.Status,
      });
    }
  }

  return matched;
}
