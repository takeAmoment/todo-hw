import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo } from "../../features/todos.slice";
import styles from "./TodoPage.module.css";
import { TodoItem, InputField, Button } from "../../components";

export function TodoPage() {
  const { todoList } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    setTask(value);
  }

  function createTask() {
    const date = new Date();
    const newTask = {
      id: date.getTime(),
      name: task,
      active: true,
    };

    dispatch(addTodo(newTask));
    setTask("");
  }

  return (
    <main className={styles.todo__page}>
      <div className={styles.page__container}>
        <div className={styles.task__form}>
          <InputField
            type="text"
            value={task}
            onChange={(e) => handleChange(e)}
          />
          <Button
            type="button"
            nameOfClass={styles.button}
            text="Add"
            onClick={() => createTask()}
          />
        </div>
        <div className={styles.tabs}>
          <div className={styles.tab}>
            <span>Active</span>
          </div>
          <div className={`${styles.tab} ${styles.active}`}>
            <span>Inactive</span>
          </div>
        </div>
        <div className={styles.todos__container}>
          {todoList.length > 0 ? (
            <ul className={styles.todos}>
              {todoList.map((todo) => (
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
