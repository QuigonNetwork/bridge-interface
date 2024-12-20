/* eslint-disable react/prop-types */
import React from "react";

import { ChainType } from "xp.network";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";
import { Chain } from "xp.network";
import { onPhantom } from "../../Wallet/SOLWallet/SoloanaConnectors";

const connectionCallback = async (bridge) => {
  const chainWrapper = await bridge.getChain(Chain.SOLANA);
  const account = await onPhantom();
  chainWrapper.setSigner(account.signer); // Set the signer in the chainWrapper
  return chainWrapper;
};
export const withSolana = (Wrapped) =>
  function CBU(props) {
    return (
      <Wrapped
        {...props}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.SOLANA]: {
            RenderClaimInDestination: ClaimInDestination(connectionCallback),
          },
        }}
      />
    );
  };
