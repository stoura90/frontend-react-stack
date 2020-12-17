// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Modal from "@casumo/cmp-modal";
import { stringToHTML } from "Utils";
import { useTranslations } from "Utils/hooks";

type Props = {
  closeModal: () => void,
};

export const ReelRacesTAC = ({ closeModal }: Props) => {
  const t = useTranslations<any>("shared.tournament-terms");

  return (
    <Modal closeIcon={{ action: closeModal }}>
      <Text tag="h3" className="u-padding u-margin-top--lg u-text-align-center">
        {t?.title}
      </Text>
      <Text
        className="u-padding u-text-align-center"
        dangerouslySetInnerHTML={stringToHTML(t?.content || "")}
      ></Text>
    </Modal>
  );
};
