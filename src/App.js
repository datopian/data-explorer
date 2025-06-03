import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import "./App.css";
import { QueryBuilder } from "@datopian/datastore-query-builder";
import DataView from "./components/DataView";
import Share from "./components/Share";
import Pagination from "./components/Pagination";
import { ChartBuilder } from "@datopian/chart-builder";
import { MapBuilder } from "@datopian/map-builder";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";
import {
  filterUIAction,
  fetchDataAction,
  dataViewBuilderAction,
  selectTabAction,
} from "./actions/";
import { getResourceForFiltering, showQueryBuilder } from "./utils";

import "./i18n/i18n";
import { useTranslation } from "react-i18next";

export const App = (props) => {
  const [isVisible, setIsVisible] = useState(null);
  useEffect(() => {
    const payload = {
      datapackage: props.datapackage,
      widgets: props.widgets,
    };
    if (isVisible) {
      props.fetchDataAction(payload);
    }
  }, [isVisible]);

  const activeWidget = props.widgets.find((widget) => {
    return widget.active;
  });

  const { t } = useTranslation();

  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isVisible && entry.isIntersecting) {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px", // no margin
        threshold: 0.5, // 50% of target visible
      },
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Clean up the observer
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  // Check if any of widgets requires datastore specific components:
  const nonDataStoreViewTypes = ["web", "document"];
  const datastoreComponents = props.widgets.find((widget) => {
    return widget.datapackage.views.find(
      (view) => !nonDataStoreViewTypes.includes(view.specType),
    );
  });

  const totalRows = props.datapackage.resources[0].datastore_active
    ? props.datapackage.resources[0].totalrowcount
      ? props.datapackage.resources[0].totalrowcount.toLocaleString()
      : ""
    : "";

  var distinguisher = "-" + Math.random().toString(36).slice(2, 5);
  const retrieveSelectedTab = activeWidget
    ? activeWidget.name
    : props.widgets[0].name;
  let selectedTab;

  if (retrieveSelectedTab.includes("-")) {
    selectedTab = retrieveSelectedTab;
  } else {
    selectedTab = retrieveSelectedTab + distinguisher;
  }
  var illegalCharacters = /\W+/gi;
  selectedTab = selectedTab.replace(illegalCharacters, "-");

  const tabLinks = props.widgets.map((widget, index) => {
    return (
      <TabLink
        to={(widget.name + distinguisher).replace(illegalCharacters, "-")}
        className={`mr-4 tab-${widget.name.toLowerCase()}`}
        key={`tabLink-${index}`}
      >
        {t(widget.name)}
      </TabLink>
    );
  });

  const tabContents = props.widgets.map((widget, index) => {
    return (
      <TabContent
        for={(widget.name + distinguisher).replace(illegalCharacters, "-")}
        className={`mr-4 tabpanel-${widget.name.toLowerCase()}`}
        key={`tabContent-${index}`}
      >
        {["table", "web"].includes(widget.datapackage.views[0].specType) ||
        ["dataexplorer_map_view", "dataexplorer_chart_view"].includes(
          widget.datapackage.views[0].view_type,
        ) ? (
          <div className="container flex py-6">
            <div className="w-full py-3">
              <DataView {...widget} />
            </div>
          </div>
        ) : (
          <div className="container flex py-6">
            <div className="w-3/4 py-3 mr-4">
              <DataView {...widget} />
            </div>
            <div className="w-1/4">
              <div className="w-full">
                <div className="p-4 mr-4">
                  {widget.datapackage.views[0].specType === "simple" ? (
                    <ChartBuilder
                      view={widget.datapackage.views[0]}
                      dataViewBuilderAction={props.dataViewBuilderAction}
                    />
                  ) : (
                    ""
                  )}
                  {widget.datapackage.views[0].specType === "tabularmap" ? (
                    <MapBuilder
                      view={widget.datapackage.views[0]}
                      dataViewBuilderAction={props.dataViewBuilderAction}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </TabContent>
    );
  });

  return (
    <div className="data-explorer">
      {totalRows && datastoreComponents && (
        <div className="total-rows">
          <span className="total-rows-label">{t("Total rows")}</span>:{" "}
          <span className="total-rows-value">{totalRows}</span>
        </div>
      )}
      {/* Data Editor (aka filters / datastore query builder) */}
      <div className="datastore-query-builder" ref={targetRef}>
        {showQueryBuilder(props) ? (
          <QueryBuilder
            resource={getResourceForFiltering(props.datapackage)}
            filterBuilderAction={props.filterUIAction}
          />
        ) : (
          ""
        )}
      </div>
      {/* End of Data Editor */}
      {/* Widgets (aka Views and Controls/Builders) */}
      {isVisible ? (
        <Tabs
          renderActiveTabContentOnly={true}
          handleSelect={(selectedTab) => {
            props.selectTabAction(selectedTab);
          }}
          className="data-explorer-content"
          selectedTab={selectedTab}
        >
          {tabLinks}
          {tabContents}
        </Tabs>
      ) : (
        <></>
      )}

      {/* Pagination for DataStore resources */}
      {props.datapackage.resources[0].datastore_active &&
      datastoreComponents ? (
        <Pagination
          datapackage={props.datapackage}
          updateAction={props.filterUIAction}
        />
      ) : (
        <div className="no-pagination not-datastore-resource"></div>
      )}
      {/* End of Pagination */}

      {/* Share feature */}
      {datastoreComponents ? (
        <Share
          serializedState={props.serializedState}
          apiUri={props.datapackage.resources[0].api}
        />
      ) : (
        <div className="no-share-feature"></div>
      )}
      {/* End of Share feature */}

      {/* End of Widgets */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  filterUIAction: (payload) => dispatch(filterUIAction(payload)),
  fetchDataAction: (payload) => dispatch(fetchDataAction(payload)),
  dataViewBuilderAction: (payload) => dispatch(dataViewBuilderAction(payload)),
  selectTabAction: (payload) => dispatch(selectTabAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
