import React, { Fragment } from "react";
import * as Types from "@data-types/index";
import Page from "@frontend/containers/page";
import Pages from "@frontend/containers/pages";
import useAppContext from "@frontend/hooks/contexts/useAppContext";
import useDbContext, { getactiveDatabase } from "@frontend/hooks/contexts/useDbContext";

const ApplicationContainer = () => {
  const {
    // @ts-ignore
    appState: {
      app: { activeDatabase, activePage },
    },
    // @ts-ignore
    setAppState,
  } = useAppContext();
  // appContext can be undefined FIXME

  // @ts-ignore
  const { dbState: dbs } = useDbContext();
  // dbcontext can be undefined FIXME

  const openPage = (d: Types.LoadedDb) => (p: Types.Page) => {
    setAppState((prev) => ({ ...prev, app: { ...prev.app, activePage: p.document__id } }));
    setAppState((prev) => ({ ...prev, app: { ...prev.app, activeDatabase: d.name } }));
  };

  const activeDatabaseInstance = getactiveDatabase(activeDatabase, dbs);

  return (
    <>
      <div style={{ width: "20rem", backgroundColor: "#f7f6f3" }} className="p-2">
        {dbs.map((d, index) => (
          <Fragment key={index}>
            <Pages db={d} open={openPage(d)} />
            {index + 1 < dbs.length && <hr />}
          </Fragment>
        ))}
      </div>
      <div className="p-2 flex-1 mx-auto">
        {activePage && activeDatabase && activeDatabaseInstance && (
          <Page db={activeDatabaseInstance} pageID={activePage} />
        )}
      </div>
    </>
  );
};

export default ApplicationContainer;
