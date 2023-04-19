import React, { useEffect, useState } from "react";
import { useCountDown } from "../../hooks/useCountDown";
import { Button, Progress } from "antd";
import { Link } from "react-router-dom";

export const CountDownTimer = (props) => {
  const [dateToStart, setDateToStart] = useState();
  const seconds = useCountDown(dateToStart + 120 * 1000);

  useEffect(() => {
    setDateToStart(Date.now());
  }, []);

  useEffect(() => {
    if (seconds === -1) {
      props.setIsExpired();
    }
  }, [seconds]);

  return (
    <>
      {seconds > 0 && (
        <Progress
          showInfo={true}
          percent={Math.max(0, seconds * (100 / 120))}
          format={() => `${seconds}`}
          strokeColor="#6485c1"
        />
      )}
      {seconds <= 0 && (
        <Button block style={{ marginBottom: "10px" }} size="large">
          Time Expired, Login Again
        </Button>
      )}
    </>
  );
};
