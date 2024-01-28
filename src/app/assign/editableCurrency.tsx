'use client'

import { useState } from "react";
import CurrencyInput from 'react-currency-input-field';
import { FaRegEdit } from "react-icons/fa";
import internal from "stream";

interface EditableCurrency {
    value: any;
    setValue: (value: any) => void;
}


export const EditableCurrency = ({ value, setValue }: EditableCurrency) => {

    const [isEditing, setIsEditing] = useState(false);
    const [internalValue, setInternalValue] = useState(value);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        if (!value) {
            setValue(0);
            setInternalValue(0);
        }
        setValue(Number(internalValue));
        setIsEditing(false);
    };

    return (
        <div className="flex space-x-2">
            {isEditing ? (
                <CurrencyInput
                    decimalsLimit={2}
                    prefix="$"
                    decimalScale={2}
                    value={internalValue}
                    onValueChange={setInternalValue}
                    onBlur={handleBlur}
                    autoFocus={true}
                    className="cursor-text px-2 py-1 bg-white rounded-lg text-black w-full"
                />
            ) : (
                <div
                    onClick={handleDoubleClick}
                    className="cursor-pointer px-2 py-1 hover:bg-stone-200 rounded-lg space-x-3 flex items-center"
                >
                    <p>${Number(value).toFixed(2)}</p> 
                    <FaRegEdit className='inline' />
                </div>
            )}
        </div>
    );


}

export default EditableCurrency;