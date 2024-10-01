import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser aria-label="user"/>
        </ButtonIcon>
      </li>
      <li>
        <div aria-label="layoutMode">
        <DarkModeToggle />
        </div>
      </li>
      <li>
        <div aria-label="Log_out">
        <Logout />
        </div>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
