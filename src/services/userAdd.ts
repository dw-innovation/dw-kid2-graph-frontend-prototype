// A service for a user, using the frontent, to directly add
//  data to the database.
import { of } from "rxjs";

import * as Types from "@data-types/index";

import * as Queries from "@database/queries";

import { uniqueId } from "@frontend/utils";

import * as Utils from "@utils/index";

const execute = (config: Types.Config.PartialConfig) => async (data: Types.Data.Data) => {
  // TODO validate data
  const validData = data;

  const started_at = Utils.now();

  const finished_at = Utils.now();

  const newRecord: Types.Record.UserAdded = {
    document__id: uniqueId(),
    document__type: Types.Document.Type.Record,
    record__type: Types.Service.Type.user_added,
    record__started_at: started_at,
    record__finished_at: finished_at,
    record__of_data: [],
    record__to_data: [validData],
  };

  return newRecord;
};

const service: Types.Service.UserAdd = {
  // the user adding service is always available
  name: "User Added Service",
  type: Types.Service.Type.user_added,
  description: "the user may directly add data to the database",
  isAvailable: (..._) => of(true),
  execute,
};

export default service;
