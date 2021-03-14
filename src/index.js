/*import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./styles/style.css"

const App = () => {
    return <h1>YoOoO dogs from React</h1>
}

ReactDOM.render(<App />, document.getElementById("root"))*/

import React from "react"
import { render } from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./app"
import "./styles/style.css"

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector("#root")
)