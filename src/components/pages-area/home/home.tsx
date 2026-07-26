import { coinService } from "../../../services/coin-service";
import { CoinsList } from "../../coins-area/coins-list/coins-list";
import "./home.css";
coinService.getAllCoins();
export function Home() {
    return (
        <div className="Home">

            <p>Home Component</p>
            <hr />
            {<CoinsList />}
        </div>
    );
}
