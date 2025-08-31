import * as oidc from "oidc-provider";
import { DataSource } from "typeorm";
import { TypeormAdapter } from "./adapter.js";

export default (datasource: DataSource) => {
  const config: oidc.Configuration = {
    clients: [
      {
        client_id: "foo",
        client_secret: "bar",
        redirect_uris: ["http://localhost:3000/cb"],
        grant_types: ["authorization_code"],
      },
    ],
    adapter: (name: string) => new TypeormAdapter(name, datasource),
  };
  return new oidc.Provider("http://localhost:8000/", config).callback();
};
