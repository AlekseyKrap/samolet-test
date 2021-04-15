import type { TinitialState } from './reduser';

export const fetchSetlibrariesData = (
    payload: TinitialState['librariesData']
): { type: 'setlibrariesData'; payload: TinitialState['librariesData'] } => {
    return { type: 'setlibrariesData', payload };
};
