import Docker from "dockerode";
const docker = new Docker();

export async function getAllNetworks() {
  const networks = await docker.listNetworks();

  return networks.map(net => ({
    id: net.Id,
    name: net.Name,
    driver: net.Driver,
    scope: net.Scope,
    containers: net.Containers ? Object.keys(net.Containers).length : 0,
    created: net.Created
  }));
}
