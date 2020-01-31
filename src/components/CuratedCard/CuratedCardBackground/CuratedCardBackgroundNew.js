// @flow
import React from "react";
import ImageLazy from "Components/Image/ImageLazy";
import { addImageSourceToOptions } from "./CuratedCardBackground.utils";

type PropsNew = {
  onClick: ?Function,
  link: ?string,
  image: string,
};

export const CuratedCardBackgroundNew = ({
  image,
  onClick,
  link,
}: PropsNew) => {
  const images = addImageSourceToOptions(image);

  return (
    <a
      className="o-ratio__content u-cursor-pointer"
      href={link}
      onClick={onClick}
    >
      <ImageLazy
        className="o-ratio__content u-object-fit-cover"
        images={images}
      />
    </a>
  );
};
