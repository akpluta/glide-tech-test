import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";

/**
 * @param {{
 *      inputRef: reference,
 *      placeholder: string,
 *      disabled: boolean,
 *      className: null|string,
 *      onChange: null|function(text: string): any,
 *      onReset: null|function(): any,
 *      onSubmit: null|function(text: string): any,
 *  }} props
 * @param {*} ref
 *
 * @returns {JSX.Element}
 */
function SearchInput(props, ref) {
    const [inputText, setInputText] = useState('')
    const inputRef = useRef(null)

    const noop = () => null
    const {
        placeholder= 'Enter one or more MAC addresses',
        disabled,
        className= '',
        onChange = noop,
        onReset = noop,
        onSubmit = noop,
    } = props

    useImperativeHandle(ref, () => ({
        clear: () => inputRef.current.value = '',
    }));

    /**
     * @param {Event} evt
     */
    function onChangeHandler(evt) {
        setInputText(inputRef.current.value)
        onChange(inputRef.current.value)
    }

    /**
     * @param {KeyboardEvent} evt
     */
    function onKeyDownHandler(evt) {
        switch (evt.key) {
            case 'Enter':
                onSubmit(inputText)
                break;

            case 'Escape':
                setInputText(inputRef.current.value = '')
                onReset()
                break;

            default:
                const val = evt.currentTarget.value
                if (val === '') {
                    onReset()
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
            className={className}
        />
    )
}

export default forwardRef(SearchInput)
