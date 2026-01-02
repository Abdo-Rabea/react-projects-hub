import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import ErrorMessage from "../../ui/ErrorMessage";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

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
  } = useRecentBookings();

  const {
    isPendingRecentStays,
    recentStays,
    isError: isError2,
    error: error2,
  } = useRecentStays();
  if (isPendingRecentBookings || isPendingRecentStays) return <Spinner />;
  if (isError1 || isError2)
    return <ErrorMessage message={error1?.message || error2?.message} />;

  console.log(recentBookings, recentStays);
  return (
    <StyledDashboardLayout>
      <div>statistics</div>
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
