import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addTodo, changeTask, cancelEdition } from "../../features/todos.slice";
import styles from "./TodoPage.module.css";
import { TodoItem, InputField, Button, TabContainer } from "../../components";

export function TodoPage() {
  const { todoForEdit, todoList, filterValue } = useSelector(
    (state) => state.todos
  );
  const { username } = useSelector((state) => state.username);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [list, setList] = useState(todoList);

  useEffect(() => {
    if (todoForEdit) {
      setTaskName(todoForEdit.name);
    } else {
      setTaskName("");
    }
  }, [todoForEdit]);

  useEffect(() => {
    if (filterValue === "active") {
      filterTodoList(true);
    } else if (filterValue === "inactive") {
      filterTodoList(false);
    } else {
      setList(todoList);
    }
  }, [filterValue, todoList]);

  function filterTodoList(isActive) {
    setList(todoList.filter((item) => item.active === isActive));
  }

  function reset() {
    setIsDisabled(true);
    setTaskName("");
  }

  function handleChange(e) {
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
        <h2 className={styles.user__title}>
          {username.slice(0, 1).toUpperCase() + username.slice(1)}
          {"  "}
          you have
          {"  "}
          {todoList.length}
          {"  "}
          {todoList.length < 2 ? "task" : "tasks"}
        </h2>
        <TabContainer />
        <div className={styles.todos__container}>
          {list.length > 0 ? (
            <ul className={styles.todos}>
              {list.map((todo) => (
                <TodoItem key={todo.id} task={todo} />
              ))}
            </ul>
          ) : (
            <p className={styles.empty__message}>Your list is empty!!</p>
          )}
        </div>
      </div>
    </main>
  );
}
