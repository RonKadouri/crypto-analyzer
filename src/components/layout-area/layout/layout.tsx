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

            {/* Parallax hero — the background stays fixed while the page scrolls. */}
            <header className="Hero">
                <h1 className="HeroTitle">Cryptonite</h1>
                <p className="HeroTagline">Real-time cryptocurrency market analyzer</p>
            </header>

            <main>
                <Router />
            </main>

            <footer>
                <Copyright />
            </footer>
        </div>
    );
}
