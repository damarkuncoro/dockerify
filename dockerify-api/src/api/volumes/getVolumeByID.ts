import Docker from "dockerode";
import type { VolumeInspectInfo } from 'dockerode';

interface ExtendedVolumeInspectInfo extends VolumeInspectInfo {
    CreatedAt?: string;
}
const docker = new Docker();

export async function getVolumeById(volumeId: string) {
  try {
    
    const data = await docker.getVolume(volumeId).inspect();
    const volume = data as ExtendedVolumeInspectInfo;
    return {
      name: volume.Name,
      driver: volume.Driver,
      mountpoint: volume.Mountpoint,
      labels: volume.Labels,
      options: volume.Options,
      scope: volume.Scope
    };
  } catch (error) {
    throw new Error(`Volume "${volumeId}" not found`);
  }
}