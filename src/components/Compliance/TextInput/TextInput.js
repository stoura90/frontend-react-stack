// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import "./textInput.scss";

type Props = {
  currencySign: string,
  value: ?(string | number),
  onChange: any => void,
};

export function TextInput(props: Props) {
  return (
    <Flex
      align="end"
      className="u-margin-y u-font-3xlg u-font-weight-black u-line-height t-color-grey-dark-3 t-border-bottom t-border--current-color"
    >
      {props.currencySign}
      <input
        type="text"
        pattern="[0-9]*"
        inputMode="numeric"
        className="c-compliance-input u-padding-left--sm  u-font-3xlg u-font-weight-black u-line-height t-color-grey-dark-3 u-margin--none u-padding--none"
        value={props.value || ""} // hides lonely 0 as well
        onChange={props.onChange}
      />
    </Flex>
  );
}