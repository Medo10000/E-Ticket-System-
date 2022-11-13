import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { AiFillPieChart } from 'react-icons/ai'
import { SiFuturelearn } from 'react-icons/si'
import { SiOpenaccess } from 'react-icons/si'
import { CgProfile } from 'react-icons/cg'
import {GrUserSettings} from 'react-icons/gr'
import {IoTicket} from 'react-icons/io5'
import {BiTransfer} from 'react-icons/bi'
import {BsFillChatDotsFill} from 'react-icons/bs'
import Logo from '../assets/Capturelogo.PNG'

const SidebarA = () => {
    const [open, setOpen] = useState(false)
    const location = useLocation()


    const Menus = [
        { title: 'Dashboard', path: '/homee', src: <AiFillPieChart /> },
        { title: 'Gestion Utilisateur', path: '/userList', src: <GrUserSettings /> },
        { title: 'Gestion Tickets', path: '/ticketListA', src: <IoTicket /> },
        { title: 'Valider Transfert', path: '/transferListA', src: <BiTransfer /> },
        { title: 'Chat', path: '', src: <BsFillChatDotsFill />, gap: 'true' },
    ]

    

    return (
        <>
            <div 
                className={`${
                    open ? 'w-60' : 'w-60'
                } hidden sm:block relative h-screen duration-300 bg-gray-50 border-r border-gray-200 rounded-3xl dark:border-gray-600 p-5 dark:bg-slate-800`}
            >
                
                <Link to='/'>
                    <div className={`flex ${open && 'gap-x-4'} items-center`}>
                        <img src={Logo} alt='' className='pl-2' />
                    </div>
                </Link>

                <ul className='pt-6'>
                    {Menus.map((menu, index) => (
                        <Link to={menu.path} key={index}>
                            <li
                                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${menu.gap ? 'mt-9' : 'mt-2'} ${
                                    location.pathname === menu.path &&
                                    'bg-gray-200 dark:bg-gray-700'
                                }`}
                            >
                                <span className='text-2xl'>{menu.src}</span>
                                <span
                                    className={` origin-left duration-300 hover:block`}
                                >
                                    {menu.title}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default SidebarA