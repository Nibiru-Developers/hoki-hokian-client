import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lobby from "../pages/Lobby";
import Room from "../pages/Room";
import NotFound from "../pages/NotFound";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Lobby />} />
          </Route>
          <Route path="/room">
            <Route index element={<Room />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
