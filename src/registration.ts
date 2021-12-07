import { AppServiceRegistration } from "matrix-appservice";

// creating registration files
const reg = new AppServiceRegistration(null);
reg.setAppServiceUrl("http://matrix-discord:8010");
reg.setHomeserverToken(AppServiceRegistration.generateToken());
reg.setAppServiceToken(AppServiceRegistration.generateToken());
reg.setSenderLocalpart("yamdb-appservice");
reg.setId("yamdb");
reg.addRegexPattern("users", "@.*", true);
reg.setProtocols(["discord"]); // For 3PID lookups
reg.outputAsYaml("registration.yaml");
