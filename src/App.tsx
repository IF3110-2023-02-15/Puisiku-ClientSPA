import "./App.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Routing from "@/routes";

function App() {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
}

export default App;
