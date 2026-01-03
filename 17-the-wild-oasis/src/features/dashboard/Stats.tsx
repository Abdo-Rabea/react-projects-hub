// it is very special case here so keep adding feilds data types as required

import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

interface BOOKINGS {
  totalPrice: number;
}
interface STAYS {
  numNights: number;
}

function Stats({
  bookings,
  stays,
  numDays,
  cabinsNum,
}: {
  bookings: BOOKINGS[];
  stays: STAYS[];
  numDays: number;
  cabinsNum: number;
}) {
  const numBookings = bookings.length;

  // 2. calc. sales
  const sales = bookings.reduce((acc, stay) => acc + stay.totalPrice, 0);

  // 3. check ins: the number of all guests that really comes to our hotel -> stays.length
  const checkedInGuestsNum = stays.length;

  // 4. occupancy rate : occupied numNights of guests / total available nights (numDays * num of cabins)
  const occupiedNights = stays.reduce((acc, stay) => acc + stay.numNights, 0);

  const occupancyRate = occupiedNights / (numDays * cabinsNum);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="bookings"
        color="blue"
        value={`${numBookings}`}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="sales"
        color="green"
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="check ins"
        color="indigo"
        value={String(checkedInGuestsNum)}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="occupancy rate"
        color="yellow"
        value={`${Math.round(occupancyRate * 100)}%`}
      />
    </>
  );
}

export default Stats;
