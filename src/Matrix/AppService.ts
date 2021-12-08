import { AppService } from "matrix-appservice";
import fs from "fs";
import YAML from "yaml";

import joinRoom from "./User/Room/JoinRoom";
import login from "./User/login";
import whoami from "./User/whoami";
import presence from "./User/presence";

const file = fs.readFileSync("./registration.yaml", "utf8");
const config = YAML.parse(file);
// listening
const as = new AppService({
  homeserverToken: config.hs_token,
});
// as.on("type:m.room.message", (event) => {
//   // handle the incoming message
//   console.log("RECV message %s", event);
// });

as.on("type:m.room.message", async (event: any) => {
  console.log("RECV message", event);
});

login("@discord_yolo:sleepycat.date", config.as_token).then((e) => {
  presence(
    "@discord_yolo:sleepycat.date",
    JSON.parse(e.content).access_token
  ).then((e) => console.log(e));
  console.log(e);
});

as.on("type:m.room.member", async (event: any) => {
  console.clear();
  if (event.content.membership == "invite") {
    await joinRoom(
      event.state_key,
      event.sender,
      event.room_id,
      config.as_token
    );
    return;
  }
  if (event.content.membership == "leave") {
    console.log("leave");
    return;
  }
  console.log("RECV member", event);
});

as.onUserQuery = async function (userId) {
  // handle the incoming user query then respond
  console.log("RECV user %s", userId);
};
// can also do this as a promise
as.onAliasQuery = async function (alias) {
  console.log("RECV alias %s", alias);
};

as.listen(8010, "0.0.0.0", 2);

export default as;
