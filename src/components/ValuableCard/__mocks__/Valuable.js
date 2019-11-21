// @flow
export default [
  {
    __typename: 'PlayerValuableCash',
    id: "123",
    valuableType: "cash",
    title: "€50 Bonus Money",
    currency: "EUR",
    caveat: "Min dep £10. 30x wag req. T&C's apply.",
    market: "en",
    rule: {
      __typename: 'PlayerValuableRule',
      id: '1',
      name: 'rule1',
    },
    backgroundImage: "https://cms.casumo.com/wp-content/uploads/2019/04/background-cash.png",
    expirationTimeInHours: 100,
    expiryDate: 1569794399000,
    valuableState: "Fresh",
    content: "",
    requirementType: "deposit",
    wageringThreshold: null,
    leftToWager: null,
    magnitude: 1.0,
  },
  {
    __typename: 'PlayerValuableDeposit',
    id: "111",
    valuableType: "deposit",
    title: "100% Deposit Bonus",
    market: "en",
    caveat: "T&Cs apply",
    backgroundImage: "https://cms.casumo.com/wp-content/uploads/2019/04/background-deposit.png",
    expirationTimeInHours: 100,
    expiryDate: 1569794399000,
    valuableState: "Fresh",
    content: "",
    wageringThreshold: null,
    leftToWager: null,
    currency: "EUR",
    magnitude: 20,
    maxBonusValue: 100,
    minDepositValue: 30,
    rule: {
      __typename: 'PlayerValuableRule',
      id: '1',
      name: "duno",
    }
  },
  {
    __typename: "PlayerValuableDeposit",
    id: "432",
    valuableType: "sport",
    title: "€5 Sport Bet",
    market: "en",
    caveat: "T&Cs apply",
    backgroundImage: "https://cms.casumo.com/wp-content/uploads/2019/04/background-sport.png",
    expirationTimeInHours: 100,
    expiryDate: 1569794399000,
    valuableState: "Fresh",
    content: "",
    wageringThreshold: null,
    leftToWager: null,
    currency: "EUR",
    magnitude: 20,
    maxBonusValue: 100,
    minDepositValue: 30,
    rule: {
      __typename: 'PlayerValuableRule',
      id: '1',
      name: "duno",
    }
  },
  {
    __typename: "PlayerValuableSpins",
    id: "654",
    valuableType: "spins",
    title: "20 Free Spins",
    magnitude: 20,
    coinValue: 30,
    requirementType: "deposit",
    game: {
      __typename: "Game",
      title: "Starburst",
      name: "Starburst",
      slug: "starburst",
      logo: "",
      backgroundImage: "",
      logoBackground: "",
      disabledForLoggedOut: false,
      isInMaintenance: false,
      hasPlayForFun: false,
      inMaintenanceMode: false,
    },
    description: "Starburst",
    caveat: "T&Cs apply",
    backgroundImage: "https://cms.casumo.com/wp-content/uploads/2018/09/cc-small-starburst.png",
    market: "en",
    expirationTimeInHours: 100,
    expiryDate: 1569794399000,
    valuableState: "Fresh",
    content: "",
    currency: "EUR",
    leftToWager: 0,
    wageringThreshold: 0,
    rule: {
      __typename: 'PlayerValuableRule',
      id: '1',
      name: 'rule1',
    },
  },
]