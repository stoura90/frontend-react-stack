import React, { Component } from "react";
import LoadableText from "./LoadableText";

export default class Settings extends Component {
  render() {
    const {
      fullName,
      mobileNumber,
      address = [],
      email,
      subscribedToNewsletters,
      onChangeNewsletterSubscription
    } = this.props;

    return (
      <React.Fragment>
        <div className="page settings player">
          <div className="block-heading center">Your settings</div>

          <div>
            <ul className="list">
              <li className="list-item inactive">
                <div>
                  <div>Full Name</div>
                  <LoadableText text={fullName} />
                </div>
              </li>

              <li className="list-item inactive">
                <div>
                  <div>Email</div>
                  <div id="settings-email">
                    <LoadableText text={email} />
                  </div>
                </div>
              </li>

              <li className="list-item inactive">
                <div>
                  <div>Password</div>
                  <div>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</div>
                </div>
              </li>

              <li className="list-item inactive">
                <div>
                  <div>Mobile Number</div>
                  <div id="settings-number">{mobileNumber}</div>
                </div>
              </li>

              <li className="list-item inactive">
                <div>
                  <div>Address</div>
                  <div>
                    {address.map((a, i) => (
                      <React.Fragment key={i}>
                        {a}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </li>
              <li className="list-item inactive">
                <div>
                  <div>Subscribed To Newsletters</div>
                  <button
                    className={
                      "btn " + (subscribedToNewsletters ? "blue" : "green")
                    }
                    onClick={() =>
                      onChangeNewsletterSubscription(!subscribedToNewsletters)
                    }
                  >
                    Turn {subscribedToNewsletters ? "off" : "on"}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}