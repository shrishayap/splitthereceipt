'use client'

import Button from '@mui/joy/Button'
import CircularProgress from '@mui/joy/CircularProgress'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function App() {

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    //redirect to home if no names
    if (typeof window !== 'undefined') {
        if (JSON.parse(localStorage.getItem('names') || '[]').length === 0) {
            router.push('/')
        }
    }

    const handleFileUpload = async (e: any) => {
        setLoading(true)

        const file = e.target.files[0];
        if (!file) return;

        //format data and send
        const formData = new FormData();
        formData.set('file', file);
        const receiptData = await fetch('/api/img-process', {
            method: 'POST',
            body: formData
        })

        if (receiptData.status !== 200) {
            alert('Error processing receipt');
            setLoading(false);
            return;
        }

        try {
            const receiptJSON = await receiptData.json();
            console.log(receiptJSON);
            console.log(receiptJSON.items);
            localStorage.setItem('items', JSON.stringify(receiptJSON.items));
            localStorage.setItem('tax', receiptJSON.tax.toFixed(2));
            localStorage.setItem('tip', receiptJSON.tip.toFixed(2));
            router.push('/assign');
        }
        catch (err) {
            alert('Error processing receipt with error' + err);
            setLoading(false);
            return;
        }
    }

    const handleRestart = () => {
        localStorage.clear();
        router.push("/");
    }


    return (
        <main className='flex flex-col bg-gradient-to-r from-stone-900 to-stone-800 h-full min-h-screen'>

            <div className='flex flex-col self-center max-w-xl w-full space-y-4 p-4 md:p-8'>

                <div className='flex justify-between'>
                    <Link href='/names' className='text-white hover:underline'> Back </Link>
                    <button onClick={() => handleRestart()} className='text-white hover:underline'> Restart </button>
                </div>

                <h1 className='text-2xl font-semibold text-white'>Upload Receipt</h1>
                <p className='text-lg text-white'>Upload an image of your receipt. We only accpet image files for now (.png, .jpg, or .jpeg). Please make sure the receipt is as legible as possible. </p>
                <p className='text-lg text-white font-bold'>This function runs on a serverless runtime and might timeout. If it does, try uploading again.</p>

                <div className='flex justify-center pt-3'>
                    <input type="file" name="file" id="file" className='hidden' accept="image/png, image/jpeg, image/jpg" onInput={handleFileUpload} />
                    {!loading ?
                        <label
                            htmlFor="file"
                            className='px-4 py-2 border-2 bg-white w-full rounded-lg text-black text-center hover:cursor-pointer'>
                            Upload Receipt
                        </label> :
                        <Button startDecorator={<CircularProgress variant="solid" />} className='bg-white w-full px-4 py-2' disabled>Processing ... this will take a few seconds</Button>
                    }
                </div>

            </div>


        </main>
    );
}

