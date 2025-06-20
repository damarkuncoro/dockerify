// projects/dockerify/src/api/containers/actions.ts
import Docker from 'dockerode';

const docker = new Docker();

export async function startContainer(id: string) {
  const container = docker.getContainer(id);
  await container.start();
}

export async function stopContainer(id: string) {
  const container = docker.getContainer(id);
  await container.stop();
}

export async function restartContainer(id: string) {
  const container = docker.getContainer(id);
  await container.restart();
}

export async function removeContainer(id: string) {
  const container = docker.getContainer(id);
  await container.remove({ force: true });
}
