import { useRoutes } from "react-router-dom";
import Home from "./home"

export default function Routes(){
    return(
        useRoutes([
            {
                path:'/',
                element:<Home/>
            }
        ])
    )
}