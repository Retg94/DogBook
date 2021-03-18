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