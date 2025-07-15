import styled from "@emotion/styled";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export interface graphProps {
  time: string;
  value: number;
}

interface restProps {
  yStart: number;
  yEnd: number;
}

export default function Graph(props: { data: number[]; Y: restProps }) {
  const timeLabels = ["20초 전", "15초 전", "10초 전", "5초 전", "0초"];

  function toChartData(values: number[]): graphProps[] {
    const padded = [...values];
    while (padded.length < 5) padded.unshift(0);

    return padded.slice(-5).map(
      (value, i): graphProps => ({
        time: timeLabels[i],
        value,
      })
    );
  }

  const chartData = toChartData(props.data.slice(-5));

  return (
    <Container>
      <LineChart width={650} height={350} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tickMargin={15} />
        <YAxis
          domain={[props.Y.yStart, props.Y.yEnd]}
          tickCount={5}
          tickMargin={15}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          isAnimationActive={false}
        />
      </LineChart>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 698px;
  height: 382px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: 1px solid #e5e7eb;
`;
