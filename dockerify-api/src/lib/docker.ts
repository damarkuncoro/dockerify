import Docker from "dockerode";

const docker = new Docker(); // default: socket /var/run/docker.sock

export default docker;
