/* eslint-disable react/prop-types */
import React from "react";

import { ChainType } from "xp.network";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";
import { Chain } from "xp.network";
import DeployUserStore from "../../TransferBoard/DeployUserStore";
import { connectCasperWallet } from "../../Wallet/ConnectWalletHelper";

const connectionCallback = async (bridge) => {
  const chainWrapper = await bridge.getChain(Chain.CASPER);
  const signer = await connectCasperWallet(chainWrapper); // Connect to the ICP wallet and get the signer
  chainWrapper.setSigner(signer); // Set the signer in the chainWrapper
  return chainWrapper;
};
export const withCasper = (Wrapped) =>
  function CBU(props) {
    return (
      <Wrapped
        {...props}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.CASPER]: {
            DeployUserStore,
            RenderClaimInDestination: ClaimInDestination(connectionCallback),
          },
        }}
      />
    );
  };
