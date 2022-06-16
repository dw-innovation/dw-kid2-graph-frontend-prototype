import React from "react";
import { RxDatabase } from "rxdb";
import * as dbTypes from "../../../db/types";

import NoteBlock from "./note";

const NotFoundType = ({block}: {block: dbTypes.Block}) =>
  <>Block type {block?.type} not found</>

const BlockSwitch = ({ db, block }: { db: dbTypes.LoadedDb; block: dbTypes.Block }) =>
  block.type === "note"
  ? <NoteBlock db={db} block={block} />
  : <NotFoundType block={block} />;

const Block = (props: { db: dbTypes.LoadedDb; block: dbTypes.Block }) => {
  const { block, db } = props;

  return (
    <div className="block">
      <span className="meta-tag">{block.id}</span>
      <span className="meta-tag">{block.document_type}</span>
      <span className="meta-tag">{block.type}</span>
      <BlockSwitch db={db} block={block} />
    </div>
  );
};

export default Block;
