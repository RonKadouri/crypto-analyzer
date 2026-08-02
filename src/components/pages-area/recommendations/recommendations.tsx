import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Typography } from "@mui/material";
import "./recommendations.css";
import { CoinModel } from "../../../models/coin-model";
import { coinService } from "../../../services/coin-service";
import { RecommendationCard } from "../../coins-area/recommendation-card/recommendation-card";
import { AppState } from "../../../redux/app-state";
import { maxSelectedCoins } from "../../../redux/selected-coins-slice";

export function Recommendations() {
    const [coins, setCoins] = useState<CoinModel[]>([]);
    const selectedCoins = useSelector((state: AppState) => state.selectedCoins);
    const navigate = useNavigate();

    useEffect(() => {
        coinService.getAllCoins()
            .then(allCoins => setCoins(allCoins))
            .catch(err => { alert(err.message) })
    }, [])

    // Keep only the coins the user selected (persisted in local storage).
    const recommendedCoins = coins.filter(coin => selectedCoins.includes(coin.id));

    return (
        <div className="Recommendations">

            <div className="RecommendationsHeader">
                <Typography className="RecommendationsTitle">Recommendations</Typography>
                <Typography className="RecommendationsSubtitle">
                    {selectedCoins.length} of {maxSelectedCoins} coins selected
                </Typography>
            </div>

            {selectedCoins.length === 0 ? (
                <div className="RecommendationsEmpty">
                    <div className="RecommendationsEmptyIcon">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.6"
                            strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v10" />
                            <path d="M15 9.5c0-1.1-1.34-2-3-2s-3 .9-3 2 1.34 2 3 2 3 .9 3 2-1.34 2-3 2-3-.9-3-2" />
                        </svg>
                    </div>
                    <Typography className="RecommendationsEmptyTitle">
                        No coins selected yet
                    </Typography>
                    <Typography className="RecommendationsEmptyText">
                        Pick up to {maxSelectedCoins} coins on the Home page and
                        they will show up here as your watchlist.
                    </Typography>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={() => navigate("/home")}
                    >
                        Browse Coins
                    </Button>
                </div>
            ) : (
                <div className="RecommendationsList">
                    {recommendedCoins.map(c => <RecommendationCard key={c.id} coin={c} />)}
                </div>
            )}

        </div>
    );
}