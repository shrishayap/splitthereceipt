
'use client'

import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";


interface EditableNumberProps {
    value: any;
    setValue: (value: any) => void;
}

export const EditableNumber = ({ value, setValue }: EditableNumberProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [internalValue, setInternalValue] = useState(value);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        setValue(Number(internalValue));
    };
    

    //make sure value is a number
    

    return (
        <div className="flex flex space-x-2">
            {isEditing ? (
                <input
                    value={internalValue}
                    type="number"
                    onChange={(e) => setInternalValue(e.target.value)}
                    onBlur={handleBlur}
                    autoFocus={true}
                    className="cursor-text px-2 py-1 bg-white rounded-lg text-black w-full"
                />
            ) : (
                <div
                    onClick={handleDoubleClick}
                    className="cursor-pointer px-2 py-1 hover:bg-stone-200 rounded-lg space-x-3 flex items-center"
                >
                    <p>{value}</p> 
                    <FaRegEdit className='inline' />
                </div>
            )}
        </div>
    );


}

export default EditableNumber;