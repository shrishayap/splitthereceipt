'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import Link from 'next/link';
import ResultsTable from './resultsTable';

export interface Item {
    name: string;
    quantity: number;
    price: number;
    people: string[];
}

export default function App() {

    const router = useRouter()

    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [tip, setTip] = useState(0);
    const [names, setNames] = useState([]);
    const [items, setItems] = useState<Item[]>([]);


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



    return (
        <main className='flex flex-col bg-gradient-to-r from-stone-900 to-stone-800 h-full min-h-screen'>
            <div className='flex flex-col self-center p-4 md:p-8 max-w-xl w-full space-y-4'>

                <div className='flex justify-between'>
                    <Link href='/assign' className='text-white hover:underline'> Back </Link>
                    <button onClick={() => handleRestart()} className='text-white hover:underline'> Restart </button>
                </div>

                <h1 className='text-2xl font-semibold text-white'>Results</h1>
                <ResultsTable items={items} names={names} tax={tax} tip={tip} />

            </div>
        </main>
    )
}