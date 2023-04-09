import {
    createBrowserRouter
} from "react-router-dom";
import Button from "./views/Button";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Button />,
    //   loader: rootLoader,
    //   children: [
    //     {
    //       path: "/",
    //       element: <Button />,
    //     },
    //   ],
    },
  ]);

const App = () => {
    return (
        <Button />
    )
}

export default App