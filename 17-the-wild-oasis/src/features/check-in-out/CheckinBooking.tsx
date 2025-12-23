import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import ErrorMessage from "../../ui/ErrorMessage";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [paidConfirm, setPaidConfirm] = useState<boolean>(false);
  // for addbreakfast i will not render it unless user actually doesn't have breakfast (so false it is consistance)
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);
  const { checkin, isCheckingIn } = useCheckin();
  const { booking, isError, isPending, isFetching, error } = useBooking();
  const {
    isPending: isLoadingSettings,
    error: isSettingError,
    settings,
  } = useSettings();
  const isPaid = booking?.isPaid;

  useEffect(() => setPaidConfirm(isPaid === true), [isPaid]);

  if (isPending || isFetching || isLoadingSettings) return <Spinner />;
  if (isError || isSettingError)
    return <ErrorMessage message={"Can't get checkin user data"} />;

  const {
    id: bookingId,
    totalPrice,
    status,
    guests,
    hasBreakfast,
    numGuests,
    numNights,
  } = booking!;

  const breakfastPrice = settings!.breakfastPrice;

  const optionalBreakFastPrice = numGuests * numNights * breakfastPrice;

  function handleCheckin() {
    if (!paidConfirm) return;
    if (addBreakfast) {
      checkin({
        id: booking!.id,
        breakfast: {
          totalPrice: totalPrice + optionalBreakFastPrice,
          extrasPrice: optionalBreakFastPrice,
          hasBreakfast: true,
        },
      });
    } else checkin({ id: booking!.id });
  }
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking!} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id={"breakfase"}
            onChange={() => {
              setAddBreakfast((a) => !a);
              setPaidConfirm(false);
            }}
          >
            want to add breakfast for {formatCurrency(optionalBreakFastPrice)} ?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={paidConfirm}
          disabled={paidConfirm}
          id={`${bookingId}`}
          onChange={() => setPaidConfirm((c) => !c)}
        >
          I confirm that {guests?.fullName} has paid the total amount of{" "}
          {hasBreakfast || addBreakfast
            ? `${formatCurrency(totalPrice + optionalBreakFastPrice)} (
          ${formatCurrency(totalPrice)}+${formatCurrency(
                optionalBreakFastPrice
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            onClick={handleCheckin}
            disabled={!paidConfirm || isCheckingIn}
          >
            Check in booking #{bookingId}
          </Button>
        )}
        <Button $variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
