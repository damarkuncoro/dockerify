// projects/dockerify/src/api/volumes/getAllVolumes.ts
import Docker from "dockerode";
import type { VolumeInspectInfo } from 'dockerode';

interface ExtendedVolumeInspectInfo extends VolumeInspectInfo {
    CreatedAt?: string;
}

const docker = new Docker();

export async function getAllVolumes() {
    const data = await docker.listVolumes();
    const volumes = data.Volumes as ExtendedVolumeInspectInfo[];

    const filtered = volumes
        .map((v) => ({
            name: v.Name,
            driver: v.Driver,
            mountpoint: v.Mountpoint,
            labels: v.Labels,
            options: v.Options,
            createdAt: v.CreatedAt ?? 'unknown',
            scope: v.Scope
        }));

    return filtered;

}

