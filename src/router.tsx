import {createBrowserRouter} from "react-router"
import App from "./App"
import { WritePage } from "./page/writePage"
import { BookDetail } from "./page/writePage/bookDetail"

export const router = createBrowserRouter([
    {
        path: "/",
        element:<App/>
    },{
        path: "/write",
        element: <WritePage/>
    },{
        path: "/bookDetail/:path",
        element:<BookDetail/>
    }
])