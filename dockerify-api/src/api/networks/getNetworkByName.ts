import Docker from "dockerode";
const docker = new Docker();

export async function getNetworkByName(name: string) {
  try {
    const networks = await docker.listNetworks({ filters: { name: [name] } });
    if (networks.length === 0) {
      throw new Error(`Network "${name}" not found`);
    }

    const network = docker.getNetwork(networks[0].Id);
    const inspect = await network.inspect();

    return {
      id: inspect.Id,
      name: inspect.Name,
      driver: inspect.Driver,
      scope: inspect.Scope,
      created: inspect.Created,
      containers: inspect.Containers,
      options: inspect.Options,
      labels: inspect.Labels,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get network "${name}": ${error.message}`);
    } else {
      throw new Error(`Failed to get network "${name}": ${String(error)}`);
    }
  }
}
