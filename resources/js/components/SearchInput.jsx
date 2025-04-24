import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";

/**
 * @param {{
 *      placeholder: string,
 *      disabled: boolean,
 *      inputRef: reference,
 *      onChange: (text: string) => any|null,
 *      onSearch: (text: string) => any|null,
 *      onClear: () => any|null,
 *  }} props
 * @param {*} ref
 * @returns {JSX.Element}
 * @constructor
 */
function SearchInput(props, ref) {
    const [inputText, setInputText] = useState('')
    const inputRef = useRef(null)

    const noop = () => null
    const {
        placeholder= 'Enter one or more MAC addresses',
        disabled,
        onChange = noop,
        onClear = noop,
        onSearch = noop,
    } = props

    useImperativeHandle(ref, () => ({
        getSearchText: () => inputText,
        clear: () => inputRef.current.value = '',
    }));

    /**
     * @param {Event} evt
     */
    function onChangeHandler(evt) {
        setInputText(inputRef.current.value)
    }

    /**
     * @param {KeyboardEvent} evt
     */
    function onKeyDownHandler(evt) {
        switch (evt.key) {
            case 'Enter':
                onSearch(inputText)
                break;
            case 'Escape':
                setInputText(inputRef.current.value = '')
                onClear()
                break;

            default:
                const val = evt.currentTarget.value
                if (val === '') {
                    onClear()
                }
        }
    }

    return (
        <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            onKeyUp={onKeyDownHandler}
            onChange={onChangeHandler}
            className="
                    flex-grow-1 bg-white appearance-none border border-gray-300
                    rounded mr-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline
                    disabled:text-gray-300 placeholder:italic"
        />
    )
}

const SearchInputWithRef = forwardRef(SearchInput)
export default SearchInputWithRef
