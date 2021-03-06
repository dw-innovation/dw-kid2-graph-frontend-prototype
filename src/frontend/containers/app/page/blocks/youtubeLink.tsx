import { useRxQuery } from "rxdb-hooks";
import {
  Observable,
  of, // concatMap,
  /// delay
} from "rxjs";

import React, { useState } from "react";

import * as Types from "@data-types/index";

import { upsertOne } from "@database/index";
import * as Queries from "@database/queries";

import YoutubeEmbed from "@frontend/components/app/page/blocks/youtube/youtubeEmbed";
import useConfigContext from "@frontend/hooks/contexts/useConfigContext";

import * as Logger from "@logger/index";

import userAddService from "@services/userAdd";

const log = Logger.makeLogger("frontend/containers/block/youtubeLink");

export const Add = (props: { db: Types.Database.LoadedDatabase; block: Types.Block.YoutubeInput }) => {
  const { db, block } = props;

  // @ts-ignore
  const { configState } = useConfigContext();
  // maybe undefined FIXME

  const [url, setUrl] = useState<string>("");

  const addLink = () => {
    // TODO validate that it _is_ actually a youtube link
    const validatedUrl = url;

    const data: Types.Data.YoutubeUrl = Types.Data.newDataYoutubeUrl(validatedUrl);

    userAddService
      .execute(configState)(data)
      .then((e: Types.Record.UserAdded) => {
        Queries.upsertOne(db.instance, e);
        Queries.upsertDocs(db.instance, e.record__to_data);
        Queries.mergeBlock(db.instance, { document__id: block.document__id, block__data_id: data.document__id });
      });
  };

  return (
    <>
      <p>Add a youtube link:</p>
      <input placeholder="paste url" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={addLink}>Add</button>
    </>
  );
};

export const Component = (props: { db: Types.Database.LoadedDatabase; block: Types.Block.YoutubeInput }) => {
  const { db, block } = props;

  // @ts-ignore
  const { result, isFetching } = useRxQuery(Queries.data(db.instance, block.block__data_id));
  // FIXME
  const data = result[0]?.get();

  // isFetching will only be for a microsecond
  if (isFetching) return <div>isFetching</div>;

  if (!block.block__data_id || !data) return <Add db={db} block={block} />;

  if (!data.data__body) return <div>no url</div>;

  return <YoutubeEmbed url={data.data__body} />;
};

// the ability to add a youtube link is always available
export const isAvailable = (db: Types.Database.LoadedDatabase): Observable<boolean> => of(true);
/* prettier-ignore */
/* export const isAvailable = (db: dbTypes.LoadedDatabase): Observable<boolean> =>
 *   queries.allData(databaseDatabaseTypes.instance).$
 *          .pipe(map(docs => {
 *            return docs
 *              .filter(doc => doc.get().type == "youtube_url")
 *              .some(x => x)
 *          }))
 *  */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const add = async (db: Types.Database.LoadedDatabase) => {
  log.debug("adding block");
  const newBlock: Types.Block.YoutubeInput = Types.Block.newBlockYoutubeInput();
  await upsertOne(db.instance, newBlock);
  return newBlock;

};
