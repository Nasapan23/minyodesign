// In your main index.js or wherever you handle routing
import { ModalProvider } from "@/hooks/ModalContext";
import Home from "../components/home/index";

function App() {
    return (
        <div className="bg-blue-50">
            <Home />
        </div>
    );
}

export default App;
