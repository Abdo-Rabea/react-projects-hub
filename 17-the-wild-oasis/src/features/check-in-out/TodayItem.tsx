import styled from "styled-components";
import type { BookingWithRelations } from "../../types/Booking";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
  /* overflow-y: auto; */
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }: { activity: BookingWithRelations }) {
  const { status, numNights, guests, id } = activity;
  const isArriving: boolean = status === "unconfirmed";
  return (
    <StyledTodayItem>
      <Tag $type={isArriving ? "green" : "blue"}>
        {isArriving ? "Arriving" : "Departing"}
      </Tag>
      <Flag src={guests?.countryFlag} alt="flag" />
      <Guest>{guests?.fullName}</Guest>
      <div>{numNights} Nights</div>
      {isArriving ? (
        <Button
          $size="small"
          $variations="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      ) : (
        <CheckoutButton bookingId={id} />
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
