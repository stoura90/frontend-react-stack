import React from "react";
import { shallow } from "enzyme";
import mockTranslations from "Models/valuables/__mocks__/valuableDetailsTranslations.mock";
import { VALUABLE_STATES } from "Models/valuables";
import { getDateTimeDifferenceFromNow } from "Utils";
import { ValuableDetails, expirationBadgeClasses } from "./ValuableDetails";
import mockValuables from "./__mocks__/Valuables.json";
import OpenPadlock from "./open-padlock.svg";
jest.mock("Utils", () => ({
    ...jest.requireActual("../../utils/utils"),
    getDateTimeDifferenceFromNow: jest.fn(),
}));
describe("ValuableDetails", () => {
    let rendered;
    let mockValuable = mockValuables[0];
    const Foo = () => <div>baz</div>;
    let onConsume;
    beforeEach(() => {
        onConsume = jest.fn().mockResolvedValue(true);
        (getDateTimeDifferenceFromNow as any).mockReturnValue({ hours: 30 });
        jest.resetModules();
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        rendered = shallow(<ValuableDetails valuableDetails={mockValuable} translations={mockTranslations} onConsumeValuable={onConsume}>
        <Foo />
      </ValuableDetails>);
    });
    test("should render a given component with it's props in the header", () => {
        const foo = rendered.find(Foo);
        expect(foo).toHaveLength(1);
    });
    test("should render red expiration badge if hours to expire is > 24", () => {
        expect(rendered.find("[data-test='valuable-expiration-badge']").prop("bgColor")).toBe(expirationBadgeClasses.default);
    });
    test("should not render wagering progress bar if no wagering details are provided", () => {
        expect(rendered.find({ "data-test": "valuable-details-wagering-progress-bar" })).toHaveLength(0);
    });
    test("should render wagering progress bar if wagering details are provided", () => {
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        rendered = shallow(<ValuableDetails valuableDetails={{
            ...mockValuable,
            leftToWager: 90,
            wageringThreshold: 100,
        }} translations={mockTranslations}/>);
        expect(rendered.find({ "data-test": "valuable-details-wagering-progress-bar" })).toHaveLength(1);
    });
    test("should render red expiration badge if hours to expire is < 24", () => {
        const expirationHours = 5;
        const expiryDate = addHoursToNow(expirationHours);
        (getDateTimeDifferenceFromNow as any).mockReturnValue({ hours: 5 });
        rendered = shallow(<ValuableDetails valuableDetails={{
            ...mockValuable,
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            expiryDate,
        }} translations={mockTranslations}>
        <Foo />
      </ValuableDetails>);
        expect(rendered
            .find({ "data-test": "valuable-expiration-badge" })
            .prop("bgColor")).toBe(expirationBadgeClasses.expiresToday);
    });
    test("should display the expiration in hours if expiration is < 24 hours", () => {
        const expirationHours = 5;
        const expiryDate = addHoursToNow(expirationHours);
        (getDateTimeDifferenceFromNow as any).mockReturnValue({ hours: 5 });
        rendered = shallow(<ValuableDetails valuableDetails={{
            ...mockValuable,
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            expiryDate,
        }} translations={mockTranslations}>
        <Foo />
      </ValuableDetails>);
        const expectedExpirationText = `${mockTranslations.expirationTimeLabel} ${expirationHours} Hours`;
        expect(rendered
            .find({ "data-test": "valuable-expiration-badge" })
            .dive()
            .find("span")
            .text()).toEqual(expectedExpirationText);
    });
    test("should display the expiration in days if expiration is >= 24 hours", () => {
        const days = 5;
        const expiryDate = addDaysToNow(days);
        const expectedExpirationText = `${mockTranslations.expirationTimeLabel} ${days} Days`;
        (getDateTimeDifferenceFromNow as any).mockReturnValue({ hours: 5 * 24 });
        jest.mock("Utils", () => ({
            getDateTimeDifferenceFromNow: jest
                .fn()
                .mockReturnValue({ hours: 24 * 5 }),
        }));
        rendered = shallow(<ValuableDetails valuableDetails={{
            ...mockValuable,
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            expiryDate,
        }} translations={mockTranslations}>
        <Foo />
      </ValuableDetails>);
        expect(rendered
            .find({ "data-test": "valuable-expiration-badge" })
            .dive()
            .find("span")
            .text()).toEqual(expectedExpirationText);
    });
    test("should display open padlock icon when valuable is LOCKED", () => {
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        rendered = shallow(<ValuableDetails valuableDetails={{
            ...mockValuable,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'LOCKED' does not exist on type '{}'.
            valuableState: VALUABLE_STATES.LOCKED,
        }} translations={mockTranslations}>
        <Foo />
      </ValuableDetails>);
        expect(rendered
            .find({ "data-test": "expiration-badge-content" })
            .dive()
            .find(OpenPadlock)).toHaveLength(1);
    });
    test("should not display open padlock icon if valuable is NOT LOCKED", () => {
        expect(rendered
            .find({ "data-test": "expiration-badge-content" })
            .dive()
            .find(OpenPadlock)).toHaveLength(0);
    });
    test("should call the onConsume and onlaunch if type is spins and unlocked", async () => {
        mockValuable = mockValuables[2];
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        rendered = shallow(<ValuableDetails valuableDetails={mockValuable} translations={mockTranslations} onConsumeValuable={onConsume}>
        <Foo />
      </ValuableDetails>);
        const actionButton = rendered.find({
            "data-test": "valuable-action-button",
        });
        actionButton.simulate("click");
        await expect(onConsume).toHaveBeenCalledTimes(1);
    });
    test("should only call on consume if type is cash", () => {
        mockValuable = mockValuables[0];
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        rendered = shallow(<ValuableDetails valuableDetails={mockValuable} translations={mockTranslations} onConsumeValuable={onConsume}>
        <Foo />
      </ValuableDetails>);
        const actionButton = rendered.find({
            "data-test": "valuable-action-button",
        });
        actionButton.simulate("click");
        expect(onConsume).toHaveBeenCalledTimes(1);
    });
});
const addDaysToNow = days => {
    const result = new Date(Date.now());
    return result.setDate(result.getDate() + days);
};
const addHoursToNow = hours => {
    const result = new Date(Date.now());
    return result.setHours(result.getHours() + hours);
};
