/// <reference types="react" />
import { LoginModalProps } from "@cd/shared-ui";
import { ModalStateProps } from "./redux";
declare const ModalContainer: (props: ModalStateProps & LoginModalProps) => JSX.Element;
export { ModalContainer };
