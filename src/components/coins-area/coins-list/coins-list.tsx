import { useEffect, useState } from "react";
import "./coins-list.css";
import { CoinModel } from "../../../models/coin-model";
import { coinService } from "../../../services/coin-service";
import { CoinsCard } from "../coins-card/coins-card";


export function CoinsList() {
    const [coins, setCoins] = useState<CoinModel[]>([]);
    useEffect(() => {
        coinService.getAllCoins()
            .then(allCoins => setCoins(allCoins))
            .catch(err => { alert(err.message) })
    }, [])
    return (
        <div className="CoinsList">
            {coins.map(c => <CoinsCard key={c.id} coin={c} />)}
        </div>
    );
}
