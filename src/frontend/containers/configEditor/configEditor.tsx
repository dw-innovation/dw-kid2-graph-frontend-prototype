import React from "react";
import * as ConfigTypes from "@data-types/index";
import { omit, get } from "lodash/fp";
import * as Logger from "@logger/index";
import * as Config from "src/config/index";
import useConfigContext from "@frontend/hooks/contexts/useConfigContext";

const log = Logger.makeLogger("frontent/pages/config");

const ConfigEditor = (props: { config: ConfigTypes.PartialConfig }) => {
  const { config } = props;
  const { from_loader: loader } = config;
  // @ts-ignore FIXME
  const { setConfigState } = useConfigContext();

  const editableLoaders = ["local_storage_loader"];
  const isEditable = loader && editableLoaders.includes(loader._type);
  const editableConfig = omit(["from_loader"], config);
  const [editableValue, setValue] = React.useState<string>(JSON.stringify(editableConfig, null, 2));

  const saveConfig = () => {
    const c = editableValue;
    log.debug(`saving config`, c);
    try {
      const cc = JSON.parse(c);
      // TODO verify valid config
      // TODO remove AS
      Config.toLocalStorage(loader as ConfigTypes.LocalStorageConfigLoader, cc);
      Config.load().then((c) => setConfigState(c));
      console.log(cc);
    } catch (e) {
      alert(`something went wrong ${e}`);
    }
  };

  return (
    <div>
      <h3>
        {(loader && loader._type) || "Build Config"} - {get("key", loader)}
      </h3>
      <textarea
        rows={20}
        cols={200}
        onChange={(e) => isEditable && setValue(e.target.value)}
        className="font-mono"
        disabled={!isEditable}
      >
        {editableValue}
      </textarea>
      {isEditable && <button onClick={saveConfig}>Save</button>}
      <hr />
    </div>
  );
};

export default ConfigEditor;
