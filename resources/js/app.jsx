import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    Layout,
    VendorLookup,
} from './components'


const appContainer = document.getElementById('app');
if (appContainer) {
    ReactDOM.createRoot(appContainer).render(
        <React.StrictMode>
            <Layout heading={"Tech Test App"}>
                <VendorLookup />
            </Layout>
        </React.StrictMode>
    )
}
