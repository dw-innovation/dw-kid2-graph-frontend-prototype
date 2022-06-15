import React from "react";
import { RxQueryResultDoc, useRxQuery, useRxDB } from "rxdb-hooks";
import * as dbTypes from "../../db/types";
import * as queries from "../../db/queries";
import { DbsContext } from "./_context";

interface RenderDataPropTypes {
  documents: Array<object>;
  title: string;
}

const OneDb = (dbL: dbTypes.LoadedDb) => {
  const { db, name, description } = dbL;

  const { result: allBlocks }: RxQueryResultDoc<dbTypes.Block> = useRxQuery(queries.allBlocks(db));
  const { result: allData }: RxQueryResultDoc<dbTypes.Data> = useRxQuery(queries.allData(db));
  const { result: allExecutions }: RxQueryResultDoc<dbTypes.Execution> = useRxQuery(queries.allExecutions(db));
  const { result: allPages }: RxQueryResultDoc<dbTypes.Page> = useRxQuery(queries.allPages(db));

  const RenderData = ({ documents, title }: RenderDataPropTypes) => (
    <>
      <h2>{title}</h2>
      <ul>
        {documents.map((document: object, index: number) => (
          <li key={index}>
            <pre>{JSON.stringify(document, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <RenderData title="Blocks" documents={allBlocks} />
      <RenderData title="Data" documents={allData} />
      <RenderData title="Executions" documents={allExecutions} />
      <RenderData title="Pages" documents={allPages} />
    </div>
  );
};

const DbPage = () => {
  const dbs = React.useContext(DbsContext);
  return <div>{dbs.map(OneDb)}</div>;
};

export default DbPage;
