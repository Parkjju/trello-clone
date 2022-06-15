import { atom } from 'recoil';

interface ITodo {
    text: string;
    id: number;
}

interface ITodoState {
    [key: string]: string[];
}

export const todoState = atom<ITodoState>({
    key: 'todo',
    default: {
        'To Do': ['밥', '잠'],
        Doing: ['리액트 스터디', '스터디 리액트'],
        Done: ['달리기', '밤새기'],
    },
});

// export const todoState = atom<ITodoState>({
//     key: 'todo',
//     default: {
//         'To Do': ['React study'],
//         Doing: ['JavaScript study'],
//         Done: ['Eat', 'Sleep'],
//     },
// });
