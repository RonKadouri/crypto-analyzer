import { Avatar, Button, Switch, Typography } from "@mui/material";
import React from "react";
import { CoinModel } from "../../../models/coin-model";
import { CoinDialogBox } from "../coin-dialog-box/coin-dialog-box";
import "./coins-card.css";

type CoinCardProps = {
    coin: CoinModel
}

export function CoinsCard(props: CoinCardProps) {

    const [open, setOpen] = React.useState(false);

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
                <Switch slotProps={{ input: { "aria-label": "Select " + props.coin.name } }} />
            </div>

            <Button fullWidth variant="contained" disableElevation onClick={handleClickOpen}>
                More Info
            </Button>

            <CoinDialogBox coin={props.coin} open={open} onClose={handleClose} />




        </div>
    );
}
