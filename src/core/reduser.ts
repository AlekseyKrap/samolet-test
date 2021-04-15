import React from 'react';
import type { DataItem } from '../api';
import type { TActionsR } from './types';

export type TStatus = 'default' | 'loading' | 'success' | 'error';

export type TinitialState = {
    librariesData: {
        data: DataItem[];
        status: TStatus;
    };
};

export const initialState: TinitialState = {
    librariesData: {
        data: [],
        status: 'default',
    },
};

export type Actions = TActionsR<TinitialState>;

export const ContextApp = React.createContext<{
    dispatch: React.Dispatch<Actions>;
    state: TinitialState;
}>({ dispatch: () => null, state: initialState });

export function reducer(state: TinitialState, action: Actions): TinitialState {
    switch (action.type) {
        case 'setlibrariesData':
            return {
                ...state,
                librariesData: action.payload,
            };
        default:
            return state;
    }
}
