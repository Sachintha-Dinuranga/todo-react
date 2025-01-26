import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./components/Todo";
const style = {
  bg: `h-screen w-screen p-4 bg-linear-to-t from-sky-500 to-indigo-500`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-3`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-indigo-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([
    "Learn react",
    "Learn firebase",
    "Learn tailwind",
  ]);

  //create todo
  //read todo
  //update todo
  //delete todo

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>ToDo List</h3>
        <form className={style.form}>
          <input type="text" placeholder="Add Todo" className={style.input} />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} />
          ))}
        </ul>
        <p className={style.count}>You have 3 todos</p>
      </div>
    </div>
  );
}

export default App;
