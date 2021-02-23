// @flow
import * as React from "react";
import classNames from "classnames";
import { pick } from "ramda";
import Flex from "@casumo/cmp-flex";
import { CloseIcon, SearchIcon } from "@casumo/cmp-icons";

import "./SearchInput.scss";

// relevant props from input field we wish to expose
type InputProps = {
  value: string,
  autofocus?: boolean,
  name?: string,
  placeholder?: string,
  onChange: () => void,
  onFocus: () => void,
  onBlur?: () => void,
  colorBackgroundClass?: string,
};

type SearchInputProps = {
  onBlur: () => void,
  onClear: () => void,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'empty'.
  children?: empty,
  noResults?: boolean,
};

type OwnProps = InputProps & SearchInputProps;

type State = {
  hasFocus: boolean,
};

const noop = () => {};

type Props = (OwnProps & typeof SearchInput.defaultProps);

class SearchInput extends React.Component<Props, State> {
  static defaultProps = {
    onBlur: noop,
    onFocus: noop,
    colorBackgroundClass: "t-background-white",
  };

  state = { hasFocus: false };
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  textInput: { current: ?HTMLInputElement } = React.createRef();

  get inputProps() {
    return pick(
      ["autofocus", "name", "onChange", "placeholder", "value"],
      this.props
    );
  }

  get input() {
    return this.textInput.current || { focus: noop, blur: noop };
  }

  handleClear = () => {
    this.input.focus();
    this.props.onClear();
  };

  // captures when a user touches an invisible div and
  // blurs the input to hide the mobile keyboard
  handleScroll = () => {
    this.setState({ hasFocus: false });
    this.input.blur();
  };

  onFocus = () => {
    this.props.onFocus();
    this.setState({ hasFocus: true });
  };

  onBlur = () => {
    this.props.onBlur();
    this.setState({ hasFocus: false });
  };

  render() {
    const { value, autofocus } = this.props;
    const { hasFocus } = this.state;

    const hasSearchTerm = Boolean(value);

    const containerClassName = classNames(
      "t-border-r--pill u-overflow--hidden",
      hasFocus && "t-elevation--30",
      this.props.colorBackgroundClass
    );

    return (
      <Flex align="center" className={containerClassName}>
        <Flex.Block>
          <label className="u-width--full o-flex o-flex-align--center u-padding--md">
            <SearchIcon className="t-color-grey-70" />
            <input
              ref={this.textInput}
              className={classNames(
                "c-search-input o-flex--1 u-padding-left t-color-grey-90 u-font-weight-bold",
                this.props.colorBackgroundClass
              )}
              type="text"
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              autoFocus={autofocus}
              {...this.inputProps}
            />
          </label>
        </Flex.Block>
        {hasSearchTerm && (
          <div
            className="u-padding-right--md u-padding-y--md"
            data-test="search-input-clear-button"
            onClick={this.handleClear}
          >
            <div className="t-color-white u-padding--sm t-border-r--circle u-overflow--hidden t-background-grey-90">
              <CloseIcon size="sm" className="u-display--block" />
            </div>
          </div>
        )}
        {hasFocus && (
          <div className="o-ratio__content" onTouchStart={this.handleScroll} />
        )}
      </Flex>
    );
  }
}

export default SearchInput;
