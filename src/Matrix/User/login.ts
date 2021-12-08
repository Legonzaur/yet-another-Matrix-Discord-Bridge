import { post } from "../../requests";
export default async function login(username: string, token: string) {
  console.log(username);
  return post(
    process.env.HOMESERVER_URL + "/_matrix/client/v3/login",
    {
      type: "m.login.application_service",
      identifier: {
        type: "m.id.user",
        user: username,
      },
    },
    { Authorization: "Bearer " + token }
  );
}
