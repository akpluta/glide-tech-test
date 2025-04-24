import React from "react";


/**
 * @param {{mac_address: string, vendor: string}} item
 * @param {int} index
 * @returns {JSX.Element}
 */
function MacAddressWithVendor({mac_address, vendor}, index) {
    return (
        <li className="py-1 text-sm" key={`item-${index}`}>
            <strong className={"font-mono p-1 bg-white border-gray-200 border-1 rounded rounded-2 text-slate-700"}>
                {mac_address.toUpperCase()}
            </strong>
            <span> &mdash; </span>
            <span className="text-gray-600">
                {vendor}
            </span>
        </li>
    )
}

/**
 * @param {object[]|null} items
 * @param {({mac_address: string, vendor: string}, index: number) => void} itemRenderer
 * @returns {JSX.Element}
 */
function SearchResults({items, itemRenderer}) {
    if (items === null) {
        return <></>
    }

    return <>
        {items.length > 0 &&
            <ul className="list-disc m-5 text-sm">
                {items.map((item, idx) => itemRenderer(item, idx))}
            </ul>
        }
        {! items.length &&
            <div className={"w-full mt-3 p-4 py-5 text-sm text-orange-400 text-center border-1 border-orange-200 rounded bg-yellow-50"}>
                No results for given criteria
            </div>
        }
    </>
}

export {
    SearchResults,
    MacAddressWithVendor
}
