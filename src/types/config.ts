export type LocalStorageConfigLoader = { _type: "local_storage_loader"; key: string };
export type ServerConfigLoader = { _type: "server_loader"; endpoint: string; user: string; pass: string };

export type ConfigLoader = LocalStorageConfigLoader | ServerConfigLoader;

export type LocalDatabaseConfig = { _type: "local_db_config"; name: string; description?: string };
export type ServerDatabaseConfig = { _type: "server_db_config"; name: string; location: string; description?: string };

export type DatabaseConfig = LocalDatabaseConfig | ServerDatabaseConfig;

export type YoutubeDownloaderConfig = {
  api_url: string;
  user: string;
  password: string;
};

export type PartialConfig = {
  _type: "kid2_config";
  runtime_loads?: ConfigLoader[];
  dbs?: DatabaseConfig[];
  twitter?: { sample_api_key?: string };
  from_loader?: ConfigLoader;
  youtube_downloader?: YoutubeDownloaderConfig;
};

// BuildConfig requires the runtime loads set
export type BuildConfig = PartialConfig & { runtime_loads: ConfigLoader[] };

export const emptyConfig: PartialConfig = { _type: "kid2_config" };
