import React from "react";
import { SportsModal } from "Features/sports/components/SportsModal";
import { SetFavouritesMutation } from "Features/sports/components/GraphQL";
import ModalButtonFooter from "Features/sports/components/ModalButtonFooter";
import {
  DictionaryTerm,
  PluralisableDictionaryTerm,
} from "Features/sports/components/DictionaryTerm";
import FavouriteSportsSelector from "../FavouriteSportsSelector";
import StageFavouritesConsumer from "../StageFavouritesContext/StageFavouritesConsumer";

type Props = {
  onClose: () => void;
  onAddCompetition: (id: number, name: string, isOnboarding: boolean) => void;
};

const FavouriteSportsSelectorModal = ({ onClose, onAddCompetition }: Props) => (
  <StageFavouritesConsumer>
    {api => {
      const selectedSportsCount = api.getSelectedSportsCount();

      return (
        <SportsModal>
          <SportsModal.Header onClose={onClose}>
            {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
            <DictionaryTerm termKey="favourite-sports-selector.title" />
          </SportsModal.Header>

          <SportsModal.Content>
            <FavouriteSportsSelector
              showCompetitionIntro={
                api.isFirstTimeSelectingFavouriteCompetitions
              }
              onAddCompetition={onAddCompetition}
            />
          </SportsModal.Content>

          {selectedSportsCount === 0 ? null : (
            <SportsModal.Footer>
              <SetFavouritesMutation variables={{ ids: api.getSelectedIds() }}>
                {/* @ts-expect-error ts-migrate(2559) FIXME: Type '(setFavouriteGroups: any) => Element' has no... Remove this comment to see the full error message */}
                {setFavouriteGroups => (
                  // @ts-expect-error ts-migrate(2786) FIXME: 'ModalButtonFooter' cannot be used as a JSX compon... Remove this comment to see the full error message
                  <ModalButtonFooter
                    onClick={() => {
                      setFavouriteGroups();
                      api.trackOnbordingSports();
                      onClose();
                    }}
                  >
                    {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
                    <PluralisableDictionaryTerm
                      termKey="favourite-sports-selector.button"
                      replacements={{ sportsCount: selectedSportsCount }}
                      isPlural={selectedSportsCount > 1}
                    />
                  </ModalButtonFooter>
                )}
              </SetFavouritesMutation>
            </SportsModal.Footer>
          )}
        </SportsModal>
      );
    }}
  </StageFavouritesConsumer>
);

export default FavouriteSportsSelectorModal;
