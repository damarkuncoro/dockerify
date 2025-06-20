import Docker from 'dockerode';

const docker = new Docker();

export async function removeVolume(name: string) {
  const volume = docker.getVolume(name);
  await volume.remove();
}
