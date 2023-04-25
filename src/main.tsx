import React from "react";
import ReactDOM from "react-dom/client";
import { createHistoryRouter } from "atomic-router";
import { RouterProvider } from "atomic-router-react";
import { createBrowserHistory } from "history";
import { routesMap, updatePageSettings } from "./pages";
import { App } from "./App";
import "./index.css";

export const router = createHistoryRouter({
  routes: routesMap,
});

router.$path.watch(updatePageSettings);

const history = createBrowserHistory();

router.setHistory(history);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
