import { Copyright } from "../copyright/copyright";
import { Menu } from "../menu/menu";
import { Router } from "../router/router";
import "./layout.css";

export function Layout() {
    return (
        <div className="Layout">

            <nav>
                <Menu />
            </nav>

            <main>
                <Router />
            </main>

            <footer>
                <Copyright />
            </footer>
        </div>
    );
}
