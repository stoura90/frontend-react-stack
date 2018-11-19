// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";
import TableHeader from "Components/Table/TableHeader";
import TableBody from "Components/Table/TableBody";

type Props = {
  rows: Array<Object>,
  columnHeadings?: Array<string>,
  displayHeader?: boolean,
  className: string,
  cellPadding?: spacerSizes,
};
class Table extends PureComponent<Props> {
  render() {
    const {
      rows,
      columnHeadings = [],
      displayHeader = true,
      className,
      cellPadding = "default",
      ...rest
    } = this.props;

    const componentClasses = classNames("u-width--1/1", className);
    const columns = Object.keys(rows[0]);
    return (
      <table className={componentClasses}>
        {displayHeader && (
          <TableHeader
            cellPadding={cellPadding}
            columns={columns}
            columnHeadings={columnHeadings}
          />
        )}
        <TableBody
          columns={columns}
          cellPadding={cellPadding}
          rows={rows}
          {...rest}
        />
      </table>
    );
  }
}

export default Table;