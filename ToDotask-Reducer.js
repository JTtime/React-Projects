import "./todo-reducer-styles.css";
import React, { useReducer } from "react";



export default function App() {
  // const [list, setList] = useState([]);
  // const [text, setText] = useState("");

  // const [name, setName] = useState("");

  function reducer(state, action) {
    switch (action.type) {
      case "GETVAL":
        return { list: [...state.list], name: action.payload };
      case "ADD":
        return {
          list: [
            ...state.list,
            {
              id: state.list.length
                ? state.list[state.list.length - 1].id + 1
                : 1,
              listName: action.payload
            }
          ],
          name: ""
        };

      case "DEL":
        const updatedList = state.list.filter(
          (ele) => ele.id !== action.payload
        );
        return { list: updatedList, name: "" };

      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    list: [],
    name: ""
  });

  function getValue(e) {
    dispatch({ type: "GETVAL", payload: e.target.value });

    console.log(state);
  }

  const newTask = (input) => {
    dispatch({ type: "ADD", payload: input });
    // setList([...list, newtask]);
    // setName("");
    // setText("");
    console.log(`Added new task: "${input}"`);
  };
  const delTask = (taskDel) => {
    dispatch({ type: "DEL", payload: taskDel.id });
    // setList(list.filter((ele) => ele.id !== taskDel.id));
    console.log(`deleted ${taskDel.listName} with id: ${taskDel.id}`);
  };

  return (
    <div className="App">
      <input
        className="textboxarea"
        type="text"
        onChange={(e) => getValue(e)}
        value={state.name}
      ></input>
      <button className="addTask" onClick={() => newTask(state.name)}>
        Add Task
      </button>
      {state.name && (
        <h1 className="dynamicText">Task to be added: {state.name}</h1>
      )}

      <div>
        {state.list.length ? (
          state.list.map((ele, id) => {
            return (
              <div className="todoContainer" key={ele.id}>
                <h1 className="list">
                  {ele.listName}{" "}
                  <button className="delBtn" onClick={() => delTask(ele)}>
                    X
                  </button>{" "}
                </h1>
              </div>
            );
          })
        ) : (
          <p className="reqText">
            Add some task above & click "Add Task" button
          </p>
        )}
      </div>
    </div>
  );
}

