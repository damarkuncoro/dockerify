import Docker from "dockerode";
const docker = new Docker();

export async function getImageInfo(imageName: string) {
  try {
    const image = docker.getImage(imageName);
    const inspect = await image.inspect();
    return {
      id: inspect.Id,
      repoTags: inspect.RepoTags,
      size: inspect.Size,
      created: inspect.Created,
      architecture: inspect.Architecture,
      os: inspect.Os,
      dockerVersion: inspect.DockerVersion,
      labels: inspect.Config?.Labels || {}
    };
  } catch (error) {
    throw new Error(`Image "${imageName}" not found`);
  }
}
