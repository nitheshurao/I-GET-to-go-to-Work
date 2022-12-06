
export const reducer = (state, action) => {
    console.log("--", state, action)
    if (action.type == "ADD") {
        const newIt = [...state.people, action.payload]
        console.log("--Ad", state, action)
        // return { ...state, people: [{ id: new Date().getTime.toString(), name: "n" }], showModel: true, modelcontent: "hii----" }
        return { ...state, people: newIt, showModel: true, modelcontent: "hii----", remove: "green" }
    }
    if (action.type == "NO_Value") {
        return { ...state, showModel: true, modelcontent: "Please enter value", remove: "yellowt" }
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