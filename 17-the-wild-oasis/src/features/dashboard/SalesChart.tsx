import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import Booking from "../../pages/Booking";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalSales: 480, extrasSales: 20 },
  { label: "Jan 10", totalSales: 580, extrasSales: 100 },
  { label: "Jan 11", totalSales: 550, extrasSales: 150 },
  { label: "Jan 12", totalSales: 600, extrasSales: 50 },
  { label: "Jan 13", totalSales: 700, extrasSales: 150 },
  { label: "Jan 14", totalSales: 800, extrasSales: 150 },
  { label: "Jan 15", totalSales: 700, extrasSales: 200 },
  { label: "Jan 16", totalSales: 650, extrasSales: 200 },
  { label: "Jan 17", totalSales: 600, extrasSales: 300 },
  { label: "Jan 18", totalSales: 550, extrasSales: 100 },
  { label: "Jan 19", totalSales: 700, extrasSales: 100 },
  { label: "Jan 20", totalSales: 800, extrasSales: 200 },
  { label: "Jan 21", totalSales: 700, extrasSales: 100 },
  { label: "Jan 22", totalSales: 810, extrasSales: 50 },
  { label: "Jan 23", totalSales: 950, extrasSales: 250 },
  { label: "Jan 24", totalSales: 970, extrasSales: 100 },
  { label: "Jan 25", totalSales: 900, extrasSales: 200 },
  { label: "Jan 26", totalSales: 950, extrasSales: 300 },
  { label: "Jan 27", totalSales: 850, extrasSales: 200 },
  { label: "Jan 28", totalSales: 900, extrasSales: 100 },
  { label: "Jan 29", totalSales: 800, extrasSales: 300 },
  { label: "Jan 30", totalSales: 950, extrasSales: 200 },
  { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
  { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
  { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
  { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
  { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
  { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
  { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
];

interface BOOKINGS {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
}
function SalesChart({
  bookings,
  numDays,
}: {
  bookings: BOOKINGS[];
  numDays: number;
}) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  // sales for each day calculation
  // compolexity: O(n^2) -> could be: O(n) using hash map
  const days = eachDayOfInterval({
    start: new Date(subDays(new Date(), numDays - 1)),
    end: new Date(),
  });
  const data = days.map((day) => {
    const filterdBookings = bookings.filter((booking) =>
      isSameDay(booking.created_at, day)
    );
    const totalSales = filterdBookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );
    const extrasSales = filterdBookings.reduce(
      (acc, booking) => acc + booking.extrasPrice,
      0
    );
    return { label: format(day, "MMM dd"), totalSales, extrasSales };
  });
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(days[0], "MMM dd yyyy")} &mdash;{" "}
        {format(days.at(-1)!, "MMM dd yyyy")}
      </Heading>
      <AreaChart
        style={{
          width: "100%",
          height: "300px",
        }}
        responsive
        data={data}
      >
        <CartesianGrid strokeDasharray="4" />
        <XAxis
          dataKey="label"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />
        <YAxis
          width="auto"
          unit="$"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />
        <Tooltip
          contentStyle={{ background: colors.background }}
          itemSorter={() => -1}
        />
        <Area
          type="monotone"
          dataKey="totalSales"
          stroke={colors.totalSales.stroke}
          strokeWidth="2"
          fill={colors.totalSales.fill}
          unit="$"
          name="Total sales"
        />
        <Area
          type="monotone"
          dataKey="extrasSales"
          stroke={colors.extrasSales.stroke}
          strokeWidth="2"
          fill={colors.extrasSales.fill}
          unit="$"
          name="Extras sales"
        />
      </AreaChart>
    </StyledSalesChart>
  );
}

export default SalesChart;
