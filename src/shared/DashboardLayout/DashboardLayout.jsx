import React from 'react'
import './DashboardLayout.css'

function DashboardLayout() {
    return (
        <div>
            <div className="wrapper">
                <div className="sidebar d-flex">
                    <p className='text-center w-100'>Hello Sidebar</p>
                </div>
                <div className="position-absolute router-container">
                    <div className="d-block">
                        <p className='text-center w-100'>Hello Body Put here dynamic content here of dashboard</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DashboardLayout