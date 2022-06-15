import { Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoState } from '../atoms';
import React from 'react';
import BoardCard from './BoardCard';
import { useForm } from 'react-hook-form';

const Wrapper = styled.div`
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.boardColor};
    width: 260px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    min-height: 210px;
`;

const Title = styled.h1`
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 10px;
    width: 90%;
    text-align: left;
`;
const Input = styled.input`
    display: block;
    width: 100%;
`;
const Form = styled.form`
    display: block;
    width: 90%;
    margin-bottom: 10px;
`;

interface IBoardProps {
    category: string;
}
interface IForm {
    todo: string;
}

function Board({ category }: IBoardProps) {
    const [todos, setTodos] = useRecoilState(todoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const onValid = ({ todo }: IForm) => {
        setTodos((allBoard) => {
            const newTodo = {
                id: Date.now(),
                text: todo,
            };
            setValue('todo', '');

            const Item = JSON.parse(
                JSON.stringify(localStorage.getItem(`${category}`))
            );
            console.log(Item);
            // Item.push(newTodo);
            // JSON.stringify(Item);
            // localStorage.setItem(`${category}`, Item);

            return {
                ...allBoard,
                [category]: [...allBoard[category], newTodo],
            };
        });
    };
    return (
        <Droppable droppableId={category}>
            {(magic) => (
                <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
                    <Title>{category}</Title>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <Input
                            {...register('todo', { required: true })}
                            type='text'
                            placeholder='Type..'
                        />
                    </Form>

                    {todos[category].map((todo, index) => (
                        <BoardCard
                            key={todo.id + ''}
                            index={index}
                            draggableId={todo.id + ''}
                            text={todo.text}
                        />
                    ))}
                    {magic.placeholder}
                </Wrapper>
            )}
        </Droppable>
    );
}

export default React.memo(Board);
