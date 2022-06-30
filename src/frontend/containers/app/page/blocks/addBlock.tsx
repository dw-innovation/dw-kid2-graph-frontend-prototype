import useConfigContext from "@frontend/hooks/contexts/useConfigContext";
import * as Note from "./note";
import * as YoutubeLink from "./youtubeLink";
import * as DownloadYoutube from "./youtubeDownload";

import * as DatabaseTypes from "@data-types/index";
import { useObservable } from "@frontend/utils";
import React from "react";

const AddBlock = (props: { db: DatabaseTypes.LoadedDb; onAdd?: (block: DatabaseTypes.Block) => void }) => {
  const { db, onAdd = (_) => {} } = props;

  // @ts-ignore could be undefined FIXME
  const { configState: config } = useConfigContext();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const maybeAddNote = useObservable(Note.isAvailable(db)) && (
    <button onClick={(_) => Note.add(db).then(onAdd)}>Add Note</button>
  );
  const maybeAddYoutube = useObservable(YoutubeLink.isAvailable(db)) && (
    <button onClick={(_) => YoutubeLink.add(db).then(onAdd)}>Add Youtube Link</button>
  );
  const maybeAddYoutubeDownload = useObservable(DownloadYoutube.isAvailable(db, config)) && (
    <button onClick={(_) => DownloadYoutube.add(db).then(onAdd)}>Download Youtube Video</button>
  );

  return (
    <div className="app-block">
      {maybeAddNote}
      {maybeAddYoutube}
      {maybeAddYoutubeDownload}
    </div>
  );
};

export default AddBlock;