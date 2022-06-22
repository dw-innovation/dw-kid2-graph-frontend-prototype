import React from "react";

interface Props {
  width?: number;
}

const DeleteIcon = ({ width = 18 }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 473 473" width={width}>
    <path
      fill="currentColor"
      d="M324.285 215.015V128h20V38h-98.384V0H132.669v38H34.285v90h20v305h161.523c23.578 24.635 56.766 40 93.477 40 71.368 0 129.43-58.062 129.43-129.43 0-66.294-50.103-121.096-114.43-128.555zm-30 0a128.499 128.499 0 00-50 16.669V128h50v87.015zM162.669 30h53.232v8h-53.232v-8zM64.285 68h250v30h-250V68zm20 60h50v275h-50V128zm80 275V128h50v127.768c-21.356 23.089-34.429 53.946-34.429 87.802 0 21.411 5.231 41.622 14.475 59.43h-30.046zm145 40c-54.826 0-99.429-44.604-99.429-99.43s44.604-99.429 99.429-99.429 99.43 44.604 99.43 99.429S364.111 443 309.285 443z"
    ></path>
    <path
      fill="currentColor"
      d="M342.248 289.395L309.285 322.358 276.323 289.395 255.11 310.608 288.073 343.571 255.11 376.533 276.323 397.746 309.285 364.783 342.248 397.746 363.461 376.533 330.498 343.571 363.461 310.608z"
    ></path>
  </svg>
);

export default DeleteIcon;
