import {createBrowserRouter} from "react-router-dom";
import Root from "../components/Root";
import Products from "../components/Products";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
    },
    {
        path: "/products",
        element: <Products/>,
    },
]);