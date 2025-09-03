import React from 'react'
import { inputStyles as styles } from '../assets/dummystyle.js'
import { UserContext } from '../context/UserContext.jsx'
import  Navbar from './Navbar.jsx'
import { useContext } from 'react'

const DashboardLayout = ({ activeMenu, children }) => {

    const { user } = useContext(UserContext)
    return (
        <div>
            <Navbar activeMenu={activeMenu} />
            {user && <div className=' container mx-auto pt-4 pb-4'>{children}</div>}
        </div>
    )
}

export default DashboardLayout
