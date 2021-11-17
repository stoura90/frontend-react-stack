import * as React from "react";
import classNames from "classnames";
import ReactModal from "react-modal";
import { CloseButton as CloseBtn } from "./CloseButton";
import "./AbstractModal.scss";

type OwnProps = {
  children: React.ReactChild;
  CloseButton: React.ComponentType<{ onClick: () => void }>;
  hideModal: () => void;
  isOpen: boolean;
  className?: string;
  hideDefaultCloseButton?: boolean;
};

type Props = OwnProps & ReactModal.Props;

export class AbstractModal extends React.PureComponent<Props> {
  static defaultProps = {
    CloseButton: CloseBtn,
    hideDefaultCloseButton: false,
  };

  render() {
    const {
      children,
      CloseButton,
      hideModal,
      isOpen,
      className,
      overlayClassName,
      hideDefaultCloseButton,
      ...rest
    } = this.props;

    return (
      <>
        <ReactModal
          isOpen={isOpen}
          onRequestClose={hideModal}
          className={classNames(
            " bg-white o-position--relative",
            className
              ? className
              : "c-abstract-modal--default u-height--full u-width--full"
          )}
          overlayClassName={classNames(
            "c-abstract-modal__overlay",
            overlayClassName
          )}
          {...rest}
        >
          <div className="u-height--full u-overflow--auto u-scrollbar-regular u-overflow-scrolling--touch">
            {children}
          </div>
          <div className="c-abstract-modal__close u-padding o-position--absolute cursor-pointer">
            {hideDefaultCloseButton ? null : (
              <CloseButton data-test="modal-close-button" onClick={hideModal} />
            )}
          </div>
        </ReactModal>
      </>
    );
  }
}
