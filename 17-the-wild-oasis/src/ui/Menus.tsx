import {
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  width: 32px;
  right: 0;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  /* position: absolute; */
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  top: 6px;
  right: -11px;
  /* left: 0; */
  z-index: 1000;
`;
// right: ${(props) => props?.position?.right}px;
// top: ${(props) => props?.position?.top}px;
//
//

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenusContextType = {
  openId: number | null;
  closeMenu: () => void;
  openMenu: (id: number | null) => void;
};
const MenusContext = createContext<MenusContextType>({
  openId: null,
  closeMenu: () => {},
  openMenu: () => {},
});
// * only one menu is opened at a time
function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<number | null>(null);

  const closeMenu = () => setOpenId(null);
  const openMenu = setOpenId;
  return (
    <MenusContext value={{ openId, closeMenu, openMenu }}>
      {children}
    </MenusContext>
  );
}

function Toggle({ icon, id }: { icon: ReactElement; id: number }) {
  const { closeMenu, openMenu, openId } = useContext(MenusContext);

  // function setListRenderPosition(e) {
  //   const btn: HTMLElement = e.target.closest("button");
  //   const { right, top, width, height } = btn.getClientRects()[0];
  //   const listTop = top + height + 5;
  //   const listRight = window.innerWidth - right;
  //   setListPosition({ right: listRight, top: listTop });
  // }
  function handleToggleMenu(e: React.MouseEvent) {
    e.stopPropagation();
    if (openId === id) closeMenu();
    else openMenu(id);
  }
  return <StyledToggle onClick={handleToggleMenu}>{icon}</StyledToggle>;
}

function List({ children, id }: { children: ReactNode; id: number }) {
  const { openId, closeMenu } = useContext(MenusContext);
  const { ref } = useOutsideClick<HTMLUListElement>(closeMenu, false);
  // console.log(listPosition);
  if (openId !== id) return null;

  return <StyledList ref={ref}>{children}</StyledList>;
}

function Button({
  children,
  icon,
  onClick,
}: {
  children: ReactNode;
  icon: ReactElement;
  onClick?: () => void;
}) {
  const { closeMenu } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    closeMenu();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
