import React from "react";

/**
 * @param {*} children
 * @param {number|null} gap
 * @returns {JSX.Element}
 */
export default function ButtonGroup({children, gap = 0}) {
    return <>
        <div className={
            "w-flex flex flex-col sm:flex-row align-items-start justify-items-center " +
            `gap-${gap}`}>
            {children}
        </div>
    </>
}
