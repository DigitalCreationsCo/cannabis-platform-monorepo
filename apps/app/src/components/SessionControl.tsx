import { Page, Center } from '@cd/shared-ui';
import { PropsWithChildren, useState } from 'react';
import Layout from './Layout';

export const SessionControl = ({ children }:PropsWithChildren) => {

    // mock session
    const [ session, setSession ] = useState(true)
    const toggleSession = () => {
        setSession(prev => !prev)
    }

    return (
        session ? children : <Layout><Page><Center>Please login to view this page</Center></Page></Layout>
    )
};