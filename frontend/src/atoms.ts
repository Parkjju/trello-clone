import { atom } from 'recoil';

const todoState = atom({
    key: 'todo',
    default: [''],
});
