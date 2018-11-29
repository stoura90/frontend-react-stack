// @flow
import React, { PureComponent } from "react";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  src: string,
  mark: string,
  height?: number,
  width?: number,
  alt?: string | void,
};

class GameThumb extends PureComponent<Props> {
  render() {
    const { src, mark, width = 56, height = 56, alt = null } = this.props;

    if (!src) {
      return (
        <img
          alt=""
          width="56"
          height="56"
          // passing down an empty gif awaiting the images to get fetched
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        />
      );
    }

    return (
      <ImageLazy
        className="u-display--block t-border-r--16"
        width={width}
        height={height}
        src={src}
        mark={mark}
        alt={alt}
        dpr={3}
        imgixOpts={{
          w: width,
          h: height,
          fit: "crop",
          crop: "top,left",
          markscale: 100,
        }}
      />
    );
  }
}

export default GameThumb;
