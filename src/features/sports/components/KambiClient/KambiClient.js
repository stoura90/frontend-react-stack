/* @flow */
import React from "react";
import gql from "graphql-tag";
import classNames from "classnames";
import type { ExecutionResult } from "@apollo/react-hooks";
import { getApolloContext } from "@apollo/react-hooks";
import { pick } from "ramda";
import * as A from "Types/apollo";
import bridge from "Src/DurandalReactBridge";
import { injectScript } from "Utils";
import { showTerms } from "Services/ShowTermsService";
import { getKambiWidgetAPI } from "Features/sports/kambi";
import { deTaxMessageUrl } from "./widgets/deTaxMessage";
import {
  kambiClientEventHandler,
  KAMBI_EVENTS,
} from "./kambiClientEventHandler";

import "./KambiClient.scss";

const SPORTS_FIRST_BET_QUERY = gql`
  query SportsFirstBetQuery {
    sportsFirstBet
  }
`;

type Props = {
  bootstrapUrl: string,
  market: string,
  locale: string,
  currency: string,
  playerId?: string,
  ticket?: string,
  onNavigate: string => any,
  homeRoute?: string,
  isHidden?: boolean,
  searchMode: boolean,
  isBetslipVisible?: boolean,
  sessionKeepAlive?: () => Promise<ExecutionResult<A.SessionTouch>>,
  onLoginCompleted?: () => void,
};

type State = {
  sportsFirstBet: boolean,
};

export default class KambiClient extends React.Component<Props, State> {
  static contextType = getApolloContext();

  state = { sportsFirstBet: false };

  static defaultProps = {
    onNavigate: () => {},
    searchMode: false,
    isBetslipVisible: true,
    onLoginCompleted: () => {},
  };

  componentDidMount() {
    this.redirectToUserHomeRoute();
    this.initIsFirstBet();

    /* eslint-disable fp/no-mutation */
    window._kc = {
      ...pick(["currency", "locale", "market", "playerId", "ticket"], {
        ...this.props,
      }),
      oddsFormat: this.props.market.toLowerCase().includes("gb")
        ? "fractional"
        : "decimal",
    };

    // pre-setup the widget api
    getKambiWidgetAPI();

    window.customerSettings = {
      enableOddsFormatSelector: true,
      enableNavigationPanel: false,
      hideHeader: true,
      enableFilterMenu: false,
      enableQuickBrowse: false,
      enableTermSearch: false,
      reservedRoutes: [],
      emptyClientRoutes: [/^search$/, "search#home"],
      heartbeat: this.props.sessionKeepAlive,
      notification: this.onNotification,
      loginUrl: "/log-in",
    };

    window.widgetSettings = {
      widgets: [
        {
          widgetId: "de-tax-message",
          url: deTaxMessageUrl,
          height: 55,
          conditions: {
            markets: ["DE"],
          },
        },
      ],

      targets: {
        betslipMain: [
          {
            widgetId: "de-tax-message",
          },
        ],
      },
    };
    /* eslint-enable fp/no-mutation */

    injectScript(this.props.bootstrapUrl);

    window.addEventListener("hashchange", this.handleHashChange);
    bridge.on("sports-path-updated", this.handleHashChange);

    // listen to events from widget iframes
    window.addEventListener("message", this.onWidgetMessage, false);
  }

  onNotification = (event: { [string]: any }) => {
    if (event.name === "loginRequestDone") {
      this.props.onLoginCompleted && this.props.onLoginCompleted();
    }

    const isFirstBet =
      event.data.event === KAMBI_EVENTS.PLACE_BET && this.state.sportsFirstBet;

    if (isFirstBet) {
      kambiClientEventHandler(event, true);
      this.setState({ sportsFirstBet: false });
    } else {
      kambiClientEventHandler(event, false);
    }
  };

  onWidgetMessage = (message: MessageEvent) => {
    // MessageEvent.data property is a mixed type so need to check the type here too
    if (!message.data || typeof message.data.type !== "string") {
      return;
    }

    if (message.data.type === "SHOW_TERMS") {
      getKambiWidgetAPI().then(wapi => {
        wapi.set(wapi.BETSLIP_MAXIMIZED, { maximized: false });
        showTerms();
      });
    }
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.homeRoute !== this.props.homeRoute) {
      this.redirectToUserHomeRoute(prevProps.homeRoute);
    }
  }

  componentWillUnmount() {
    window._kbc && window._kbc.dispose();
    window.removeEventListener("hashchange", this.handleHashChange);
  }

  redirectToUserHomeRoute = (prevHomeRoute: ?string) => {
    // allows kambi client to be hidden if search doesn't have a #filter (i.e. initial search view)
    if (this.props.searchMode) {
      return;
    }

    const onPrevHomeRoute =
      prevHomeRoute && window.location.hash === `#${prevHomeRoute}`;

    if (this.props.homeRoute && onPrevHomeRoute) {
      // eslint-disable-next-line fp/no-mutation
      window.location.hash = this.props.homeRoute;
    }
  };

  handleHashChange = () => {
    this.redirectToUserHomeRoute();
    this.props.onNavigate(window.location.hash);
  };

  initIsFirstBet = async () => {
    const { data } = await this.context.client.query({
      query: SPORTS_FIRST_BET_QUERY,
      fetchPolicy: "network-only",
    });

    data.sportsFirstBet && this.setState({ sportsFirstBet: true });
  };

  render() {
    return (
      <div
        className={classNames("t-background-grey-0", {
          "c-kambi-client--hidden": this.props.isHidden,
        })}
      >
        <div
          id="KambiBC"
          className="u-padding-top--md@desktop u-padding-top--sm@tablet u-padding-top--none@mobile"
        />

        {this.props.isBetslipVisible ? null : (
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .mod-KambiBC-betslip-container { display: none }
          `,
            }}
          />
        )}
      </div>
    );
  }
}
