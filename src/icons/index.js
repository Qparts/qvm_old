import React from "react";

export const icons = (className, viewBox, fill, width, height, style, child) => {
    return (
        <svg
            className={className}
            viewBox={viewBox}
            fill={fill}
            width={width}
            height={height}
            style={style}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            {child}
        </svg>
    )
}