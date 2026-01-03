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

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

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
