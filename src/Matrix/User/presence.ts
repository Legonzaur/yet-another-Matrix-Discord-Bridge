import { put } from "../../requests";

export default async function presence(username: string, token: string) {
  return put(
    process.env.HOMESERVER_URL +
      "/_matrix/client/v3/presence/" +
      username +
      "/status",
    {
      presence: "online",
      status_msg: "I am here.",
    },
    { Authorization: "Bearer " + token }
  );
}
