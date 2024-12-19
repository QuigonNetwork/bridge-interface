/* eslint-disable react/prop-types */
import React from "react";

import { ChainType } from "xp.network";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";
import { Chain } from "xp.network";
import { connectMyNearWallet } from "../../Wallet/ConnectWalletHelper";
import { XPDecentralizedUtility } from "../../../utils/xpDecentralizedUtility";

export const withNear = (Wrapped) =>
  function CBU(props) {
    const connectionCallback = async (bridge) => {
      const xpDecentralizedUtility = await XPDecentralizedUtility.create();
      const nearParams = xpDecentralizedUtility.config.bridgeChains.nearParams;
      const chainWrapper = await bridge.getChain(Chain.NEAR);
      const signer = await connectMyNearWallet(
        nearParams?.bridge,
        chainWrapper,
      );
      chainWrapper.setSigner(signer);
      return chainWrapper;
    };

    return (
      <Wrapped
        {...props}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.NEAR]: {
            // PreNftFech,
            RenderClaimInDestination: ClaimInDestination(connectionCallback),
          },
        }}
      />
    );
  };
