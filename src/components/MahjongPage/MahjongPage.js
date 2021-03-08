import React from "react";
import { WaitForHostElement } from "Components/WaitForHostElement";
import Portal from "Components/Portal";
import { ComponentBuilder } from "Components/ComponentBuilder";

export const MahjongPage = () => (
  <WaitForHostElement hostElementId="react-host-mahjong">
    <Portal hostElementId="react-host-mahjong">
      <div className="u-padding-top--3xlg@desktop">
        <ComponentBuilder slug="built-pages.mahjong" />
      </div>
    </Portal>
  </WaitForHostElement>
);
