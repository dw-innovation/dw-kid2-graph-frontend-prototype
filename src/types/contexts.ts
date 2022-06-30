import { LoadedDb } from "@data-types/index";
import { PartialConfig } from "@data-types/index";

export type diagnostic = "INITIAL" | "OK" | "ERROR" | "LOADING" | "WARNING" | "UNKNOWN";

export type status = {
  diagnostic: diagnostic;
  message: string;
};

export type AppState = {
  app: {
    activeDatabase?: string;
    activePage?: string;
    showDevPanel?: boolean;
  };
};

export type AppContext = {
  appState: AppState;
  setAppState?: React.Dispatch<React.SetStateAction<AppState>>;
};

export type DbContext = {
  databaseState: LoadedDb[];
  setDatabaseState?: React.Dispatch<React.SetStateAction<LoadedDb[]>>;
};

export type ConfigContext = {
  configState: PartialConfig;
  setConfigState?: React.Dispatch<React.SetStateAction<PartialConfig>>;
};