import React from "react";
import { useEffect, useState } from "react";
import { addTodo, changeTask, cancelEdition } from "../../features/todos.slice";
import styles from "./TodoPage.module.css";
import { InputField, Button, TabContainer, TodoList } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

export function TodoPage() {
  const { todoForEdit } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const [taskName, setTaskName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (todoForEdit) {
      setTaskName(todoForEdit.name);
    } else {
      setTaskName("");
    }
  }, [todoForEdit]);

  function reset() {
    setIsDisabled(true);
    setTaskName("");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setTaskName(value);
    if (value.trim().length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  function createTask() {
    const date = new Date();
    const newTask = {
      id: date.getTime(),
      name: taskName,
      active: true,
    };

    dispatch(addTodo(newTask));
    reset();
  }

  function changeTodo() {
    dispatch(changeTask(taskName));
    reset();
  }

  function cancel() {
    dispatch(cancelEdition());
  }

  return (
    <main className={styles.todo__page}>
      <div className={styles.page__container}>
        <div className={styles.task__form}>
          <InputField
            type="text"
            value={taskName}
            onChange={(e) => handleChange(e)}
          />
          {!todoForEdit ? (
            <Button
              type="button"
              nameOfClass={styles.button}
              text="Add"
              onClick={() => createTask()}
              disabled={isDisabled}
            />
          ) : (
            <div className={styles.edit__buttons}>
              <Button
                type="button"
                nameOfClass={styles.button}
                text="Edit"
                onClick={() => changeTodo()}
                disabled={isDisabled}
              />
              <Button
                type="button"
                nameOfClass={styles.button_cancel}
                text="Cancel"
                onClick={() => cancel()}
              />
            </div>
          )}
        </div>
        <TabContainer />
        <TodoList />
      </div>
    </main>
  );
}