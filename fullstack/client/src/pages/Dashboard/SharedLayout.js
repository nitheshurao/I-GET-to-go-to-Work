import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { fromJSON } from 'tough-cookie'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, BigSidebar, SmallerSidebar } from './../../components'

function SharedLayout() {
    return (
        <Wrapper>
            <main className='dashboard'>
                <SmallerSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className='dashboard-page'>
                        <Outlet />
                    </div>
                </div>

            </main>
        </Wrapper>
    )
}

export default SharedLayout