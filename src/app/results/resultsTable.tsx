import { Item } from "./page";
import * as React from 'react';
import Table from '@mui/joy/Table';
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";



interface ResultsTableProps {
    items: Item[];
    names: string[];
    tax: number;
    tip: number;
}

export const ResultsTable = ({ items, names, tax, tip }: ResultsTableProps) => {

    const subtotal = items.reduce((acc, item) => acc + item.price, 0)
    console.log(subtotal)

    return (
        <div className='bg-white w-full rounded-lg pt-2 mt-2'>

            <Table
                aria-label="collapsible table"
            >
                <thead>
                    <tr>
                        <th style={{ width: 40 }} aria-label="empty" />
                        <th style={{ width: '40%' }}>Person's Name</th>
                        <th>Share ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {names.map((name, index) => (
                        <Row key={index} items={items} name={name} initialOpen={true} tax={tax} tip={tip} subtotal={subtotal}/>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

interface RowProps {
    items: Item[];
    name: string;
    initialOpen?: boolean;
    tax: number;
    tip: number;
    subtotal: number;
}

function Row({ items, name, initialOpen = false, tax, tip, subtotal }: RowProps) {

    const [open, setOpen] = React.useState(initialOpen);
    let personalShares = []
    let totalShare = 0
    
    items.forEach(item => {
        const numPeople = item.people.length
        if (item.people.includes(name)) {
            personalShares.push({item: item.name, share:(Number(item.price) / numPeople).toFixed(2)})
            totalShare += item.price / numPeople
        }
    })

    totalShare += Number(tax)* (totalShare / subtotal)
    totalShare += Number(tip) * (totalShare / subtotal)
    personalShares.push({item: "Tax share", share: (Number(tax) * (totalShare / subtotal)).toFixed(2)})
    personalShares.push({item: "Tip share", share: (Number(tip) * (totalShare / subtotal)).toFixed(2)})


    return (
        <React.Fragment>

            <tr>
                <td>
                    <button
                        aria-label="expand row"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                    </button>
                </td>
                <th>
                    {name}
                </th>
                <td>
                    ${Number(totalShare).toFixed(2)}
                </td>
            </tr>

            <tr>
                <td style={{ height: 0, padding: 0 }} colSpan={3}>
                    {open && (

                        <div className="flex flex-wrap py-3 px-[40px] bg-slate-200">
                            {personalShares.map((share, index) => (
                                <div key={index} className="w-full flex justify-between">
                                    <div>{share.item}</div>
                                    <div>${Number(share.share).toFixed(2)}</div>
                                </div>
                            ))}
                            
                        </div>

                    )}
                </td>
            </tr>
        </React.Fragment>
    );
}


export default ResultsTable;

