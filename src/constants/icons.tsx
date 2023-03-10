import React from 'react';

type SvgIconNames = 'success' | 'error';

const SVGIcons: Record<SvgIconNames, JSX.Element> = {
    success: (
        <svg
            width='50'
            height='50'
            viewBox='0 0 92 92'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <circle
                cx='46'
                cy='46'
                r='46'
                fill='#2FB17D'
            />
            <path
                d='M22.2581 47.41L34.6168 60.8387L70.4839 31.1613'
                stroke='white'
                strokeWidth='7.41935'
            />
        </svg>
    ),
    error: (
        <svg
            width='50'
            height='50'
            viewBox='0 0 92 92'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <circle
                cx='46'
                cy='46'
                r='46'
                fill='#8E192E'
            />
            <path
                d='M28 60.6773L63.8671 30.9999'
                stroke='white'
                strokeWidth='7.41935'
            />
            <path
                d='M63.8672 60.6774L28.0001 31'
                stroke='white'
                strokeWidth='7.41935'
            />
        </svg>
    ),
};

export default SVGIcons;
