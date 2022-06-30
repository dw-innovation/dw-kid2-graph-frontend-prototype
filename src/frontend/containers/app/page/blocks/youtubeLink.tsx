import { upsertOne } from "@db/index";
import * as Queries from "@db/queries";
import * as DatabaseTypes from "@data-types/index";
import YoutubeEmbed from "@frontend/components/app/page/blocks/youTube/youtubeEmbed";
import useConfigContext from "@frontend/hooks/contexts/useConfigContext";
import * as Logger from "@logger/index";
import userAddService from "@services/userAdd";
import React, { useState } from "react";
import { useRxQuery } from "rxdb-hooks";
import { Observable, of } from "rxjs";

const log = Logger.makeLogger("frontend/containers/block/youtubeLink");

export const Add = (props: { db: DatabaseTypes.LoadedDb; block: DatabaseTypes.BlockYoutubeInput }) => {
  const { db, block } = props;

  // @ts-ignore
  const { configState } = useConfigContext();
  // maybe undefined FIXME

  const [url, setUrl] = useState<string>("");

  const addLink = () => {
    // TODO validate that it _is_ actually a youtube link
    const validatedUrl = url;

    const data: DatabaseTypes.DataYoutubeUrl = DatabaseTypes.newDataYoutubeUrl(validatedUrl);

    userAddService
      .execute(
        db.instance,
        configState,
      )(data)
      .then((_) => {
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

export const Component = (props: { db: DatabaseTypes.LoadedDb; block: DatabaseTypes.BlockYoutubeInput }) => {
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
export const isAvailable = (db: DatabaseTypes.LoadedDb): Observable<boolean> => of(true);
/* prettier-ignore */
/* export const isAvailable = (db: dbTypes.LoadedDb): Observable<boolean> =>
 *   queries.allData(databaseDatabaseTypes.instance).$
 *          .pipe(map(docs => {
 *            return docs
 *              .filter(doc => doc.get().type == "youtube_url")
 *              .some(x => x)
 *          }))
 *  */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const add = async (db: DatabaseTypes.LoadedDb) => {
  log.debug("adding block");
  const newBlock: DatabaseTypes.BlockYoutubeInput = DatabaseTypes.newBlockYoutubeInput();
  await upsertOne(db.instance, newBlock);
  return newBlock;

};