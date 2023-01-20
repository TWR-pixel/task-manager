import { ComponentProps, FC } from 'react';

interface IClearCheckbox extends ComponentProps<'svg'> {}

export const ClearCheckbox: FC<IClearCheckbox> = (props) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="1250.000000pt"
    height="1250.000000pt"
    viewBox="0 0 1250.000000 1250.000000"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g
      transform="translate(0.000000,1250.000000) scale(0.100000,-0.100000)"
      fill="#ffffff"
      stroke="none"
    >
      <path
        d="M4355 8774 c-167 -20 -243 -44 -347 -111 -127 -82 -237 -237 -259
-363 -29 -160 -30 -243 -27 -2095 4 -2118 -1 -1971 72 -2131 60 -129 192 -249
331 -301 132 -49 29 -46 2129 -50 1740 -3 1963 -2 1992 12 18 8 41 15 53 15
26 0 142 54 198 91 134 92 235 250 264 414 12 67 14 397 14 2005 0 2166 6
1999 -76 2169 -56 115 -161 221 -273 276 -153 73 2 68 -2126 70 -1053 1 -1928
1 -1945 -1z m3835 -517 c20 -7 44 -27 57 -46 l23 -34 -2 -1931 c-3 -2114 1
-1976 -62 -1995 -101 -31 -179 -32 -2016 -29 l-1845 3 -46 21 c-33 16 -50 32
-60 55 -12 29 -14 321 -14 1956 l0 1922 21 27 c11 16 34 36 50 45 27 16 154
18 1944 18 1458 0 1923 -3 1950 -12z"
      />
    </g>
  </svg>
);
