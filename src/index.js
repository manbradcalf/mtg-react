import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Contact from "./routes/contact";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Define our router
const router = createBrowserRouter(
  // Define our routes here
  [
    {
      // set the path for the route
      path: "/",

      // Set the React Component to the element property of this route
      element: <Root />,

      // todo : errorElement: <ErrorPage />

      // Set the children of this route.
      // In this case, the Root route
      children: [
        {
          path: "/contacts/:contactId",
          element: <Contact />,
        },
      ],
    },
  ]
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
