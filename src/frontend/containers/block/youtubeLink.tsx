import { upsertOne } from "@db/index";
import * as queries from "@db/queries";
import * as Db from "@db/types";
import YoutubeEmbed from "@frontend/components/youtubeEmbed";
import useConfigContext from "@frontend/hooks/contexts/useConfigContext";
import { uniqueId } from "@frontend/utils";
import * as Logger from "@logger/index";
import userAddService from "@services/userAdd";
import React from "react";
import { useRxQuery } from "rxdb-hooks";
import {
  Observable,
  of, // concatMap,
  /// delay
} from "rxjs";

const log = Logger.makeLogger("frontend/containers/block/youtubeLink");

export const Add = (props: { db: Db.LoadedDb; block: Db.BlockYoutubeInput }) => {
  const { db, block } = props;
  const { configState } = useConfigContext();

  const [url, setUrl] = React.useState<string>("");

  const addLink = () => {
    // TODO validate that it _is_ actually a youtube link
    const validatedUrl = url;

    const data: Db.DataYoutubeUrl = Db.newDataYoutubeUrl(validatedUrl);

    userAddService
      .execute(
        db.instance,
        configState,
      )(data)
      .then((_) => {
        queries.mergeBlock(db.instance, { id: block.id, dataId: data.id });
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

export const Component = (props: { db: Db.LoadedDb; block: Db.BlockYoutubeInput }) => {
  const { db, block } = props;

  const { result, isFetching } = useRxQuery(queries.data(db.instance, block.dataId));
  const data = result[0]?.get();

  // isFetching will only be for a microsecond
  if (isFetching) return <div>isFetching</div>;

  if (!block.dataId || !data) return <Add db={db} block={block} />;

  if (!data.body) return <div>no url</div>;

  return <YoutubeEmbed url={data.body} />;
};

// the ability to add a youtube link is always available
export const isAvailable = (db: Db.LoadedDb): Observable<boolean> => of(true);
/* prettier-ignore */
/* export const isAvailable = (db: dbTypes.LoadedDb): Observable<boolean> =>
 *   queries.allData(db.instance).$
 *          .pipe(map(docs => {
 *            return docs
 *              .filter(doc => doc.get().type == "youtube_url")
 *              .some(x => x)
 *          }))
 *  */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const add = async (db: Db.LoadedDb) => {
  log.debug("adding block");
  const newBlock: Db.BlockYoutubeInput = Db.newBlockYoutubeInput();
  await upsertOne(db.instance, newBlock);
  return newBlock;

};
