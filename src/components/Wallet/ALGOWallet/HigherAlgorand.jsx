import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Chain } from "xp.network";
import {
    setAccount,
    setAlgoSigner,
    setConnectedWallet,
    setFrom,
    setMyAlgo,
} from "../../../store/reducers/generalSlice";
import { setSigner } from "../../../store/reducers/signersSlice";
import { getRightPath } from "../../../wallet/helpers";
import { withServices } from "../../App/hocs/withServices";
import { getChainObject } from "../../values";
import {
    connectAlgoSigner,
    // connectAlgoWallet,
    connectMyAlgo,
} from "../ConnectWalletHelper";
import { connectPera } from "./AlgorandConnectors";

export default function HigherAlgorand(OriginalComponent) {
    const updatedComponent = withServices((props) => {
        const { serviceContainer } = props;
        const { bridge } = serviceContainer;
        const OFF = { opacity: 0.6, pointerEvents: "none" };
        const from = useSelector((state) => state.general.from);
        const to = useSelector((state) => state.general.to);
        const temporaryFrom = useSelector(
            (state) => state.general.temporaryFrom
        );
        const testnet = useSelector((state) => state.general.testNet);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const navigateToAccountRoute = () => {
            navigate(getRightPath());
        };

        const getStyles = () => {
            // debugger;
            if (temporaryFrom?.type === "Algorand") {
                return {};
            } else if (temporaryFrom && temporaryFrom?.type !== "Algorand") {
                return OFF;
            } else if (!from) {
                return {};
            } else if (from && from.type === "Algorand") {
                return {};
            } else return OFF;
        };

        const handleDisconnectPera = () => {
            dispatch(setAccount(""));
            dispatch(setConnectedWallet(""));
            navigate("/");
        };

        const connectionHandler = async (wallet) => {
            // eslint-disable-next-line no-debugger
            debugger;
            const chainWrapper = await bridge.getChain(
                from?.nonce || Chain.ALGORAND
            );
            let account;
            switch (wallet) {
                case "MyAlgo":
                    account = await connectMyAlgo(chainWrapper.chain);
                    account && dispatch(setMyAlgo(true));
                    account && dispatch(setConnectedWallet("MyAlgo"));
                    break;
                case "AlgoSigner":
                    account = await connectAlgoSigner(testnet);
                    account && dispatch(setAlgoSigner(true));
                    account && dispatch(setConnectedWallet("AlgoSigner"));
                    break;
                case "Pera": //TODO
                    account = await connectPera(handleDisconnectPera);
                    break;
                default:
                    break;
            }

            if (account) {
                chainWrapper.setSigner(account.signer);
                bridge.setCurrentType(chainWrapper);
                dispatch(setSigner(account.signer));
                console.log(account.address);
                dispatch(setAccount(account.address));
                if (temporaryFrom) dispatch(setFrom(temporaryFrom));
                if (account && to) navigateToAccountRoute();
                if (!from) {
                    dispatch(setFrom(getChainObject(Chain.ALGORAND)));
                }
            }
        };

        return (
            <OriginalComponent
                styles={getStyles}
                connectWallet={connectionHandler}
            />
        );
    });
    return updatedComponent;
}
