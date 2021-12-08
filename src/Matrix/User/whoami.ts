import { get } from "../../requests";
export default async function login(username: string, token: string) {
  return get(
    process.env.HOMESERVER_URL +
      "/_matrix/client/v3/account/whoami?user_id=" +
      username,

    { Authorization: "Bearer " + token }
  );
}
