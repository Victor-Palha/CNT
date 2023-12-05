import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Avatar } from "./pages/Avatar";
import { Card } from "./pages/Card";
import { Deck } from "./pages/Deck";
import { CreateDeck } from "./pages/Deck/CreateDeck";
export function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/deck" element={<Deck/>} />
                <Route path="/deck/create" element={<CreateDeck/>} />
                <Route path="/avatar" element={<Avatar/>} />
                <Route path="/card" element={<Card/>} />
                <Route path="/" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}