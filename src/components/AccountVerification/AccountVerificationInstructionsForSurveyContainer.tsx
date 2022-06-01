import * as React from "react";
import { useSelector } from "react-redux";
import { TVerificationItem } from "@casumo/frontend-kyc/dist/models/verification-item.types";
import { TSurveyAnswer } from "@casumo/frontend-kyc/dist/models/survey.types";
import {
  Survey,
  reduceContentToCollectorAnswerLabels,
  reduceContentToCollectorQuestionLabels,
  reduceContentToSurvey,
} from "@casumo/frontend-kyc-react";
import { TCmsPage } from "@casumo/frontend-kyc/dist/shared/content.types";
import { playerIdSelector } from "Models/handshake";
import { useSubmitSurveyAnswersMutation } from "Models/kyc";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";

type Props = {
  item: TVerificationItem;
  content: {
    type: TCmsPage;
    item: TCmsPage;
    base: TCmsPage;
  };
};

export function AccountVerificationInstructionsForSurveyContainer({
  item,
  content,
}: Props) {
  const { navigate } = useCrossCodebaseNavigation();
  const playerId = useSelector(playerIdSelector) as string;

  const survey = reduceContentToSurvey(content.type.fields.collector_survey);
  const [submitAnswers] = useSubmitSurveyAnswersMutation();

  const navigateToList = () => navigate(ROUTE_IDS.ACCOUNT_VERIFICATION);

  const onCompletion = (answers: Array<TSurveyAnswer>) => {
    submitAnswers({
      playerId,
      key: { type: item.type, paymentMethodId: item.paymentMethodId },
      answers,
    });
    navigateToList();
  };

  return (
    <div className="tablet:p-md">
      <Survey
        content={{
          header: content.type.fields.header,
          title: content.type.fields.title,
          description: content.type.fields.description,
          collector: {
            title: content.type.fields.collector_title,
            submit: content.type.fields.collector_submit,
            questions: reduceContentToCollectorQuestionLabels(
              content.type.fields.collector_survey
            ),
            answers: reduceContentToCollectorAnswerLabels(
              content.type.fields.collector_survey
            ),
          },
        }}
        survey={survey}
        onHeaderAction={navigateToList}
        onCompletion={onCompletion}
      />
    </div>
  );
}
