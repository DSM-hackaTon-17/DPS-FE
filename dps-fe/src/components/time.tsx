import styled from "@emotion/styled";
import { useEffect, useState } from "react";

function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours() % 12).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const half = now.getHours() >= 12 ? "오전" : "오후";

  return `${year}-${month}-${day} ${half} ${hour}:${minute}`;
}

export default function Time() {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return <Container>{time}</Container>;
}

const Container = styled.div`
  font-weight: bold;
  font-size: 48px;
`;
