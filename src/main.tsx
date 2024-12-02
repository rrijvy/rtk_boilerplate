import "./styles.scss";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./app.tsx";

const root = document.getElementById("root");

if (root)
  createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
