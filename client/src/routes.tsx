import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Avatar } from "./pages/Avatar";
import { Card } from "./pages/Card";
import { Deck } from "./pages/Deck";
import { CreateDeck } from "./pages/Deck/CreateDeck";
import { Rooms } from "./pages/Rooms";
import { Confront } from "./pages/Confront";
import { ConfrontProvider } from "./context/confrontContext";
import { Game } from "./pages/Game";
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
                <Route path="/confront/rooms" element={
                    <ConfrontProvider>
                        <Rooms/>
                    </ConfrontProvider>
                    }/>
                    <Route path="/confront/:room_id" element={
                    <ConfrontProvider>
                        <Confront/>
                    </ConfrontProvider>
                    }/>
                <Route path="/confront/:room_id/game" element={
                    <Game/>
                }/>
                <Route path="/" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}