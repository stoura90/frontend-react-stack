// @flow
import * as React from "react";
import * as R from "ramda";
import type { ModalKind } from "Models/modal";
import { cmsSlugs } from "Models/tac";
import { MODALS as SCS_MODALS } from "Models/slotControlSystem";
import { exitConfiguration } from "Services/SlotControlSystemService";
import { TermsAndConditionsContainer } from "./TermsAndConditions";
import { SlotControlSystemContainer } from "./SlotControlSystem";

type Mapping = {
  [ModalKind]: {
    // cms slug
    slug: string,
    // gets object returned from fetching cms page, Defaults to: R.prop('title')
    titleGetter?: Object => string,
    // gets object returned from fetching cms page, Defaults to: R.prop('content')
    contentGetter?: Object => string,
    // for cases when your modal is to complex
    customContent?: React.Node,
  },
};

/**
 * TODO: We have title/content getters for compatibility reason. Hopefully YOU,
 * from the future can unify shape of those modals. Make sure they are not used
 * in old stack!
 */
export const mappings: Mapping = {
  REEL_RACES_CAVEATS: {
    slug: "shared.tournament-terms",
    titleGetter: R.path(["fields", "title"]),
  },
  TERMS_AND_CONDITIONS: {
    slug: "toc",
  },
  TERMS_AND_CONDITIONS_SPAIN: {
    slug: cmsSlugs.main,
    customContent: <TermsAndConditionsContainer />,
  },
  PRIVACY_NOTICE: {
    slug: "toc.privacy-cookie-policy",
    contentGetter: R.path(["fields", "content"]),
  },
  [SCS_MODALS.CONFIGURATION]: {
    slug: "toc", // TODO, will change when PCC-255 progresses
    customContent: <SlotControlSystemContainer />,
    onHideModal: exitConfiguration,
    portalClassName: "c-rsmodal__portal--slot-control-system",
    headerBgColor: "white",
    headerTextColor: "black",
    headerIsTextCentered: true,
  },
};
