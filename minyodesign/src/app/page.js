// In your main index.js or wherever you handle routing
import { ModalProvider } from "@/hooks/ModalContext";
import Home from "../../home";

function App() {
    return (
        <div>
            <Home />
        </div>
    );
}

export default App;
