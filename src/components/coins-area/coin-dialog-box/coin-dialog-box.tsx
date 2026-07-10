import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { CoinModel } from "../../../models/coin-model";
import "./coin-dialog-box.css";
import React from "react";

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


export function CoinDialogBox(props: CoinDialogBoxProps) {
    return (
        <Dialog
            open={props.open}
            slots={{ transition: Transition }}
            onClose={props.onClose}
            aria-describedby="coin-dialog-description"
        >
            <DialogTitle>{props.coin.name}</DialogTitle>
            <DialogContent>
                <DialogContentText id="coin-dialog-description">
                    More info about {props.coin.symbol.toUpperCase()} goes here...
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
