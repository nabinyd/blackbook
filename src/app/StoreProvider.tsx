'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../lib/store';
import Loading from './Loading';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
