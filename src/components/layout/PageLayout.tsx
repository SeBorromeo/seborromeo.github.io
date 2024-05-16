import { FC, ReactNode } from 'react';
import Navbar from './Navbar';
import React from 'react';

const PageLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <> 
            <Navbar/>
            <main>{children}</main>
        </>
    );
}

export default PageLayout;