import React from 'react';

interface IConProps {
  size?: number;
  color?: string;
  className?: string;
}

export const ArrowUpDown: React.FC<IConProps> = ({
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      className={className}
    >
      <g transform="translate(0,-952.36218)">
        <g transform="translate(3.1384168e-8,-2e-5)">
          <path
            transform="matrix(-0.92951737,0,0,0.71554176,-5.7710423,1002.4737)"
            d="M -30.952625,8.2294902 -60,58.541019 -89.047375,8.2294904 z"
            strokeWidth="4.90471458"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
          />
          <path
            d="M -30.952625,8.2294902 -60,58.541019 -89.047375,8.2294904 z"
            transform="matrix(-0.92951737,0,0,-0.71554176,-5.7710423,1002.2507)"
            strokeWidth="4.90471458"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
          />
        </g>
      </g>
    </svg>
  );
};
