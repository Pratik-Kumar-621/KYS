import { Button, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import Graph from "../Components/Graph";
import { useRef } from "react";
import moment from "moment";
import Summary from "../Components/Summary";

const Dashboard = () => {
  // States
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [personName, setPersonName] = useState("getNSE");
  const [startDate, setStartDate] = useState(new Date("2018-01-15"));
  const [endDate, setEndDate] = useState(new Date("2023-01-13"));
  const [data, setData] = useState(null);

  const stockName = `${personName === "getNSE" ? "Nifty 50" : ""}${
    personName === "getBSE" ? "Bombay Stock Exchange" : ""
  }${personName === "ASHOKLEY" ? "Ashok Leyland Ltd" : ""}${
    personName === "CIPLA" ? "Cipla Ltd" : ""
  }${personName === "EICHERMOT" ? "Eicher Motors Ltd" : ""}${
    personName === "RELIANCE" ? "Reliance Industries Ltd" : ""
  }${personName === "TATASTEEL" ? "Tata Steel Limited" : ""}`;

  // Apis Cache
  const cache = useRef({});

  // State Changings
  const handleChange = (e) => {
    setPersonName(e.target.value);
  };
  const HandleOneMonth = () => {
    const newEnd = moment(endDate).subtract(1, "M").format("YYYY-MM-DD");
    setStartDate(new Date(newEnd));
  };
  const HandleSixMonth = () => {
    const newEnd = moment(endDate).subtract(6, "M").format("YYYY-MM-DD");
    setStartDate(new Date(newEnd));
  };
  const HandleOneYear = () => {
    const newEnd = moment(endDate).subtract(12, "M").format("YYYY-MM-DD");
    setStartDate(new Date(newEnd));
  };
  const Reset = () => {
    setStartDate(new Date("2018-01-15"));
  };
  const Handle18Month = () => {
    const newEnd = moment(endDate).subtract(18, "M").format("YYYY-MM-DD");
    setStartDate(new Date(newEnd));
  };

  // Apis Content

  const baseUrl = `http://localhost:3001/${
    personName === "getNSE" || personName === "getBSE"
      ? personName
      : "getCompany"
  }`;
  const compName = `${
    personName === "getNSE" || personName === "getBSE" ? "" : personName
  }`;

  // Api call
  const [weekData, setWeekData] = useState(null);
  React.useEffect(() => {
    axios
      .post(baseUrl, {
        data: {
          startDate: new Date(
            moment(endDate).subtract(12, "M").format("YYYY-MM-DD")
          ),
          endDate: endDate,
          companyName: compName,
        },
      })
      .then((response) => {
        setWeekData(response.data);
      });
  }, [personName]);
  console.log(weekData);
  const closeWeek = weekData?.map((item) => parseFloat(item.Close));
  // console.log(close);
  const WeekHigh = closeWeek?.reduce((a, b) => Math.max(a, b));
  const WeekLow = closeWeek?.reduce((a, b) => Math.min(a, b));
  React.useEffect(() => {
    if (
      cache.current[`${personName}_${startDate.getTime()}_${endDate.getTime()}`]
    ) {
      setData(
        cache.current[
          `${personName}_${startDate.getTime()}_${endDate.getTime()}`
        ]
      );
    } else {
      setData();
      axios
        .post(baseUrl, {
          data: {
            startDate: startDate,
            endDate: endDate,
            companyName: compName,
          },
        })
        .then((response) => {
          cache.current = {
            ...(cache.current ?? {}),
            [`${personName}_${startDate.getTime()}_${endDate.getTime()}`]:
              response.data,
          };
          setData(response.data);
        });
    }
  }, [personName, startDate, endDate]);
  console.log(data);
  console.log(data && data[data?.length]);

  return (
    <div className="dashboard full_screen">
      <Nav />
      <div className="dashboard_body">
        <Select
          value={personName}
          onChange={handleChange}
          className="select_str"
        >
          <MenuItem className="menu_str" value="getNSE">
            <div>NSE</div>
          </MenuItem>
          <MenuItem className="menu_str" value="getBSE">
            <div>BSE</div>
          </MenuItem>
          <MenuItem className="menu_str" value="ASHOKLEY">
            <div>ASHOKLEY</div>
          </MenuItem>
          <MenuItem className="menu_str" value="CIPLA">
            <div>CIPLA</div>
          </MenuItem>
          <MenuItem className="menu_str" value="EICHERMOT">
            <div>EICHERMOT</div>
          </MenuItem>
          <MenuItem className="menu_str" value="RELIANCE">
            <div>RELIANCE</div>
          </MenuItem>
          <MenuItem className="menu_str" value="TATASTEEL">
            <div>TATASTEEL</div>
          </MenuItem>
        </Select>
        {data && (
          <Summary
            name={`${stockName} (${
              personName === "getNSE" || personName === "getBSE"
                ? `${personName[3]}${personName[4]}${personName[5]}`
                : personName
            })`}
            date={`${new Date(data[data?.length - 1].Date).getDate()}  ${
              monthNames[new Date(data[data?.length - 1].Date).getMonth()]
            } ${new Date(data[data?.length - 1].Date).getFullYear()}`}
            price={data[data?.length - 1].Close}
            open={data[data?.length - 1].Open}
            previousClose={data[data?.length - 2].Close}
            dayClose={data[data?.length - 1].Close}
            dayLow={data[data?.length - 1].Low}
            dayHigh={data[data?.length - 1].High}
            yearLow={WeekLow}
            yearHigh={WeekHigh}
            yearClose={data[data?.length - 1].Close}
          />
        )}
        {data ? (
          <>
            <Graph arr={data} />
          </>
        ) : (
          <>Loading</>
        )}
        <div className="filters_date">
          <Button className="filter1" onClick={HandleOneMonth}>
            1M
          </Button>
          <Button className="filter2" onClick={HandleSixMonth}>
            6M
          </Button>
          <Button className="filter3" onClick={HandleOneYear}>
            1Y
          </Button>
          <Button className="filter4" onClick={Handle18Month}>
            18M
          </Button>{" "}
          <Button className="filter5" onClick={Reset}>
            Reset
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
