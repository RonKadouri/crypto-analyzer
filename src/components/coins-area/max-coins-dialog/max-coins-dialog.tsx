import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, Switch, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CoinModel } from "../../../models/coin-model";
import { AppState } from "../../../redux/app-state";
import { selectedCoinsSlice, maxSelectedCoins } from "../../../redux/selected-coins-slice";
import "./max-coins-dialog.css";

type MaxCoinsDialogProps = {
    open: boolean;
    onClose: () => void;
};

export function MaxCoinsDialog(props: MaxCoinsDialogProps) {

    const dispatch = useDispatch();
    const coins = useSelector((state: AppState) => state.coins);
    const selectedCoins = useSelector((state: AppState) => state.selectedCoins);

    // Turn the selected ids into full coin objects so we can show name/logo.
    const selected = selectedCoins
        .map(id => coins.find(coin => coin.id === id))
        .filter((coin): coin is CoinModel => coin !== undefined);

    const handleRemove = (id: string) => {
        dispatch(selectedCoinsSlice.actions.toggleCoin(id));
    };

    return (
        <Dialog className="MaxCoinsDialog" open={props.open} onClose={props.onClose}>
            <DialogTitle>You can pick up to {maxSelectedCoins} coins</DialogTitle>
            <DialogContent>
                <Typography className="MaxCoinsHint">
                    Toggle one off to make room for another coin.
                </Typography>
                <div className="SelectedCoinsList">
                    {selected.map(coin =>
                        <div key={coin.id} className="SelectedCoinRow">
                            <Avatar src={coin.image} alt={coin.name + " logo"} />
                            <div className="SelectedCoinTitles">
                                <span className="SelectedCoinSymbol">{coin.symbol.toUpperCase()}</span>
                                <span className="SelectedCoinName">{coin.name}</span>
                            </div>
                            <Switch
                                checked={true}
                                onChange={() => handleRemove(coin.id)}
                                slotProps={{ input: { "aria-label": "Unselect " + coin.name } }}
                            />
                        </div>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button className="MaxCoinsCloseButton" onClick={props.onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
