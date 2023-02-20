import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import type {RootState, AppDispatch} from '../store';

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useReduxDispatch: () => AppDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
