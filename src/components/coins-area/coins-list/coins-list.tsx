import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./coins-list.css";
import { CoinModel } from "../../../models/coin-model";
import { coinService } from "../../../services/coin-service";
import { CoinsCard } from "../coins-card/coins-card";
import { AppState } from "../../../redux/app-state";


export function CoinsList() {
    const [coins, setCoins] = useState<CoinModel[]>([]);
    const search = useSelector((state: AppState) => state.search);

    useEffect(() => {
        coinService.getAllCoins()
            .then(allCoins => setCoins(allCoins))
            .catch(err => { alert(err.message) })
    }, [])

    // Keep only coins whose name or symbol contains what the user typed.
    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="CoinsList">
            {filteredCoins.map(c => <CoinsCard key={c.id} coin={c} />)}
        </div>
    );
}
