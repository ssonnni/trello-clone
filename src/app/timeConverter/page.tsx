"use client";

import { hourSelector, minuteState, secondSelector } from "@/lib/store/atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

type TInputEvent = React.FormEvent<HTMLInputElement>;

export default function Home() {
  const [minute, setMinute] = useRecoilState(minuteState);
  const [hour, setHour] = useRecoilState(hourSelector);
  const [second, setSecond] = useRecoilState(secondSelector);
  const onMinuteChange = (e: TInputEvent) => {
    setMinute(+e.currentTarget.value);
  };
  const onHourChange = (e: TInputEvent) => {
    setHour(+e.currentTarget.value);
  };
  const onSecondChange = (e: TInputEvent) => {
    setSecond(+e.currentTarget.value);
  };

  return (
    <>
      <SectionLayout>
        <div>TIME CONVERTER</div>
        <div>
          <div>HOUR</div>
          <InputLayout
            className="hour"
            type="text"
            value={hour}
            onChange={onHourChange}
          />
          <div>MINUTE</div>
          <InputLayout
            className="minute"
            type="text"
            value={minute}
            onChange={onMinuteChange}
          />
          <div>SECOND</div>
          <InputLayout
            className="second"
            type="text"
            value={second}
            onChange={onSecondChange}
          />
        </div>
      </SectionLayout>
    </>
  );
}

const SectionLayout = styled.section`
  margin: 0 auto;
  width: 100%;
  padding: 100px 10px;
  display: flex;
  gap: 30px;
  justify-content: center;

  font-size: 30px;

  font-weight: 800;
`;

const InputLayout = styled.input`
  margin-top: 5px;
  margin-bottom: 50px;
  border: none;
  font-size: 30px;
  font-weight: 300;
  &:focus {
    outline: none;
    border-bottom: 1px solid #777;
  }
`;
