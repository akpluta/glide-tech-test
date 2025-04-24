import React from "react";

export default function ErrorMessage({message, heading = null}) {
    return (
        <div className={"text-center text-red-600 py-3 mt-2"}>
            {heading &&
                <div className={"font-semibold"}>
                    {heading}
                </div>
            }
            <div className={"text-xs mt-2"}>
                <strong>Error: </strong> {message}
            </div>
        </div>
    )
}
