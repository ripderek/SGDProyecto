import Navbar2 from '@/components/navbar2'
import React, { Fragment } from 'react'
import Footer from '../components/footer'

export default function Dashboard() {
    return (
        <Fragment>
            <div className='bg-gray-900'>
                <Navbar2></Navbar2>
            </div>
            <Footer></Footer>
        </Fragment>
    )
}
