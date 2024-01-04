import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Deck } from "./pages/Deck";
import { CreateDeck } from "./pages/Deck/CreateDeck";
import { Rooms } from "./pages/Rooms";
import { Confront } from "./pages/Confront";
import { ConfrontProvider } from "./context/confrontContext";
import { Game } from "./pages/Game";
import { EditDeck } from "./pages/Deck/EditDeck";
import { Rules } from "./pages/Rules";
export function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/deck" element={<Deck/>} />
                <Route path="/rules" element={<Rules/>}/>
                <Route path="/deck/create" element={<CreateDeck/>} />
                <Route path="/deck/:deck_id" element={<EditDeck/>} />
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
                <Route path="/confront/:room_id/:deck_id/game" element={
                    <ConfrontProvider>
                        <Game/>
                    </ConfrontProvider>
                }/>
                <Route path="/" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}