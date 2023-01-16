import { Button, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import Graph from "../Components/Graph";
import { useRef } from "react";
import moment from "moment";
import Summary from "../Components/Summary";
import { useAuth } from "../Context/auth/AuthState";

const Dashboard = () => {
  const token = useAuth().auth.token;
  const header = {
    Authorization: "Bearer " + token,
  };
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
  const [endDate, setEndDate] = useState(new Date("2023-01-13"));
  const [startDate, setStartDate] = useState(
    new Date(moment(endDate).subtract(18, "M").format("YYYY-MM-DD"))
  );
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("chart");
  const [activeFilterMonth, setActiveFilterMonth] = useState("Handle18Month");

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
    setActiveFilterMonth("HandleOneMonth");
  };
  const HandleSixMonth = () => {
    const newEnd = moment(endDate).subtract(6, "M").format("YYYY-MM-DD");
    setStartDate(new Date(newEnd));
    setActiveFilterMonth("HandleSixMonth");
  };
  const HandleOneYear = () => {
    const newEnd = moment(endDate).subtract(12, "M").format("YYYY-MM-DD");
    setStartDate(new Date(newEnd));
    setActiveFilterMonth("HandleOneYear");
  };
  const Reset = () => {
    setStartDate(new Date("2018-01-15"));
    setActiveFilterMonth("");
  };
  const Handle18Month = () => {
    const newEnd = moment(endDate).subtract(18, "M").format("YYYY-MM-DD");
    setStartDate(new Date(newEnd));
    setActiveFilterMonth("Handle18Month");
  };

  // Apis Content

  const baseUrl = `https://stock-dekho.onrender.com:3001/${
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
      .post(
        baseUrl,
        {
          data: {
            startDate: new Date(
              moment(endDate).subtract(12, "M").format("YYYY-MM-DD")
            ),
            endDate: endDate,
            companyName: compName,
          },
        },
        { headers: header }
      )
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
        .post(
          baseUrl,
          {
            data: {
              startDate: startDate,
              endDate: endDate,
              companyName: compName,
            },
          },
          { headers: header }
        )
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
        {weekData && (
          <Summary
            name={`${stockName} (${
              personName === "getNSE" || personName === "getBSE"
                ? `${personName[3]}${personName[4]}${personName[5]}`
                : personName
            })`}
            date={`${new Date(
              weekData[weekData?.length - 1].Date
            ).getDate()}  ${
              monthNames[
                new Date(weekData[weekData?.length - 1].Date).getMonth()
              ]
            } ${new Date(weekData[weekData?.length - 1].Date).getFullYear()}`}
            price={weekData[weekData?.length - 1].Close}
            open={weekData[weekData?.length - 1].Open}
            previousClose={weekData[weekData?.length - 2].Close}
            dayClose={weekData[weekData?.length - 1].Close}
            dayLow={weekData[weekData?.length - 1].Low}
            dayHigh={weekData[weekData?.length - 1].High}
            yearLow={WeekLow}
            yearHigh={WeekHigh}
            yearClose={weekData[weekData?.length - 1].Close}
          />
        )}
        {weekData ? (
          <div className="details-final-tabs">
            <div className="tab-view">
              <Button
                className={`tab-item ${tab === "chart" && "activeTab"}`}
                onClick={() => setTab("chart")}
              >
                Chart
              </Button>
              <Button
                className={`tab-item ${tab === "overview" && "activeTab"}`}
                onClick={() => setTab("overview")}
              >
                Overview
              </Button>
            </div>
            {tab === "overview" ? (
              <div className="overview_dash">
                <div className="split-dash-over">
                  <div className="overview_details_indiv">
                    <div className="head-indiv">Open</div>
                    <div className="tail-indiv">
                      {weekData[weekData?.length - 1].Open}
                    </div>
                  </div>
                  <div className="overview_details_indiv">
                    <div className="head-indiv">Previous Close</div>
                    <div className="tail-indiv">
                      {weekData[weekData?.length - 2].Close}
                    </div>
                  </div>
                  <div className="overview_details_indiv">
                    <div className="head-indiv">Day High</div>
                    <div className="tail-indiv">
                      {weekData[weekData?.length - 1].High}
                    </div>
                  </div>
                </div>
                <div className="split-dash-over">
                  <div className="overview_details_indiv">
                    <div className="head-indiv">Day Low</div>
                    <div className="tail-indiv">
                      {weekData[weekData?.length - 1].Low}
                    </div>
                  </div>
                  <div className="overview_details_indiv">
                    <div className="head-indiv">52 Weeks High</div>
                    <div className="tail-indiv">{WeekHigh} </div>
                  </div>
                  <div className="overview_details_indiv">
                    <div className="head-indiv">52 Weeks Low</div>
                    <div className="tail-indiv">{WeekLow} </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="graph-chart-dash">
                {data ? (
                  <>
                    <div className="graph-candle">
                      <Graph arr={data} />
                    </div>
                    <div className="filters_date">
                      <Button
                        className={`filters filter1 ${
                          activeFilterMonth === "HandleOneMonth" &&
                          "active-filter-month"
                        }`}
                        onClick={HandleOneMonth}
                      >
                        1M
                      </Button>
                      <Button
                        className={`filters filter2 ${
                          activeFilterMonth === "HandleSixMonth" &&
                          "active-filter-month"
                        }`}
                        onClick={HandleSixMonth}
                      >
                        6M
                      </Button>
                      <Button
                        className={`filters filter3 ${
                          activeFilterMonth === "HandleOneYear" &&
                          "active-filter-month"
                        }`}
                        onClick={HandleOneYear}
                      >
                        1Y
                      </Button>
                      <Button
                        className={`filters filter4 ${
                          activeFilterMonth === "Handle18Month" &&
                          "active-filter-month"
                        }`}
                        onClick={Handle18Month}
                      >
                        18M
                      </Button>{" "}
                      <Button
                        color="error"
                        className={`filters filter5
                    `}
                        onClick={Reset}
                      >
                        Reset
                      </Button>
                    </div>
                  </>
                ) : (
                  <div id="loading"></div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div id="loading"></div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
