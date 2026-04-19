import React from "react";

const TodayDate = () => {
  const today = new Date();

  const options = { weekday: "long", month: "long", day: "numeric" };
  const formatted = today.toLocaleDateString("en-US", options);

  return <div className="text-white uppercase text-sm tracking-widest w-full ">{formatted}</div>;
};

export default TodayDate;