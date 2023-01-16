import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Summary = ({
  name,
  date,
  price,
  open,
  previousClose,
  dayClose,
  dayLow,
  dayHigh,
  yearLow,
  yearHigh,
  yearClose,
}) => {
  const changePrice = parseFloat(price) - parseFloat(previousClose);

  return (
    <div className="summary">
      <h2>{name}</h2>
      <div className="hr" />
      <div className="details">
        <div className="price">
          <h1>{price}</h1>
          <h3 className={`${changePrice > 0 ? "green" : "red"} growth`}>
            <ArrowDropUpIcon />
            {changePrice.toFixed(2)} ({(changePrice / 100).toFixed(2)}%)
          </h3>
          <h5>As on {date}</h5>
        </div>

        <div className="range">
          <div className="byDay">
            <h3>Day Range</h3>
            <div className="data">
              <h4>{dayLow}</h4>
              <h4>{dayHigh}</h4>
            </div>

            <div className="rangeValue">
              <h4 className="red">L</h4>
              <input type="range" min={dayLow} max={dayHigh} value={dayClose} />
              <h4 className="green">H</h4>
            </div>
          </div>

          <div className="byYear">
            <h3>52 week Range</h3>

            <div className="data">
              <h4>{yearLow}</h4>
              <h4>{yearHigh}</h4>
            </div>

            <div className="rangeValue">
              <h4 className="red">L</h4>
              <input
                type="range"
                min={yearLow}
                max={yearHigh}
                value={yearClose}
              />
              <h4 className="green">H</h4>
            </div>
          </div>

          {/* <div className="returns">
            <h3>Returns</h3>
            <h4>
              YTD <span>3.55%</span>
            </h4>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Summary;
