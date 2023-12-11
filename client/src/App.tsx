import "./index.css";
import { Router } from "./routes";
import { AuthProvider } from "./context/authContext";

export function App(){

  return(
    <AuthProvider>
      <Router/>
    </AuthProvider>
  )
}