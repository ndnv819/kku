import type { IcPawProps } from './types';

export function IcPaw({
  states = 'inactive',
  width = 28,
  height = 28,
  activeColor = '#598bff',
  inactiveColor = '#8f9bb3',
}: IcPawProps): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.78125 5.46094C8.44141 5.4608 9.625 5.66396 9.625 7.28896C9.625 8.91396 8.45312 9.53896 7.78125 9.53896C7.10938 9.53896 6.07812 8.90146 6.07812 7.28896C6.07812 5.67646 7.21094 5.46098 7.78125 5.46094Z"
        fill={states === 'inactive' ? inactiveColor : activeColor}
      />
      <path
        d="M4.15625 7.5C4.81641 7.49986 6 7.70302 6 9.32802C6 10.953 4.82812 11.578 4.15625 11.578C3.48438 11.578 2.45312 10.9405 2.45312 9.32802C2.45312 7.71552 3.58594 7.50005 4.15625 7.5Z"
        fill={states === 'inactive' ? inactiveColor : activeColor}
      />
      <path
        d="M14 7.28896C14 5.66396 12.8164 5.4608 12.1562 5.46094C11.5859 5.46098 10.4531 5.67646 10.4531 7.28896C10.4531 8.90146 11.4844 9.53896 12.1562 9.53896C12.8281 9.53896 14 8.91396 14 7.28896Z"
        fill={states === 'inactive' ? inactiveColor : activeColor}
      />
      <path
        d="M15.7031 7.5C16.3633 7.49986 17.5469 7.70302 17.5469 9.32802C17.5469 10.953 16.375 11.578 15.7031 11.578C15.0312 11.578 14 10.9405 14 9.32802C14 7.71552 15.1328 7.50005 15.7031 7.5Z"
        fill={states === 'inactive' ? inactiveColor : activeColor}
      />
      <path
        d="M14.9844 15.4688C14.9844 12.5469 13.0938 10.0156 10 10.0156C6.90625 10.0156 5.04688 12.4844 5.04688 15.4688C5.04688 17.9531 8.00819 17.9531 9.99254 17.9531H10C12.2031 17.9531 14.9844 17.875 14.9844 15.4688Z"
        fill={states === 'inactive' ? inactiveColor : activeColor}
      />
      <path
        d="M16.1562 19.5469C16.8164 19.5467 18 19.7499 18 21.3749C18 22.9999 16.8281 23.6249 16.1562 23.6249C15.4844 23.6249 14.4531 22.9874 14.4531 21.3749C14.4531 19.7624 15.5859 19.5469 16.1562 19.5469Z"
        fill={states === 'inactive' ? inactiveColor : activeColor}
      />
      <path
        d="M21.625 19.3358C21.625 17.7108 20.4414 17.5077 19.7812 17.5078C19.2109 17.5079 18.0781 17.7233 18.0781 19.3358C18.0781 20.9483 19.1094 21.5858 19.7812 21.5858C20.4531 21.5858 21.625 20.9608 21.625 19.3358Z"
        fill={states === 'inactive' ? inactiveColor : activeColor}
      />
      <path
        d="M24.1562 17.5078C24.8164 17.5077 26 17.7108 26 19.3358C26 20.9608 24.8281 21.5858 24.1562 21.5858C23.4844 21.5858 22.4531 20.9483 22.4531 19.3358C22.4531 17.7233 23.5859 17.5079 24.1562 17.5078Z"
        fill={states === 'inactive' ? inactiveColor : activeColor}
      />
      <path
        d="M29.5469 21.3749C29.5469 19.7499 28.3633 19.5467 27.7031 19.5469C27.1328 19.5469 26 19.7624 26 21.3749C26 22.9874 27.0312 23.6249 27.7031 23.6249C28.375 23.6249 29.5469 22.9999 29.5469 21.3749Z"
        fill={states === 'inactive' ? inactiveColor : activeColor}
      />
      <path
        d="M22 22.0625C25.0938 22.0625 26.9844 24.5938 26.9844 27.5156C26.9844 29.9219 24.2031 30 22 30H21.9925C20.0082 30 17.0469 30 17.0469 27.5156C17.0469 24.5312 18.9062 22.0625 22 22.0625Z"
        fill={states === 'inactive' ? inactiveColor : activeColor}
      />
    </svg>
  );
}
