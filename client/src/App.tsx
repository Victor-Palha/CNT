import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import { Router } from "./routes";
import { AuthProvider } from "./context/authContext";
import { ToastContainer } from "react-toastify";

export function App(){

  return(
    <AuthProvider>
      <Router/>
      <ToastContainer
                limit={1}
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
    </AuthProvider>
  )
}