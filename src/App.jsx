import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./components/Todo";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./service/firebase";

//tailwind styles
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
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a value for todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });

    setInput("");
  };
  //read todo
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);
  //update todo
  const toggleChecked = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  //delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id), {});
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>ToDone</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add Todo"
            className={style.input}
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleChecked={toggleChecked}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        <p className={style.count}>
          You have{" "}
          {todos.length === 1
            ? `${todos.length} todo`
            : `${todos.length} todos`}
        </p>
      </div>
    </div>
  );
}

export default App;
