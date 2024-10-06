import React from 'react';
import DataSquare from '@/components/data-square';
import TestPage from "@/utils/testpage";


const Home = () => {
    return (
        <div>
            <DataSquare>
                <foreignObject x="50" y="50" width="955.4" height="705.1">
                    <div xmlns="http://www.w3.org/1999/xhtml" className="h-full w-full flex items-center justify-center">
                        <TestPage />
                    </div>
                </foreignObject>
            </DataSquare>
        </div>
    );
};

export default Home;
