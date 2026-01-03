import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import ErrorMessage from "../../ui/ErrorMessage";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    isPendingRecentBookings,
    recentBookings,
    isError: isError1,
    error: error1,
    numDays,
  } = useRecentBookings();

  const {
    isPendingRecentStays,
    recentStays,
    isError: isError2,
    error: error2,
  } = useRecentStays();

  // i will useCabins here so that to use it if i need it in other componet (otherwise move it to stats)
  const {
    cabins,
    isPending: isPendingCabins,
    isError: isError3,
    error: error3,
  } = useCabins();

  if (isPendingRecentBookings || isPendingRecentStays || isPendingCabins)
    return <Spinner />;
  if (isError1 || isError2 || isError3)
    return (
      <ErrorMessage
        message={error1?.message || error2?.message || error3?.message}
      />
    );

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings!}
        stays={recentStays!}
        numDays={numDays}
        cabinsNum={cabins!.length}
      />
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <SalesChart bookings={recentBookings!} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
