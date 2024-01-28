'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Link from 'next/link';


export default function App() {
    const router = useRouter()
    const [names, setNames] = useState<string[]>([]);
    const [newName, setNewName] = useState<string>("");

    useEffect(() => {
        const names = window.localStorage.getItem("names");
        if (names) {
            setNames(JSON.parse(names));
        }
    }, [])

    const handleAddName = () => {
        if (newName === "") {
            return;
        }

        if (names.includes(newName)) {
            alert("Cannot have duplicate names in the list");
            return;
        }

        setNames([...names, newName]);
        localStorage.setItem("names", JSON.stringify([...names, newName]));
        setNewName("");
    }

    const handleDelete = (index: number) => {
        const newNames = names.filter((_, i) => i !== index);
        setNames(newNames);
        localStorage.setItem("names", JSON.stringify(newNames));
    }

    const handleSubmit = async () => {
        const validNames = names.filter(name => name !== "");
        if (validNames.length < 2) {
            alert("Please enter at least 2 names");
            return;
        }

        window.localStorage.setItem("names", JSON.stringify(validNames));
        router.push("/upload")
    }

    const handleRestart = () => {
        localStorage.clear();
        router.push("/");
    }


    return (
        <main className='flex flex-col bg-gradient-to-r from-stone-900 to-stone-800 h-full min-h-screen'>

            <div className='flex flex-col self-center p-4 md:p-8 max-w-xl w-full space-y-4'>

                <div className='flex justify-between'>
                    <Link href='/' className='text-white hover:underline'> Back </Link>
                    <button onClick={() => handleRestart()} className='text-white hover:underline'> Restart </button>
                </div>

                <h1 className='text-2xl font-semibold text-white'>Add Names</h1>
                <p className='text-lg text-white'>Start by adding the names of everyone who is involved in this purchase. To remove a name, click the delete button next to the name. When you are done, click the "Next" button.</p>

                <div className='flex space-y-2 flex-col'>

                    <label htmlFor="new-name" className='text-white font-bold'>Add a name</label>

                    <div className='flex'>
                        <input
                            type="text"
                            placeholder='John Doe'
                            id='new-name'
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            className='rounded-lg px-4 py-2 border-2 border-white w-full text-black'
                        />
                        <button onClick={handleAddName} className='ml-2 rounded-lg px-4 py-2 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white'><IoIosAddCircle /></button>
                    </div>

                    <div className='flex flex-wrap'>
                        {names.map((name, index) => (
                            <Chip
                                size="lg"
                                variant="outlined"
                                color="neutral"
                                key={index}
                                endDecorator={<ChipDelete onDelete={() => handleDelete(index)} />}
                                className='m-1'
                            >
                                {name}
                            </Chip>
                        ))}
                    </div>
                </div>


                <div className='flex justify-between pt-3'>
                    <button onClick={handleSubmit} className='rounded-lg px-4 py-2 border-2 border-white bg-white w-full'>Next</button>
                </div>

            </div>


        </main>
    );
}

