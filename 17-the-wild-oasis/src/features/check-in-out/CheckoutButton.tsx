import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";
import SpinnerDots from "../../ui/SpinnerMiniDots";
import styled from "styled-components";

const Container = styled.div`
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      $variations="primary"
      $size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      {isCheckingOut ? (
        <Container>
          <SpinnerDots />
        </Container>
      ) : (
        "check out"
      )}
    </Button>
  );
}

export default CheckoutButton;
