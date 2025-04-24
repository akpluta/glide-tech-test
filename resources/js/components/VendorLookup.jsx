import React, { useRef, useState } from 'react';
import { ApiClient } from "../lib/index.js";

import {
    Button,
    MacAddressWithVendor,
    SearchResults,
    SearchInput
} from "./"


export default function VendorLookup() {

    const [searchText, setTextSearch] = useState('')
    const [items, setItems] = useState(null)
    const [error, setError] = useState(null)
    const [isBusy, setIsBusy] = useState(false)
    const searchInputRef = useRef(null);


    function clearAll() {
        setTextSearch('')
        setItems(null)
        setError(null)
        searchInputRef.current.clear()
    }

    function lookup(text) {
        const addresses = searchText.split(/\s+/g).filter(v => v.length > 0)

        setItems(null)
        setIsBusy(true)
        /*
            Let's pretend this request takes a bit longer, so we can enjoy the beauty of our spinner :P
         */
        setTimeout(function () {
            ApiClient.Organisation.vendorLookup(addresses)
                .then(items => {
                    setItems(items)
                    setError(null)
                })
                .catch(({httpStatus, message, response}) => {
                    setError(message)
                })
                .finally(() => {
                    setIsBusy(false)
                })
        }, 500)
    }

    return <>
        <div className="w-flex flex flex-col sm:flex-row align-items-start justify-items-center">
            <SearchInput
                disabled={isBusy}
                ref={searchInputRef}
                placeholder="Enter one or more MAC addresses"
                onClear={() => clearAll()}
                onChange={(val) => setTextSearch(val)}
                onSearch={(text) => lookup(text)}
            />
            <div className={"flex flex-row pt-2 sm:pt-0 align-items-stretch justify-items-stretch"}>
                <Button
                    label={'Search'}
                    isBusy={isBusy}
                    isDisabled={isBusy || searchText === ''}
                    onClick={() => lookup('')}
                />
                {searchText !== '' &&
                    <Button
                        label={"Clear"}
                        isPrimary={false}
                        isDisabled={isBusy}
                        onClick={() => clearAll()}
                        cssClasses={"ml-1"}
                    />
                }
            </div>
        </div>

        <SearchResults items={items} itemRenderer={MacAddressWithVendor} />

        {error &&
            <div className={"text-center text-red-600 py-3 mt-2"}>
                <div className={"font-semibold"}>
                    Something has gone wrong. Please try again later.
                </div>
                <div className={"text-xs mt-2"}>
                    <strong>Error: </strong> {error}
                </div>
            </div>
        }
    </>
}
