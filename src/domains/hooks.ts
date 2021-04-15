import React, { useEffect } from 'react';
import type { Actions, TStatus } from '../core/reduser';
import { fetchSetlibrariesData } from '../core/actions';
import { getData } from '../api';

export function useGetData(dispatch: React.Dispatch<Actions>, status: TStatus) {
    useEffect(() => {
        if (['loading', 'success'].includes(status)) return;
        dispatch(fetchSetlibrariesData({ data: [], status: 'loading' }));
        getData()
            .then((d) => {
                dispatch(fetchSetlibrariesData({ data: d, status: 'success' }));
            })
            .catch(() => {
                dispatch(fetchSetlibrariesData({ data: [], status: 'error' }));
            });
    }, []);
}
