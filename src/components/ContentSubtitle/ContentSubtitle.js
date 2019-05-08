// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";

type Props = {
  /** The Subtitle text to render */
  subtitle: string,
};

export class ContentSubtitle extends PureComponent<Props> {
  render() {
    const { subtitle } = this.props;

    return (
      <Text className="u-padding-horiz--lg u-margin-bottom--lg" tag="h2">
        {subtitle}
      </Text>
    );
  }
}
