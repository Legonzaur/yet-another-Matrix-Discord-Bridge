import sendDiscordMessage from "./Discord/send_discord_message";
//sendDiscordMessage({ content: "test", username: "Legonzaura" });
import { Cli, Bridge, AppServiceRegistration } from "matrix-appservice-bridge";

new Cli({
  registrationPath: "yamdb-registration.yaml",
  generateRegistration: function (reg, callback) {
    reg.setId(AppServiceRegistration.generateToken());
    reg.setHomeserverToken(AppServiceRegistration.generateToken());
    reg.setAppServiceToken(AppServiceRegistration.generateToken());
    reg.setSenderLocalpart("discord_bot");
    reg.addRegexPattern("users", "@_discord_.*", true);
    reg.addRegexPattern("aliases", "#_discord_.*", true);
    callback(reg);
  },
  run: function () {
    let bridge = new Bridge({
      homeserverUrl: "https://sleepycat.date",
      domain: "sleepycat.date",
      registration: "yamdb-registration.yaml",
      controller: {
        onUserQuery: function (queriedUser) {
          return {}; // auto-provision users with no additonal data
        },

        onEvent: function (request, context) {
          let data = request.getData();
          if (
            data.type == "m.room.member" &&
            data.state_key == "@discord_bot:sleepycat.date" &&
            data.content.membership == "invite"
          )
            bridge.getIntent().join(data.room_id);
          console.log(request);
          return; // we will handle incoming matrix requests later
        },
      },
    });
    console.log("Matrix-side listening on port %s", 9000);
    bridge.run(9000);
  },
}).run();
