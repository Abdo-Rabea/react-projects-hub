import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../contexts/DarkModeContext";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

function DarkModeToggle() {
  const { isDarkMode, onToggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={onToggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
