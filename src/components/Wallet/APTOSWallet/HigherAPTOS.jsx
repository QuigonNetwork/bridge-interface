/* eslint-disable no-debugger */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAccount,
  setConnectedWallet,
  setConnectedWalletType,
  setFrom,
  setWalletsModal,
} from "../../../store/reducers/generalSlice";
import { getRightPath } from "../../../utils";
import { withServices } from "../../App/hocs/withServices";
import { Chain } from "xp.network";
import { chains } from "../../values";
import {
  googleAnalyticsCategories,
  handleGA4Event,
} from "../../../services/GA4";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

//import { biz } from "../../values";

export default function HigherAPTOS(OriginalComponent) {
  const updatedComponent = withServices((props) => {
    const { serviceContainer, close } = props;
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const APTOS_CHAIN = chains.find((chains) => chains.type === "APTOS");
    const { from, to } = useSelector((state) => state.general);
    const { connect, account, connected } = useWallet();

    const navigateToAccountRoute = () => {
      if (from && to) navigate(getRightPath(bridge.network, from, to));
    };

    useEffect(() => {
      (async () => {
        if (connected) {
          const chainWrapper = await bridge.getChain(Chain.APTOS);
          console.log({ account });
          const signer = account;
          dispatch(setWalletsModal(false));
          dispatch(setConnectedWallet("Petra"));
          dispatch(setConnectedWalletType("APTOS"));
          chainWrapper.setSigner(signer);
          chainWrapper.setSigner(signer);
          bridge.setCurrentType(chainWrapper);
          dispatch(setAccount(account.address));
          dispatch(setWalletsModal(false));
          dispatch(setFrom(APTOS_CHAIN));
          close();
          navigateToAccountRoute();
          handleGA4Event(
            googleAnalyticsCategories.Content,
            `Connected with: ${"Petra"}`,
          );
        }
      })();
    }, [connected]);

    const getStyles = () => {
      /*if (!biz) {
                return { display: "none" };
            }*/
      let styles = {};
      if (from && from.type !== "APTOS") {
        styles = {
          pointerEvents: "none",
          opacity: "0.6",
        };
      }
      return styles;
    };

    const connectWallet = async (wallet) => {
      // let signer;
      // let address;

      switch (wallet) {
        case "Martian":
          //signer = await connectMartian();
          //dispatch(setWalletsModal(false));
          //dispatch(setConnectedWallet("Martian"));
          // signer = connected;
          break;
        case "Petra": {
          // const petra = window.petra;
          // if (!petra)
          //     return window.open("https://petra.app/", "_blank");
          // const account = await petra.connect();
          // address = account.address;
          // chainWrapper.chain.setPetraSigner(signer);
          connect("Petra");

          break;
        }
        case "Pontem":
          //signer = await connectPontem();
          //dispatch(setWalletsModal(false));
          //dispatch(setConnectedWallet("Pontem"));
          // signer = connected;
          break;
        default:
          break;
      }
    };

    return (
      <OriginalComponent styles={getStyles} connectWallet={connectWallet} />
    );
  });
  return updatedComponent;
}
