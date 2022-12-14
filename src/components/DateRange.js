import React, { useState } from "react";
import PropTypes from "prop-types";
import '../App.css';

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";

const DateRange = ({ onChange }) => {
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection"
    }
  ]);

  const handleOnChange = ranges => {
    const { selection } = ranges;
    onChange(selection);
    setState([selection]);
  };

  return (
    <DateRangePicker
      onChange={handleOnChange}
      className='overlay'
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={state}
      direction="horizontal"
    />
  );
};

DateRange.propTypes = {
  onChange: PropTypes.func
};

export default DateRange;
