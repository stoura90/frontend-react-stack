// @flow
import * as React from "react";
import { EditIcon, WarningIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as A from "Types/apollo";
import { SettingsLabelAndValue } from "Components/Settings/SettingsLabelAndValue/SettingsLabelAndValue";
import { launchModal } from "Services/LaunchModalService";
import { MODALS, KO_EVENTS } from "Src/constants";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { hasAlphaCharactersOnly } from "Utils";
import { PASSWORD_PLACEHOLDER_VALUE, onOldStackEvent } from "./utils";

type Props = {
  player: A.SETTINGS_PLAYER,
  labels: {
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    name: ?string,
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    email: ?string,
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    password: ?string,
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    mobileNumber: ?string,
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    address: ?string,
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    edit: ?string,
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    verify: ?string,
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    gamblingExtent: ?string,
  },
  refetchSettings: () => {},
};

const { ACCOUNT_SETTINGS } = MODALS;

const RowTemplate = ({
  label,
  value,
  action,
  onClick,
}: {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  label: ?string,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  value?: React.Node,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  action?: React.Node,
  onClick?: () => void,
}) => (
  <div onClick={onClick}>
    <SettingsRow text={<SettingsLabelAndValue label={label} value={value} />}>
      {action}
    </SettingsRow>
  </div>
);

export class SettingsAccountDetails extends React.PureComponent<Props> {
  componentDidMount() {
    const { refetchSettings } = this.props;
    onOldStackEvent(KO_EVENTS.ACCOUNT_SETTINGS.COMMAND_EXECUTED, data => {
      if (data.success) {
        refetchSettings();
      }
    });
  }

  render() {
    const {
      labels,
      player: { details },
    } = this.props;
    const labelsAndDetails = { labels, details };

    return (
      <div className="u-padding-top u-padding-top--2xlg@tablet u-padding-top--2xlg@desktop">
        <div className="t-elevation--30@tablet t-elevation--30@desktop">
          <Name {...labelsAndDetails} />
          <Email {...labelsAndDetails} />
          <ExtentOfGambling {...labelsAndDetails} />
          {details.canChangePassword && <Password labels={labels} />}
          {details.phoneNumber.verified ? (
            <VerifiedMobileNumber {...labelsAndDetails} />
          ) : (
            <UnverifiedMobileNumber {...labelsAndDetails} />
          )}
          <Address {...labelsAndDetails} />
        </div>
      </div>
    );
  }
}

const Name = ({ labels, details }) => {
  // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
  const fullName = hasAlphaCharactersOnly(details.name.first)
    ? `${details.name.last} ${details.name.first}`
    : `${details.name.first} ${details.name.last}`;

  return <RowTemplate label={labels.name} value={fullName} />;
};

const Email = ({ labels, details }) => (
  <RowTemplate
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ modal: string; }' is not assig... Remove this comment to see the full error message
    onClick={() => launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_EMAIL })}
    label={labels.email}
    value={details.email}
    action={
      <EditIcon className="t-background-grey-0 t-color-grey-90 u-padding t-border-r--circle" />
    }
  />
);

const ExtentOfGambling = ({ labels, details }) => {
  if (details.extentOfGambling.canChange) {
    return (
      <RowTemplate
        onClick={() =>
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ modal: string; }' is not assig... Remove this comment to see the full error message
          launchModal({
            modal: ACCOUNT_SETTINGS.CHANGE_EXTENT_OF_GAMBLING,
          })
        }
        label={labels.gamblingExtent}
        action={
          <EditIcon className="t-background-grey-0 t-color-grey-90 u-padding t-border-r--circle" />
        }
        value={details.extentOfGambling.label}
      />
    );
  }
  return null;
};

const Password = ({ labels }) => {
  return (
    <RowTemplate
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ modal: string; }' is not assig... Remove this comment to see the full error message
      onClick={() => launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_PASSWORD })}
      label={labels.password}
      value={PASSWORD_PLACEHOLDER_VALUE}
      action={
        <EditIcon className="t-background-grey-0 t-color-grey-90 u-padding t-border-r--circle" />
      }
    />
  );
};

const VerifiedMobileNumber = ({ labels, details }) => (
  <RowTemplate
    onClick={() =>
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ modal: string; }' is not assig... Remove this comment to see the full error message
      launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_MOBILE_NUMBER })
    }
    label={labels.mobileNumber}
    value={`(${details.phoneNumber.prefix}) ${details.phoneNumber.number}`}
    action={
      <EditIcon className="t-background-grey-0 t-color-grey-90 u-padding t-border-r--circle" />
    }
  />
);

const UnverifiedMobileNumber = ({ labels, details }) => (
  <a href="/player/settings/phone-number">
    <RowTemplate
      label={labels.mobileNumber}
      value={`(${details.phoneNumber.prefix}) ${details.phoneNumber.number}`}
      action={
        <Flex align="center" spacing="sm">
          <Flex.Item>
            <WarningIcon
              size="sm"
              className="t-color-red-30 t-border-current t-border t-border-r--circle t-border--md"
            />
          </Flex.Item>
          <Flex.Item>
            <Text tag="strong" size="sm" className="t-color-red-30">
              {labels.verify}
            </Text>
          </Flex.Item>
        </Flex>
      }
    />
  </a>
);

const Address = ({ labels, details }) => (
  <RowTemplate
    label={labels.address}
    value={
      <>
        <div>{details.address.street}</div>
        <div>{details.address.postCode}</div>
        <div>{details.address.city}</div>
        <div>{details.address.country.name}</div>
      </>
    }
  />
);
