import React from "react";

type CalendarProps = {
  size?: string;
  color?: string;
};

const Calendar: React.FC<CalendarProps> = ({
  size = "25px",
  color = "#ffffff",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-2.4 -2.4 28.80 28.80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="matrix(1, 0, 0, 1, 0, 0)"
      stroke={color}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
        strokeWidth="0.192"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
          stroke={color}
          strokeWidth="1.392"
        />
        <path
          d="M7 4V2.5"
          stroke={color}
          strokeWidth="1.392"
          strokeLinecap="round"
        />
        <path
          d="M17 4V2.5"
          stroke={color}
          strokeWidth="1.392"
          strokeLinecap="round"
        />
        <path
          d="M2.5 9H21.5"
          stroke={color}
          strokeWidth="1.392"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default Calendar;