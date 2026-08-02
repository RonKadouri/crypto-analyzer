import { Avatar, Button, Chip, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { CoinModel } from "../../../models/coin-model";
import { RecommendationModel } from "../../../models/recommendation-model";
import { recommendationsService } from "../../../services/recommendations-service";
import "./recommendation-card.css";

type RecommendationCardProps = {
    coin: CoinModel;
}

export function RecommendationCard(props: RecommendationCardProps) {

    const [recommendation, setRecommendation] = useState<RecommendationModel>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGetRecommendation = async () => {
        setLoading(true);
        setError("");
        try {
            const result = await recommendationsService.getRecommendation(props.coin.id);
            setRecommendation(result);
        } catch (err) {
            setRecommendation(undefined);
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="RecommendationCard">
            <div className="RecommendationCardHeader">
                <Avatar
                    src={props.coin.image}
                    alt={props.coin.name + " logo"}
                />
                <div className="RecommendationCardTitles">
                    <Typography className="RecommendationCardSymbol">
                        {props.coin.symbol.toUpperCase()}
                    </Typography>
                    <Typography className="RecommendationCardName">
                        {props.coin.name}
                    </Typography>
                </div>
                {recommendation && (
                    <Chip
                        className={recommendation.shouldBuy ? "RecommendationChipBuy" : "RecommendationChipDontBuy"}
                        label={recommendation.shouldBuy ? "BUY" : "DON'T BUY"}
                    />
                )}
            </div>

            {recommendation && (
                <Typography className="RecommendationCardExplanation">
                    {recommendation.explanation}
                </Typography>
            )}

            {error && (
                <Typography className="RecommendationCardError">
                    {error}
                </Typography>
            )}

            <Button
                fullWidth
                variant="contained"
                disableElevation
                disabled={loading}
                onClick={handleGetRecommendation}
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
            >
                {loading ? "Asking AI..." : recommendation ? "Ask Again" : "Get AI Recommendation"}
            </Button>
        </div>
    );
}
