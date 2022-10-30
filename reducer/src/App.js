import React, { Component, useContext, useReducer, useState } from 'react';

// import './App.css';
import Modle from './Modle';
import { reducer } from './Reducer';

const themes = {
  light: {
    foreground: "#000000",

    background: "#eeeeee"
  },
  add: {
    background: "green",
  },
  remove: {
    background: "red",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};


const defaultSate = {
  people: [],
  showModel: true,
  modelcontent: "Hello ....!",
  remove: '',
}
const ThemeContext = React.createContext(themes);
const PersonContex = React.createContext(defaultSate);
function App() {
  return (
    <ThemeContext.Provider value={themes}>
      <PersonContex.Provider value={defaultSate}>

        <Toolbar />
        <ThemedButton />
      </PersonContex.Provider>
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>

    </div>
  );
}

// const defaultSate = {
//   people: [],
//   showModel: false,
//   modelcontent: "Hello ....!"
// }
function ThemedButton() {


  const [name, setName] = useState('');

  // ------------

  // ----------------
  const theme = useContext(ThemeContext);
  const defaultV = useContext(PersonContex);
  const [state, dispatch] = useReducer(reducer, defaultV)
  const handlechange = (e) => {
    e.preventDefault();
    if (name) {
      const newI = { id: new Date().getTime().toString(), name: name };
      dispatch({ type: "ADD", payload: newI })
      setName('')
    } else {
      dispatch({ type: "NO_Value" })
    }

  }

  const closeModle = () => {
    dispatch({ type: "CLOSE_MODEL" })
  }
  return (

    <div
      style={{ background: theme.light.background, color: theme.dark, height: '100px' }}
    >
      {state.showModel && <Modle content={state.modelcontent} closeModle={closeModle}
        

        color={state.remove} />}

      <form onSubmit={handlechange}>
        <input type={'text'} value={name} onChange={(e) => { setName(e.target.value) }}></input>

        I am styled by theme context!
      </form>
      {state.people && state.people.map((p) => {
        return (
          <div key={p.id}>
            <a>{p.name} <button
              // style={{ background: theme.add.background, color: theme.dark, height: '100px' }}
              onClick={() => {
                dispatch({ type: "REMOVE", payload: p })
              }}>Reove</button></a>
          </div>)
      })}
    </div>
  );
}
export default App
