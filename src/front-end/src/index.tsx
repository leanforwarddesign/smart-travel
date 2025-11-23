import ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App.tsx";

const app = document.getElementById("app")!;
const root = ReactDOMClient.createRoot(app);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
