import { post, get } from "../../../requests";

interface roomJoinBody {
  reason?: string;
  user_id: string;
}

async function checkIfUserExists(username: string, token: string) {
  if (username.startsWith("@")) {
    username = username.substring(1);
  }
  if (username.endsWith(":" + process.env.HOMESERVER_DOMAIN))
    username = username.replace(
      (":" + process.env.HOMESERVER_DOMAIN) as string,
      ""
    );
  return get(
    process.env.HOMESERVER_URL +
      "/_matrix/client/v3/register/available/?username=" +
      username,
    { Authorization: "Bearer " + token }
  );
}

async function createUser(username: string, token: string) {
  if (username.startsWith("@")) {
    username = username.substring(1);
  }
  if (username.endsWith(":" + process.env.HOMESERVER_DOMAIN))
    username = username.replace(
      (":" + process.env.HOMESERVER_DOMAIN) as string,
      ""
    );
  return post(
    process.env.HOMESERVER_URL + "/_matrix/client/v3/register",
    {
      type: "m.login.application_service",
      username,
    },
    { Authorization: "Bearer " + token }
  );
}
/**
 *
 * @param user The user invited
 * @param sender The sender of the invitation
 * @param roomId The ID of the room
 * @param token as_token as defined in registration.yaml
 */
export default async function joinRoom(
  user: string,
  sender: string,
  roomId: string,
  token: string
) {
  console.log(await checkIfUserExists(user, token));

  console.log(await createUser(user, token));
  return post(
    process.env.HOMESERVER_URL +
      "/_matrix/client/v3/join/" +
      roomId +
      "?user_id=" +
      user,
    {},
    { Authorization: "Bearer " + token }
  );
}
