### Totdo Using reducer, contex Provider



#### Global Context

- in src create <b>App</b> directory
- App.js

```js
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

```





#### useReducer

- useReducer 
```js


export const reducer = (state, action) => {
    if (action.type == "ADD") {
        const newIt = [...state.people, action.payload]
        return { ...state, people: newIt, showModel: true, modelcontent: "Item added", remove: "green" }
    }
    if (action.type == "NO_Value") {
        return { ...state, showModel: true, modelcontent: "Please enter value", remove: "yellow" }
    }
    if (action.type == "CLOSE_MODEL") {
        return { ...state, showModel: false }
    }
    if (action.type == "REMOVE") {
        console.log("----r", action.payload)
        const newi = state.people.filter((p) => p.id !== action.payload.id);
        return { ...state, people: newi, showModel: true, modelcontent: `${action.payload.name}is Removed`, remove: "red" }
    }
    throw new Error("No action type")

    console.log("--", state, action)
    return state;
}

```