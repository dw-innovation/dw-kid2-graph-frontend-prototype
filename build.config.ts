import { mergeAll } from "lodash/fp";

import * as Types from "@data-types/index";

import customConfig from "./custom.config.json";

/* prettier-ignore */
const envConfig =
  process.env.CUSTOM_config !== undefined
  ? JSON.parse(process?.env?.CUSTOM_config)
  : {};

// this is the config the app is built with, not the config which is loaded
//  at runtime.
//
// both configs have the same format, though, the type PartialConfig
//
const initialConfig: Types.Config.BuildConfig = {
  _type: "kid2_config",
  // these loads values
  runtime_loads: [
    // we allow the application to customize itself live in local storage,
    // this config should be loaded at runtime
    { _type: "local_storage_loader", key: "kid2_local_config" },
  ],
  dbs: [
    // add in two database types to demonstrate that pages can come from multiple dbs
    { _type: "local_db_config", name: "local_db_1", description: "Your first database" },
    { _type: "local_db_config", name: "local_db_2", description: "Your second database" },
    // you can also 'bake in' a permanent server to connect to he
    // {"_type": "server_db_config", "name": "shared_db", "location": "http://0.0.0.0:10102/" }
  ],
};

// TODO: consider if a deep merge should be used here.
// In the build we might want to overwrite these
export const config: Types.Config.BuildConfig = mergeAll([initialConfig, customConfig, envConfig]);
