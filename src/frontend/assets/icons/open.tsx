import React from "react";

interface Props {
  width?: number;
}

const OpenIcon = ({ width = 18 }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 384.97 384.97" width={width}>
    <g>
      <path
        fill="currentColor"
        d="M360.909 0H24.061C10.767 0 0 10.767 0 24.061v336.848c0 13.293 10.767 24.061 24.061 24.061h336.848c13.281 0 24.061-10.767 24.061-24.061V24.061C384.97 10.767 374.191 0 360.909 0zm0 360.909H24.061V24.061h336.848v336.848z"
      ></path>
      <path
        fill="currentColor"
        d="M59.935 240.666c0 6.785 5.883 12.151 12.56 11.97h239.92c10.671.289 16.602-12.872 8.927-20.476l-120.291-119.1c-4.74-4.692-12.403-4.523-17.191 0L63.664 232.065c-2.285 2.177-3.729 5.209-3.729 8.601zm132.526-102.077l91.021 90.119H101.427l91.034-90.119z"
      ></path>
    </g>
  </svg>
);

export default OpenIcon;
