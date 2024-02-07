import React, { useContext, useEffect, useState, Suspense } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from '../authentication/AuthContext'
import { authHttp } from '../common/Common'

import Navigation from '../shared/Navigation/Navigation'
import DashboardLayout from '../shared/DashboardLayout/DashboardLayout'

const PortalHeader = React.lazy(() => import("../shared/PortalHeader/PortalHeader"));

function CustomRouter() {
    const { auth } = useContext(AuthContext);
    // const [isLoading, setIsLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isRoutesOpen, setIsRoutesOpen] = useState(true);

    useEffect(() => {
        if (auth) {
            authHttp
                .get('api-endpoint')
                .then((res) => {
                    setIsRoutesOpen((prev) => ({
                        ...prev,
                        isAppOpen: res?.data?.is_open,
                        isAdmitCardOpen: res?.data?.is_admit_card_open,
                        isObjectionOpen: res?.data?.is_objection_open,
                        isEditAppOpen: res?.data?.is_edit_application_open,
                    }));
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsRoutesOpen((prev) => ({
                        ...prev,
                        isAppOpen: false,
                        isAdmitCardOpen: false,
                        isObjectionOpen: false,
                        isEditAppOpen: false,
                    }));
                    setIsLoading(false);
                });
        }
    }, [auth]);

    const loading = (
        <div className="loading">
            <span>
                <img src={'../abc'} alt="loading img" className="circle-process" />
            </span>
            <h1>Loading...</h1>
        </div>
    );


    // return (
    //     // +++++++++ Return things on condition basis(Define wild card path also) START ++++++++++++++
    //     <Suspense fallback={loading}>
    //         {
    //             isLoading ? (
    //                 <Routes>
    //                     <Route path="*" element={loading} />
    //                 </Routes>
    //             ) : (
    //                 <Routes>
    //                     <>
    //                         <Route path={'paths?.admin?.commonPoint'}></Route>
    //                         {
    //                             auth.role != 'abc' ? (
    //                                 <>
    //                                     <Route path={'paths?.admin?.user?.commonPoint'} element={'<AdminDashboardLayout />'} ></Route>
    //                                 </>
    //                             ) : (
    //                                 <>
    //                                     <Route path={'paths?.admin?.login'} element={'<AdminLogin />'} />
    //                                 </>
    //                             )
    //                         }

    //                     </>
    //                 </Routes>
    //             )
    //         }
    //     </Suspense>
    //     // +++++++++ Return things on condition basis END ++++++++++++++
    // )
    return (
        // +++++++++ Return things on condition basis(Define wild card path also) START ++++++++++++++
        <Suspense fallback={loading}>
            {
                isLoading ? (
                    <Routes>
                        <Route path="*" element={loading} />
                    </Routes>
                ) : (
                    <Routes>
                        <>
                            {/* <Route path="" element={<Navigation/>}></Route> */}
                            {/* <Route path="" element={<PortalHeader/>}></Route> */}
                            <Route path="" element={<DashboardLayout/>}></Route>

                        </>
                    </Routes>
                )
            }
        </Suspense>
        // +++++++++ Return things on condition basis END ++++++++++++++
    )
}

export default CustomRouter