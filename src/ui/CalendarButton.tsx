import { CalendarIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";

const CalendarButton = () => {
  // const [isClicked, setIsClicked] = useState(false);

  // const handleShowCalendar = () => {
  //   setIsClicked(true);
  // };

  return (
    <button style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
      <CalendarIcon color="headerButton" />
      <ChevronDownIcon
        color="headerButton"
        //style={{ transform: "rotate(180deg)" }} - rotate icon with animation when button is clicked
      />
    </button>
  );
};

export default CalendarButton;
