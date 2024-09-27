import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../Model";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
  setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function SingleTodo({ todo, todos, setTodos, index, setCompleted }: Props) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setCompleted(updatedTodos.filter((todo) => todo.isDone)); 
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setCompleted((prev) => prev.filter((todo) => todo.id !== id)); 
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Flex
            justify="space-between"
            align="center"
            bg="yellow.50"
            p={4}
            borderRadius="md"
            boxShadow="md"
            _hover={{
              transform: "scale(1.02)",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {edit ? (
              <Input
                ref={inputRef}
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
              />
            ) : (
              <Text
                fontFamily="Nunito"
                fontSize="18px"
                textDecoration={todo.isDone ? "line-through" : "none"}
              >
                {todo.todo}
              </Text>
            )}

            <Flex gap={2}>
              {edit ? (
                <Box onClick={(e) => handleEdit(e, todo.id)} ml={2}>
                  <MdDone size={20} color="green" />
                </Box>
              ) : (
                <>
                  <Box
                    color={"blue.800"}
                    transition={"color 0.2s ease-in"}
                    _hover={{
                      color: "blue.400",
                      transition: "all 0.3s ease-in",
                      transform: "scale(1.4)",
                    }}
                    onClick={() => setEdit(true)}
                  >
                    <AiFillEdit size={16} />
                  </Box>
                  <Box
                    color={"blue.800"}
                    transition={"color 0.2s ease-in"}
                    _hover={{
                      color: "blue.400",
                      transition: "all 0.3s ease-in",
                      transform: "scale(1.4)",
                    }}
                    onClick={() => handleDelete(todo.id)}
                  >
                    <AiFillDelete size={16} />
                  </Box>
                  <Box
                    color={"blue.700"}
                    transition={"color 0.2s ease-in"}
                    _hover={{
                      color: "blue.400",
                      transition: "all 0.3s ease-in",
                      transform: "scale(1.4)",
                    }}
                    onClick={() => handleDone(todo.id)}
                  >
                    <IoMdDoneAll size={16} />
                  </Box>
                </>
              )}
            </Flex>
          </Flex>
        </form>
      )}
    </Draggable>
  );
}
