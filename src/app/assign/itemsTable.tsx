import { Item } from "./page";
import * as React from 'react';
import Table from '@mui/joy/Table';
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import Chip from "@mui/joy/Chip";
import { FaCheck } from "react-icons/fa6";
import Checkbox from "@mui/joy/Checkbox";
import EditableText from "./editableText";
import { EditableCurrency } from "./editableCurrency";
import EditableNumber from "./editableNumber";


interface ItemsTableProps {
    items: Item[];
    names: string[];
    setItems: (items: Item[]) => void;
}

export const ItemsTable = ({ items, names, setItems }: ItemsTableProps) => {

    const handleItemNameChange = (index: number, name: string) => {
        const newItems = [...items];
        newItems[index].name = name;
        setItems(newItems);
        window.localStorage.setItem("items", JSON.stringify(newItems));
    }

    const handleItemPriceChange = (index: number, price: number) => {
        const newItems = [...items];
        newItems[index].price = price;
        setItems(newItems);
        window.localStorage.setItem("items", JSON.stringify(newItems));
    }

    const handleItemQuantityChange = (index: number, quantity: number) => {
        const newItems = [...items];
        newItems[index].quantity = quantity;
        setItems(newItems);
        window.localStorage.setItem("items", JSON.stringify(newItems));
    }

    const handleItemPeopleChange = (index: number, people: string[]) => {
        const newItems = [...items];
        newItems[index].people = people;
        setItems(newItems);
        window.localStorage.setItem("items", JSON.stringify(newItems));
    }

    return (
        <div className='bg-white w-full rounded-lg pt-2 mt-2'>

            <Table
                aria-label="collapsible table"
            >
                <thead>
                    <tr>
                        <th style={{ width: 40 }} aria-label="empty" />
                        <th style={{ width: '40%' }}>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <Row key={index} item={item} names={names} changeName={(name) => handleItemNameChange(index, name)} changePrice={(price) => handleItemPriceChange(index, price)} changeQuantity={(quantity) => handleItemQuantityChange(index, quantity)} handleItemPeopleChange={(people) => handleItemPeopleChange(index, people)} initialOpen={index === 0}/>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

interface RowProps {
    item: Item;
    names: string[];
    changeName: (name: string) => void;
    changeQuantity: (quantity: number) => void;
    changePrice: (price: number) => void;
    handleItemPeopleChange: (people: string[]) => void;
    initialOpen?: boolean;
}

function Row({ item, names, changeName, changePrice, changeQuantity, handleItemPeopleChange, initialOpen = false }: RowProps) {

    const [open, setOpen] = React.useState(initialOpen);
    const [internalName, setInternalName] = React.useState(item.name);
    const [internalPrice, setInternalPrice] = React.useState(item.price);
    const [internalQuantity, setInternalQuantity] = React.useState(item.quantity);
    const [internalPeople, setInternalPeople] = React.useState(item.people);

    React.useEffect(() => {
        setInternalName(item.name);
    }, [item.name]);

    React.useEffect(() => {
        setInternalPrice(item.price);
    }, [item.price]);

    React.useEffect(() => {
        setInternalQuantity(item.quantity);
    }, [item.quantity]);

    React.useEffect(() => {
        setInternalPeople(item.people);
    }, [item.people]);




    React.useEffect(() => {
        changeName(internalName);
    }, [internalName]);

    React.useEffect(() => {
        changePrice(internalPrice);
    }, [internalPrice]);

    React.useEffect(() => {
        changeQuantity(internalQuantity);
    }, [internalQuantity]);

    React.useEffect(() => {
        handleItemPeopleChange(internalPeople);
    }, [internalPeople]);

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
                    <EditableText  value={internalName} setValue={setInternalName} />
                </th>
                <td>
                    <EditableCurrency  value={internalPrice} setValue={setInternalPrice} />
                </td>
                <td>
                    <EditableNumber value={internalQuantity} setValue={setInternalQuantity} />
                </td>
            </tr>

            <tr>
                <td style={{ height: 0, padding: 0 }} colSpan={4}>
                    {open && (

                        <div className="flex flex-wrap py-3 px-[40px] bg-slate-200">

                            {names.map((name) => {
                                const checked = internalPeople.includes(name);
                                return (
                                    <Chip
                                        key={name}
                                        variant="plain"
                                        color={checked ? 'primary' : 'neutral'}
                                        startDecorator={
                                            checked && <FaCheck />
                                        }
                                        className='m-1'
                                    >
                                        <Checkbox
                                            variant="outlined"
                                            color={checked ? 'primary' : 'neutral'}
                                            disableIcon
                                            overlay
                                            label={name}
                                            checked={checked}
                                            onChange={() => {
                                                if (checked) {
                                                    setInternalPeople(internalPeople.filter((person) => person !== name));
                                                } else {
                                                    setInternalPeople([...internalPeople, name]);
                                                }
                                            }}
                                        />
                                    </Chip>
                                );
                            })}
                        </div>

                    )}
                </td>
            </tr>
        </React.Fragment>
    );
}


export default ItemsTable;

