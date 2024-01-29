'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import EditableCurrency from './editableCurrency';
import ItemsTable from './itemsTable';
import Link from 'next/link';
import ResultsTable from '../results/resultsTable';
import Modal from '@mui/joy/Modal';
import DialogTitle from '@mui/joy/DialogTitle';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogContent from '@mui/joy/DialogContent';

export interface Item {
    name: string;
    quantity: number;
    price: number;
    people: string[];
}

export default function App() {

    const router = useRouter()

    const [tax, setTax] = useState<number | null>(null);
    const [tip, setTip] = useState<number | null>(null);
    const [names, setNames] = useState<string[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const names = window.localStorage.getItem("names");
        if (!names) {
            router.push('/');
        } else {
            setNames(JSON.parse(names));
        }

        const tax = window.localStorage.getItem("tax");
        if (!tax) {
            router.push('/');
        } else {
            setTax(JSON.parse(tax));
        }

        const tip = window.localStorage.getItem("tip");
        if (!tip) {
            router.push('/');
        } else {
            setTip(JSON.parse(tip));
        }

        const items = window.localStorage.getItem("items");
        if (!items) {
            router.push('/');
        } else {
            setItems(JSON.parse(items));
        }

    }, [])

    const handleRestart = () => {
        localStorage.clear();
        router.push("/");
    }

    useEffect(() => {
        if (tax) {
            localStorage.setItem('tax', Number(tax).toFixed(2));
        }
    }, [tax])

    useEffect(() => {
        if (tip) {
            localStorage.setItem('tip', Number(tax).toFixed(2));
        }
    }, [tip])



    return (
        <main className='flex flex-col bg-gradient-to-r from-stone-900 to-stone-800 h-full min-h-screen'>
            <div className='flex flex-col self-center p-4 md:p-8 max-w-2xl xl:max-w-6xl w-full space-y-4'>

                <div className='flex justify-between'>
                    <Link href='/upload' className='text-white hover:underline'> Back </Link>
                    <button onClick={() => handleRestart()} className='text-white hover:underline'> Restart </button>
                </div>

                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>

                    <div className='flex flex-col space-y-4 col-span-1'>
                        <div className='flex flex-col space-y-4'>
                            <h1 className='text-2xl font-semibold text-white'>Assign Items</h1>
                        </div>

                        <div>
                            <p className='text-lg text-white pt-1'>Assign people to an item by clicking the dropdown next to the item name and selecting the person's name. Click again to deselect the person. Selecting multiple people per item will split it evenly between them. </p>
                            <p className='text-lg text-white pt-1'>You can edit the name of the item, price, and quantity. Subtotal is calculated automatically, so verify at the end that it matches the receipt.</p>
                            <p className='text-lg text-white pt-1'>Quantity is the number of that item that was ordered. For example, if 3 people ordered a burger for $15 per burger, the quantity would be 3 and the price would be $45</p>

                            <ItemsTable items={items} setItems={setItems} names={names} />


                            <div className='grid grid-cols-2 gap-2 md:gap-4 p-2 bg-white rounded-lg mt-2'>
                                <div className='flex space-x-2'>
                                    <p className='font-semibold pt-1'>Tax:</p>
                                    <EditableCurrency value={tax} setValue={setTax} />
                                </div>
                                <div className='flex space-x-2'>
                                    <p className='font-semibold pt-1'>Tip:</p>
                                    <EditableCurrency value={tip} setValue={setTip} />
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-2 md:gap-4 p-2 bg-white rounded-lg mt-2'>
                                <div className='flex space-x-2'>
                                    <p className='font-semibold pt-1'>Subtotal:</p>
                                    <p className='pt-1'>${
                                        items.reduce((acc, item) => {
                                            return acc + Number(item.price)
                                        }, 0).toFixed(2)
                                    }</p>
                                </div>
                                <div className='flex space-x-2'>
                                    <p className='font-semibold pt-1'>Total:</p>
                                    <p className='pt-1'>${(Number(items.reduce((acc, item) => {
                                        return acc + Number(item.price)
                                    }, 0).toFixed(2)) + Number(tax) + Number(tip)).toFixed(2)}</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='flex flex-col space-y-4 hidden xl:block sticky top-0 h-fit'>
                        <h1 className='text-2xl font-semibold text-white'>Results</h1>
                        <ResultsTable items={items} names={names} tax={tax ?? 0} tip={tip ?? 0} />
                    </div>

                </div>



                <Link href='/results' className='xl:hidden px-4 py-2 border-2 bg-white w-full rounded-lg text-black text-center hover:cursor-pointer self-center'>See Results</Link>

            </div>


        </main >
    )
}