import "./styles.css";
import React, { useState } from "react";

export default function App() {
  
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [name, setName] = useState("");

  const getValue = (e) => {
    setName(e.target.value);
    setText(e.target.value);
  };

  const newTask = () => {
    const newtask = {
      id: list.length ? list[list.length - 1].id + 1 : 1,
      listName: text
    };
    setList([...list, newtask]);
    setName("");
    setText("");
    console.log(newtask.id, newtask.listName);
  };
  const delTask = (taskDel) => {
    setList(list.filter((ele) => ele.id !== taskDel.id));
    console.log(`deleted ${taskDel.listName} with id: ${taskDel.id}`);
  };  

  return (
    <div className="App">
      <input type="text" onChange={getValue} value={name}></input>
      <button className="addTask" onClick={newTask}>
        Add Task
      </button>
      <h1>{text}</h1>
      <div>
        {list.map((ele, id) => {
          return (
            <div key={ele.id} id={ele.id}>
              <h1>{ele.listName}</h1>
              <button onClick={() => delTask(ele)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
