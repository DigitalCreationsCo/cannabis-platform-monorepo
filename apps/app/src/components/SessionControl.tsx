import { Page } from '@cd/shared-ui';
import { PropsWithChildren, useState } from 'react';

export const SessionControl = ({ children }:PropsWithChildren) => {

    // mock session
    const [ session, setSession ] = useState(false)
    const toggleSession = () => {
        setSession(prev => !prev)
    }

    return (
        <>
        { session ? {children} : <Page>"Please login to view this page."</Page> }
        </>
    )
};