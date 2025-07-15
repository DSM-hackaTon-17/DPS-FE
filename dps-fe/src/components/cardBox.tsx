import styled from "@emotion/styled";
import type { SVGProps } from "react";

export interface Props {
  Icon: React.FC<SVGProps<SVGSVGElement>>; // ← SVG 컴포넌트를 받는 prop
  title: string;
  sub1: string;
  sub2: string;
  con1: string;
  con2: string;
}

export default function CardBox({
  Icon,
  title,
  sub1,
  sub2,
  con1,
  con2,
}: Props) {
  return (
    <Container>
      <TitleBox>
        <Icon />
        <Title>{title}</Title>
      </TitleBox>
      <Box>
        <SubBox>
          <Sub1>{sub1}</Sub1>
          <Sub2>{sub2}</Sub2>
        </SubBox>
        <SubBox2>
          {con1}
          <Box2>{con2}</Box2>
        </SubBox2>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  width: 342px;
  height: 212px;
  display: flex;
  gap: 36px;
  flex-direction: column;
  outline: 1px solid #e5e7eb;
  padding: 30px;
  border-radius: 15px;
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  line-height: 0;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 24px;
`;
const Sub1 = styled.p`
  font-weight: 600;
  font-size: 20px;
  color: #969595;
`;
const Sub2 = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: #969595;
`;

const SubBox = styled.div`
  display: flex;
  gap: 36px;
  flex-direction: column;
`;
const SubBox2 = styled.div`
  display: flex;
  gap: 22px;
  flex-direction: column;
  align-items: flex-end;
  color: #16a34a;
  font-size: 36px;
  font-weight: bold;
`;

const Box2 = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 20px;
  color: #2565eb;
`;
