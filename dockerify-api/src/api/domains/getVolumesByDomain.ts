import docker from "@/lib/docker";
import type { VolumeInspectInfo } from 'dockerode';

interface ExtendedVolumeInspectInfo extends VolumeInspectInfo {
    CreatedAt?: string;
}

export async function getVolumesByDomain(domain: string) {
    //   const volumes = await docker.listVolumes();
    const data = await docker.listVolumes();
    const volumes = data.Volumes as ExtendedVolumeInspectInfo[];

   const filtered = volumes
    .filter((v) => v.Name.includes(domain))
    .map((v) => ({
      name: v.Name,
      driver: v.Driver,
      mountpoint: v.Mountpoint,
      createdAt: v.CreatedAt ?? 'unknown',
    }));

  return filtered;

}
