import React from "react";
import { mount } from "enzyme";
import { getImgixUrl } from "@casumo/cudl-react-utils";
import ImageAdaptive from "Components/Image/ImageAdaptive";
import curatedData from "Models/curated/__mocks__/curated.json";
import { LOW_RES_IMAGE_SETTINGS } from "../../constants";

describe("ImageAdaptive", () => {
  const images = curatedData;

  describe("isIntersecting true", () => {
    test("should render Picture component", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={true} images={images} />
      );
      expect(component.find("Picture").exists()).toBe(true);
    });

    test("should render imgix src for small_image", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={true} images={images} />
      );
      const img = getImgixUrl(curatedData.small_image, null, { w: 1.0 });
      const expected = component
        .find("img")
        .at(1)
        .prop("src");
      expect(img).toEqual(expected);
    });

    test("should render imgix <source> srcSet for small_image", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={true} images={images} />
      );
      const srcSet = component
        .find("source")
        .at(0)
        .prop("srcSet");
      const expected =
        "https://images.casumo.com/2018/09/cc-small-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=1 1x, https://images.casumo.com/2018/09/cc-small-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=2 2x, https://images.casumo.com/2018/09/cc-small-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=3 3x";
      expect(srcSet).toEqual(expected);
    });

    test("should render imgix <source> srcSet for medium_image", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={true} images={images} />
      );
      const srcSet = component
        .find("source")
        .at(1)
        .prop("srcSet");
      const expected =
        "https://images.casumo.com/2018/09/cc-medium-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=1 1x, https://images.casumo.com/2018/09/cc-medium-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=2 2x, https://images.casumo.com/2018/09/cc-medium-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=3 3x";
      expect(srcSet).toEqual(expected);
    });

    test("should render imgix <source> srcSet for large_image", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={true} images={images} />
      );
      const srcSet = component
        .find("source")
        .at(2)
        .prop("srcSet");
      const expected =
        "https://images.casumo.com/2018/09/cc-large-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=1 1x, https://images.casumo.com/2018/09/cc-large-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=2 2x, https://images.casumo.com/2018/09/cc-large-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=3 3x";
      expect(srcSet).toEqual(expected);
    });
  });

  describe("isIntersecting false", () => {
    test("should render ResponsiveImage component", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={false} images={images} />
      );
      expect(component.find("ResponsiveImage").exists()).toBe(true);
    });

    test("should render imgix src for small_image", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={false} images={images} />
      );
      const { imgixOpts } = LOW_RES_IMAGE_SETTINGS;
      const img = getImgixUrl(curatedData.small_image, null, imgixOpts);
      const expected = component.find("img").prop("src");
      expect(img).toEqual(expected);
    });
  });
});
