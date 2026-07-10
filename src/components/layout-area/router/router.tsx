import { Routes, Route } from "react-router";
import { Home } from "../../pages-area/home/home";
import { About } from "../../pages-area/about/about";

export function Router() {
    return (
       <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    );
}
