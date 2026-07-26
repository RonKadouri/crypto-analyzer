import { Avatar, Button, Switch, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoinModel } from "../../../models/coin-model";
import { AppState } from "../../../redux/app-state";
import { selectedCoinsSlice, maxSelectedCoins } from "../../../redux/selected-coins-slice";
import { CoinDialogBox } from "../coin-dialog-box/coin-dialog-box";
import { MaxCoinsDialog } from "../max-coins-dialog/max-coins-dialog";
import "./coins-card.css";

type CoinCardProps = {
    coin: CoinModel
}

export function CoinsCard(props: CoinCardProps) {

    const [open, setOpen] = useState(false);
    const [openMax, setOpenMax] = useState(false);

    const dispatch = useDispatch();
    const selectedCoins = useSelector((state: AppState) => state.selectedCoins);
    const isSelected = selectedCoins.includes(props.coin.id);

    const handleToggle = () => {
        // Trying to add a new coin while already at the limit -> show the limit dialog.
        if (!isSelected && selectedCoins.length >= maxSelectedCoins) {
            setOpenMax(true);
            return;
        }
        dispatch(selectedCoinsSlice.actions.toggleCoin(props.coin.id));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className="CoinsCard">
            <div className="CoinsCardHeader">
                <Avatar
                    src={props.coin.image}
                    alt={props.coin.name + " logo"}
                />
                <div className="CoinsCardTitles">
                    <Typography className="CoinsCardSymbol">
                        {props.coin.symbol.toUpperCase()}
                    </Typography>
                    <Typography className="CoinsCardName">
                        {props.coin.name}
                    </Typography>
                </div>
                <Switch
                    checked={isSelected}
                    onChange={handleToggle}
                    slotProps={{ input: { "aria-label": "Select " + props.coin.name } }}
                />
            </div>

            <Button fullWidth variant="contained" disableElevation onClick={handleClickOpen}>
                More Info
            </Button>

            <CoinDialogBox coin={props.coin} open={open} onClose={handleClose} />

            <MaxCoinsDialog open={openMax} onClose={() => setOpenMax(false)} />
        </div>
    );
}
