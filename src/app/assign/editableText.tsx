'use client'

import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";


interface EditableTextProps {
    value: any;
    setValue: (value: any) => void;
}

export const EditableText = ({ value, setValue }: EditableTextProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [internalValue, setInternalValue] = useState(value);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        setValue(internalValue);
    };

    return (
        <div className="flex flex space-x-2">
            {isEditing ? (
                <input
                    value={internalValue}
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

export default EditableText;