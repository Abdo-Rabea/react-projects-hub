import { Navigate } from "react-router-dom";
import { useUser } from "./useUser";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100dvh;
  width: 100dvw;
  background: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isPending, isAuth } = useUser();
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  return user && isAuth ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
