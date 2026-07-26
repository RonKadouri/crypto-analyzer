import { Routes, Route } from "react-router";
import { Home } from "../../pages-area/home/home";
import { About } from "../../pages-area/about/about";
import { Recommendations } from "../../pages-area/recommendations/recommendations";
import { Reports } from "../../pages-area/reports/reports";

export function Router() {
    return (
       <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/about" element={<About />} />
      </Routes>
    );
}
