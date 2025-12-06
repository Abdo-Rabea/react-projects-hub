import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
// 1. create the context
const ModalContext = createContext<{
  open: (_name: string) => void;
  close: () => void;
  openWindowName: string;
}>({
  open: () => {},
  close: () => {},
  openWindowName: "",
});

function Modal({ children }: { children: ReactNode }) {
  const [openWindowName, setOpenWindowName] = useState<string>("");
  const open = setOpenWindowName;
  function close() {
    setOpenWindowName("");
  }
  return (
    <ModalContext value={{ openWindowName, open, close }}>
      {children}
    </ModalContext>
  );
}

type AnyProps = Record<string, unknown>;

function Open({
  children,
  opens: windowName,
}: {
  children: React.ReactElement<AnyProps>;
  opens: string;
}) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(windowName) });
}

function Window({
  children,
  name: windowName,
}: {
  children: React.ReactElement<AnyProps>;
  name: string;
}) {
  const { openWindowName, close } = useContext(ModalContext);

  if (openWindowName !== windowName) return null;
  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
