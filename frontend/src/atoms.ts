import { atom } from 'recoil';

interface ITodo {
    text: string;
    id: number;
}

interface ITodoState {
    [key: string]: ITodo[];
}

export const todoState = atom<ITodoState>({
    key: 'todo',
    default: {
        'To Do': [],
        Doing: [],
        Done: [],
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
