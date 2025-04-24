import React, { useState } from 'react';
import { ApiClient } from "../lib/index.js";

import {
    ErrorMessage,
    SearchBar,
    SearchResults,
    MacAddressWithVendor,
} from "./"


export default function VendorLookup() {

    const [items, setItems] = useState(null)
    const [error, setError] = useState(null)

    async function lookup(text) {
        const addresses = text.split(/\s+|,/g).filter(v => v.length > 0)
        setItems(null)

        return await ApiClient.Organisation.vendorLookup(addresses)
            .then(items => {
                setItems(items)
                setError(null)
            })
            .catch(({httpStatus, message}) => {
                setError(message)
            })

    }

    return <>
        <h3 className={"text-xl mb-3 text-center"}>
            Find vendor's name for a MAC address
        </h3>

        <SearchBar
            placeholder={'Enter MAC addresses separated by comma or space'}
            onSubmit={(inputText) => lookup(inputText)}
            onReset={() => {
                setItems(null)
                setError(null)
            }}
        />
        <SearchResults
            items={items}
            itemRenderer={MacAddressWithVendor}
        />

        {error &&
            <ErrorMessage
                heading={"Something has gone wrong. Please try again later."}
                message={error}
            />
        }
    </>
}
