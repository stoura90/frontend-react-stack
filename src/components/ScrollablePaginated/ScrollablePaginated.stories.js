// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ArrowRightIcon } from "@casumo/cmp-icons";
import info from "Storybook/storybookInfo";
import ScrollablePaginated from "Components/ScrollablePaginated";

const stories = storiesOf("ScrollablePaginated", module);
const numberOfCells = 20;

const cellRenderer = ({ columnIndex, style }) => {
  return (
    <div style={style} onClick={action(`Clicked item ${columnIndex}`)}>
      <div
        style={{ height: 240, width: 200 }}
        className={columnIndex !== numberOfCells - 1 ? "u-padding-right" : null}
      >
        <div
          style={{ height: "100%", width: "100%" }}
          className="o-flex-justify--center o-flex-align--center t-background-red t-color-white"
        >
          {columnIndex}
        </div>
      </div>
    </div>
  );
};

const cellRendererAltWidths = ({ columnIndex, style }) => {
  const width = columnIndex % 3 === 0 ? 300 : 200;
  return (
    <div style={style}>
      <div
        style={{ height: "100%" }}
        className={columnIndex !== numberOfCells - 1 ? "u-padding-right" : null}
      >
        <div
          style={{ height: "100%" }}
          className="t-color-white t-background-red"
        >
          <div
            style={{ height: "100%", width: width }}
            className="o-flex-justify--center o-flex-align--center"
          >
            {columnIndex}
          </div>
        </div>
      </div>
    </div>
  );
};

const myButtonRenderer = () => (
  <div className="t-background-grey-dark-3 t-border-r--circle u-padding--md u-cursor-pointer">
    <ArrowRightIcon className="t-color-grey-light-3" />
  </div>
);

stories.add(
  "Default",
  () => (
    <ScrollablePaginated
      columnCount={numberOfCells}
      cellRenderer={cellRenderer}
      height={240}
      buttonRenderer={myButtonRenderer}
      buttonContainerClassName="s-stories-linear-gradient u-padding-horiz--xlg"
    />
  ),
  info({ text: "Default" })
);

stories.add(
  "Mixed width elements",
  () => (
    <div style={{ height: 204 }}>
      <ScrollablePaginated
        columnCount={numberOfCells}
        height={204}
        cellRenderer={cellRendererAltWidths}
        buttonRenderer={myButtonRenderer}
        buttonContainerClassName="s-stories-linear-gradient u-padding-horiz--xlg"
      />
    </div>
  ),
  info({ text: "Default" })
);
