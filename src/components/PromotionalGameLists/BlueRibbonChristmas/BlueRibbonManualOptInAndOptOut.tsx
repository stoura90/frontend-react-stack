import * as React from "react";
import classNames from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { useManualJackpotOptInAndOptOut } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { Toggle } from "Components/Toggle/Toggle";
import { useTranslations } from "Utils/hooks";
import { isDesktop } from "Components/ResponsiveLayout";

export const BlueRibbonManualOptInAndOptOut = (props: {
  jackpotSlug: string;
  isLight?: boolean;
  isDesktop?: boolean;
}) => {
  const t = useTranslations<{
    opt_in_contribution_value: string;
    opt_in_cta: string;
    opt_in_notification_content: string;
    opt_in_notification_title: string;
    opt_in_t_and_c_apply: string;
  }>(`jackpots-configs.${props.jackpotSlug}`);
  const { optIn, optOut, status } = useManualJackpotOptInAndOptOut(
    props.jackpotSlug
  );
  const textColor = props.isLight ? "text-black" : "text-white";

  if (!t) {
    return null;
  }

  return (
    <Flex
      direction="horizontal"
      justify="space-between"
      align="center"
      className={classNames("u-padding c-br-footer-widget__optin-margin", {
        "bg-grey-90": !props.isLight,
        "bg-white": props.isLight,
        "t-border-r-top-left--md": props.isDesktop,
        "t-border-r-top-right--md": props.isDesktop,
        "u-padding-left--lg": props.isDesktop,
        "u-padding-right--lg": props.isDesktop,
      })}
    >
      <Flex direction="vertical">
        <Flex direction="horizontal">
          <Text
            tag="span"
            size="xs"
            className={classNames(
              "u-font-weight-bold u-display--flex",
              textColor
            )}
          >
            {t.opt_in_cta}
          </Text>
          <Text
            tag="span"
            size="xs"
            className="u-padding-left--sm text-blue-50 u-display--flex"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log("T&C modal not wired up");
            }}
          >
            {t.opt_in_t_and_c_apply}
          </Text>
        </Flex>
        <Text
          size="xs"
          tag="span"
          className={classNames("u-display--flex", textColor)}
        >
          {t.opt_in_contribution_value}
        </Text>
      </Flex>
      <Flex className={classNames("u-margin-left--md", isDesktop)}>
        <Toggle
          labelOn="ON"
          labelOff="OFF"
          checked={status}
          onChange={status ? optOut : optIn}
        />
      </Flex>
    </Flex>
  );
};
