import { createStore } from 'redux';
import { reducer } from './reducer';

const store = createStore(reducer);
// eslint-disable-next-line import/prefer-default-export
export { store };
