import "reflect-metadata";
import express from "express";
import datasource from "./datasource.js";
import oidcCallback from "./oidc.js";

const app = express();
const PORT = 8000;

async function startServer() {
  try {
    await datasource.initialize();
    console.log("Connected to database successfully!");

    app.use("/oidc", oidcCallback(datasource));

    app.listen(PORT, () => {
      console.log(
        `oidc-provider listening on port ${PORT}, check the document discovery on /oidc/.well-known/openid-configuration`
      );
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
