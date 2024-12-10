/* eslint-disable react/prop-types */
import React from "react";

import { checkXpNetLocked } from "../../../services/deposits";

import { setDiscountLeftUsd } from "../../../store/reducers/discountSlice";

import { ChainType } from "xp.network";

import DeployUserStore from "../../TransferBoard/DeployUserStore";
import { ClaimInDestination } from "../../TransferBoard/ClaimInDestination";

import { injected } from "../../../wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import { getChainObject, v3_bridge_mode } from "../../values";
import { switchNetwork } from "../../../services/chains/evm/evmService";
import { sleep } from "../../../utils";
import { connectVeChainWallet } from "../../Wallet/ConnectWalletHelper";

export const withEVM = (Wrapped) =>
  function CBU(props) {
    const discounts = async (dispatch, _, account) => {
      if (account) {
        const data = await checkXpNetLocked(account);
        dispatch(setDiscountLeftUsd(Math.round(data?.discountLeftUsd / 0.25)));
      }
    };

    const { activate } = useWeb3React();

    const connectionCallback = async (bridge, toChain) => {
      const chain = getChainObject(toChain);
      let chainWapper = await bridge.getChain(toChain);

      if (chain.type === "VeChain") {
        const account = await connectVeChainWallet();
        chainWapper.setSigner(account.signer);
        return chainWapper;
      } else {
        bridge.currentType === "EVM"
          ? await switchNetwork(chain)
          : (await activate(injected), await switchNetwork(chain));
        await sleep(3000);
      }

      if (v3_bridge_mode) {
        return;
      }

      return await new Promise((r) => {
        (async () => {
          while (!chainWapper.signer) {
            chainWapper = await bridge.getChain(toChain);
            await new Promise((r) => setTimeout(r, 2000));
          }

          r(chainWapper);
        })();
      });
    };

    return (
      <Wrapped
        {...props}
        chainSpecificRender={{
          ...(props.chainSpecificRender || {}),
          [ChainType.EVM]: {
            DeployUserStore,
            RenderClaimInDestination: ClaimInDestination(connectionCallback),
          },
        }}
        chainSpecific={{
          ...(props.chainSpecific || {}),
          [ChainType.EVM]: discounts,
        }}
      />
    );
  };
