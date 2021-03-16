import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import * as A from "Types/apollo";
import { compile, NOT_FOUND_STRING, LOADING_STRING } from "./utils";
import type { Replacements } from "./utils";

type Props = {
  /** The dictionary key for this translation, final key used will be `{key}.(singular/plural) depending on isPlural` */
  termKey: string;
  /** Whether the component should use the plural or singular version on the component */
  isPlural?: boolean;
  /** A replacements map, for variable replacements in the dictionary term string */
  replacements?: Replacements;
  /** Optional children, if provided this will be render prop component so children is a function of string -> Node */
  children?: (dictionaryTerm: string) => React.ReactNode;
};

export const PLURALISABLE_DICTIONARY_TERM_QUERY = gql`
  query PluralisableDictionaryTermQuery(
    $singularKey: String!
    $pluralKey: String!
  ) {
    singularTerm: dictionaryTerm(key: $singularKey)
    pluralTerm: dictionaryTerm(key: $pluralKey)
  }
`;

export const createSingularKey = (termKey: string) => `${termKey}.singular`;
export const createPluralKey = (termKey: string) => `${termKey}.plural`;

const getPluralisableDictionaryTerm = (
  data: A.PluralisableDictionaryTermQuery | undefined,
  loading: boolean,
  replacements?: Replacements,
  // @ts-expect-error ts-migrate(1016) FIXME: A required parameter cannot follow an optional par... Remove this comment to see the full error message
  isPlural: boolean
): string => {
  if (loading) {
    return LOADING_STRING;
  }

  if (
    data &&
    typeof data.singularTerm === "string" &&
    typeof data.pluralTerm === "string"
  ) {
    return compile(
      isPlural ? data.pluralTerm : data.singularTerm,
      replacements
    );
  }

  return NOT_FOUND_STRING;
};

export const PluralisableDictionaryTerm = ({
  termKey,
  replacements,
  isPlural = false,
  children,
}: Props): React.ReactNode => {
  const variables = {
    singularKey: createSingularKey(termKey),
    pluralKey: createPluralKey(termKey),
  };
  const { data, loading } = useQuery<
    A.PluralisableDictionaryTermQuery,
    A.PluralisableDictionaryTermQueryVariables
  >(PLURALISABLE_DICTIONARY_TERM_QUERY, {
    variables,
  });
  const dictionaryTerm = getPluralisableDictionaryTerm(
    data,
    loading,
    replacements,
    isPlural
  );

  // if children provided this is a render prop component, if not return the translation
  return children ? children(dictionaryTerm) : dictionaryTerm;
};