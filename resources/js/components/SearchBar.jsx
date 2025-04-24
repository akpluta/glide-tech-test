import React, { useRef, useState } from "react";

import {
    Button,
    ButtonGroup,
    SearchInput
} from "./index.js";


/**
 * @param {{
 *     placeholder: string,
 *     onSubmit: function(string): any,
 *     onReset: function(): any,
 * }} props
 * @returns {JSX.Element}
 */
export default function SearchBar(props) {
    const {
        placeholder,
        onSubmit,
        onReset
    } = props

    const [isBusy, setIsBusy] = useState(false)
    const [searchText, setSearchText] = useState('')

    const searchInputRef = useRef(null)
    const hasSearchText = searchText.trim() !== ''

    const reset = () => {
        searchInputRef.current.clear()
        setSearchText('')
        onReset();
    }

    const submit = () => {
        setIsBusy(true)
        /*
            Let's pretend the lookup request takes a bit longer, so we can enjoy the beauty of our spinner :)
         */
        setTimeout(() => onSubmit(searchText).then(() => setIsBusy(false)), 300)
    }

    return <>
        <div className={
            "flex flex-col sm:flex-row align-items-start justify-items-center " +
            "rounded overflow-hidden shadow shadow-s shadow-gray-300"
            }>
            <SearchInput
                ref={searchInputRef}
                disabled={isBusy}
                placeholder={placeholder}
                onReset={reset}
                onSubmit={submit}
                onChange={(value) => setSearchText(value)}
                className={
                    "flex-grow-1 bg-white appearance-none text-gray-700 disabled:text-gray-300" +
                    "py-2 px-3 " +
                    "focus:outline-none focus:shadow-outline" +
                    "placeholder:italic"
                }
            />
            <ButtonGroup>
                <Button
                    label={'Search'}
                    isBusy={isBusy}
                    isDisabled={! hasSearchText || isBusy}
                    onClick={submit}
                />
                {hasSearchText &&
                    <Button
                        label={"Clear"}
                        isPrimary={false}
                        isDisabled={isBusy}
                        onClick={() => reset()}
                    />
                }
            </ButtonGroup>
        </div>
    </>
}
