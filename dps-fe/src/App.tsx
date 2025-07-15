import styled from "@emotion/styled";
import Graph from "./components/graph";
import { useEffect, useState } from "react";
import CardBox, { type Props } from "./components/cardBox";
import { ReactComponent as ThermometerIcon } from "./assets/thermometer.svg";
import { ReactComponent as DropletsIcon } from "./assets/droplets.svg";
import { ReactComponent as SunIcon } from "./assets/sun.svg";
import { ReactComponent as WarningIcon } from "./assets/warning.svg";
import Time from "./components/time";
import { getAll, getHumi, getIllu, getOxid, getTemp } from "./apis/getData";

type CardProps = Omit<Props, "con1">;

export interface SensorData {
  id: number;
  deviceId: number;
  illu: number;
  temp: number;
  hum: number;
  oxid: number;
  createdDate: string;
}

function App() {
  const [temp, setTemp] = useState<number[]>([13.5, 14.6, 10.5, 12.7, 13.8]);
  const [humi, setHumi] = useState<number[]>([21.1, 15.2, 31.3, 24.1, 11.0]);
  const [oxid, setOxid] = useState<number[]>([1.1, 1.2, 1.3, 1.1]);
  const [illu, setIllu] = useState<number[]>([
    270.1, 250.2, 300.3, 280.4, 290.1,
  ]);
  const cardDatas: CardProps[] = [
    {
      Icon: SunIcon,
      title: "조도",
      sub1: "현재:",
      sub2: "적정:",
      con2: "380 lux - 780 lux",
    },
    {
      Icon: ThermometerIcon,
      title: "온도",
      sub1: "현재:",
      sub2: "적정:",
      con2: "18°C - 25°C",
    },
    {
      Icon: DropletsIcon,
      title: "습도",
      sub1: "현재:",
      sub2: "적정:",
      con2: "18% - 25%",
    },
    {
      Icon: WarningIcon,
      title: "위험도",
      sub1: "현재:",
      sub2: "상태:",
      con2: "안전",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const illuRes = await getIllu();
      const tempRes = await getTemp();
      const humiRes = await getHumi();
      const oxidRes = await getOxid();
      const allRes = await getAll();

      if (allRes) {
        const formatAll = {
          illu: allRes[0].illu,
          temp: allRes[0].temp,
          hum: allRes[0].humi,
          oxid: allRes[0].oxid,
        };
        setData(Object.values(formatAll));
        console.log(Object.values(formatAll)[2]);
      }

      if (illuRes) setIllu(illuRes.illu);
      if (tempRes) setTemp(tempRes.temp);
      if (humiRes) setHumi(humiRes.humi);
      if (oxidRes) setOxid(oxidRes.oxid);
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const [data, setData] = useState<number[]>([350.5, 25.3, 65.2, 8.1]); //Object.values()로 값 추출
  const units: string[] = [" lux", "°C", "%", "%"];

  return (
    <Container>
      <CardBoxContainer>
        {cardDatas.map((x, i) => (
          <CardBox
            Icon={x.Icon}
            title={x.title}
            sub1={x.sub1}
            sub2={x.sub2}
            con1={`${data[i]}${units[i]}`}
            con2={x.con2}
            key={i}
          />
        ))}
      </CardBoxContainer>
      <RightBox>
        <Time />
        <GraphContainer>
          <Graph data={illu} Y={{ yStart: 0, yEnd: 2000 }}></Graph>
          <Graph data={temp} Y={{ yStart: 0, yEnd: 60 }}></Graph>
          <Graph data={humi} Y={{ yStart: 0, yEnd: 100 }}></Graph>
          <Graph data={oxid} Y={{ yStart: 0, yEnd: 100 }}></Graph>
        </GraphContainer>
      </RightBox>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 60px;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GraphContainer = styled.div`
  display: flex;
  width: 1420px;
  flex-wrap: wrap;
  gap: 24px;
`;

const CardBoxContainer = styled.div`
  gap: 15px;
  display: flex;
  flex-direction: column;
`;
