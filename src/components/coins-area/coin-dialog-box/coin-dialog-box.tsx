import { Dialog, DialogContent, DialogActions, Button, Slide, CircularProgress } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { CoinModel } from "../../../models/coin-model";
import { CoinDetailsModel } from "../../../models/coin-details-model";
import { coinService } from "../../../services/coin-service";
import "./coin-dialog-box.css";
import React, { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type CoinDialogBoxProps = {
    coin: CoinModel;
    open: boolean;
    onClose: () => void;
};

const currencies = [
    { code: "usd", symbol: "$" },
    { code: "eur", symbol: "€" },
    { code: "ils", symbol: "₪" },
];

export function CoinDialogBox(props: CoinDialogBoxProps) {

    const [details, setDetails] = useState<CoinDetailsModel | null>(null);

    useEffect(() => {
        if (!props.open) return;

        setDetails(null)
        coinService.getCoinDetails(props.coin.id)
            .then(data => setDetails(data))
            .catch(err => console.error(err));
    }, [props.open, props.coin.id]);

    return (
        <Dialog
            className="CoinDialogBox"
            open={props.open}
            slots={{ transition: Transition }}
            onClose={props.onClose}
            aria-describedby="coin-dialog-description"
        >
            <DialogContent id="coin-dialog-description">
                {!details
                    ? <div className="DialogLoader"><CircularProgress size={28} /></div>
                    : <div className="DialogPrices">
                        {currencies.map(currency =>
                            <div key={currency.code} className="DialogPriceRow">
                                {currency.symbol} {details.market_data.current_price[currency.code].toFixed(2)}
                            </div>
                        )}
                    </div>
                }
            </DialogContent>
            <DialogActions>
                <Button
                    className="CloseInfoButton"
                    fullWidth
                    variant="contained"
                    disableElevation
                    onClick={props.onClose}
                    autoFocus
                >
                    Close Info
                </Button>
            </DialogActions>
        </Dialog>
    );
}
