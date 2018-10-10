import React, { PureComponent } from "react";
import waitForElement from "wait-for-element";

// We need this component so we can wait for the host element to be available.
// This could happen when the route is active, but the view is not bound yet.
export class WaitForHostElement extends PureComponent {
  state = { el: null };

  async componentDidMount() {
    const { hostElementId } = this.props;
    const el = await waitForElement(`#${hostElementId}`);

    this.setState({ el });
  }

  render() {
    const { hostElementId, component: Component, ...rest } = this.props;
    return this.state.el && <Component {...rest} />;
  }
}
export default WaitForHostElement;
