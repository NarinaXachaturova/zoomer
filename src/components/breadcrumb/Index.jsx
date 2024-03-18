import React from "react";

import { Link } from "react-router-dom";

/* Icons */
import RightArrow from "../icons/RightArrow";

export default function Breadcrumb({ label, path, isLast }) {
  return (
    <li className="flex items-center gap-5 cursor-pointer text-[16px] leading-[19px] font-bold mr-[10px]">
      <Link to={path}>{label}</Link>
      {!isLast && <RightArrow className="w-4 h-4 ml-1 text-darkgrey" />}
    </li>
  );
}
