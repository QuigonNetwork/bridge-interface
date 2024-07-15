import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuietConnection } from "../../store/reducers/signersSlice";
import {
  setError,
  setTempleClaimed,
  setTempleWalletData,
  setTemporaryFrom,
  setTransferLoaderModal,
} from "../../store/reducers/generalSlice";
import { XPDecentralizedUtility } from "../../utils/xpDecentralizedUtility";
import { Modal } from "react-bootstrap";
import WalletList from "../Wallet/WalletList";

export const ClaimInDestination = (connection) => {
  return function CB({
    serviceContainer,
    fromChain,
    toChain,
    hash,
    setDestHash,
  }) {
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();
    const [fromChainWapper, setFromChainWapper] = useState(null);

    useState(async () => {
      const _from = await bridge.getChain(fromChain);

      setFromChainWapper(_from);
    }, []);

    const to = useSelector((state) => state.general.to);
    const [showModal, setShowModal] = useState(false);

    const { account, isTempleWallet } = useSelector(
      (state) => state.general.templeWalletData
    );
    const templeIsClaimed = useSelector(
      (state) => state.general.templeIsClaimed
    );

    const handler = async () => {
      if (to.text === "Tezos") {
        dispatch(setTemporaryFrom(to));
        dispatch(setTempleWalletData({ account, isTempleWallet: true }));
        dispatch(setTempleClaimed(true));
        setShowModal(true);
        return;
      }

      dispatch(setQuietConnection(true));
      dispatch(setTransferLoaderModal(true));

      const xPDecentralizedUtility = new XPDecentralizedUtility();

      const chainWapper = await connection(bridge, toChain);
      console.log("chainWrapper: ", chainWapper);
      console.log("hash: ", hash);
      console.log({ destWalletAddress });
      // if (to.text === "Hedera" && destWalletAddress.includes(".")) {
      //   let signer;
      //   while (!signer?.accountToSign) {
      //     signer = hashConnect.getSigner(destWalletAddress);
      //     console.log({ signer });
      //     sleep(3000)
      //   }
      // }

      console.log({ account });

      try {
        const originChainIdentifier = await bridge.getChain(fromChain);
        const targetChainIdentifier = await bridge.getChain(toChain);
        console.log("identifiers: ", {
          originChainIdentifier,
          targetChainIdentifier,
        });

        const { hash: claimedHash } = await xPDecentralizedUtility.claimNFT(
          originChainIdentifier,
          targetChainIdentifier,
          hash,
          chainWapper,
          fromChainWapper
        );

        setDestHash(claimedHash);
        dispatch(setTransferLoaderModal(false));
      } catch (e) {
        console.log("in catch block");
        console.log(e);
        dispatch(setError({ message: e.message }));
        dispatch(setTransferLoaderModal(false));
      }
    };

    const inputElement = useRef(null);
    const [walletSearch, setWalletSearch] = useState("");

    const handleClose = () => {
      setShowModal(false);
      setWalletSearch("");
    };

    const handleChange = (e) => {
      if (!(e.nativeEvent.data === " " && walletSearch.length === 0)) {
        setWalletSearch(e.target.value);
      }
    };

    useEffect(() => {
      if (account?.signer && isTempleWallet && templeIsClaimed) {
        claim();
        dispatch(setTempleClaimed(false));
      }
    }, [account, isTempleWallet]);

    const destWalletAddress = useSelector(
      (state) => state.general.destWalletAddress
    );

    const claim = async () => {
      dispatch(setQuietConnection(true));
      dispatch(setTransferLoaderModal(true));

      const chainWapper = await connection(bridge, toChain, fromChain, hash);
      chainWapper.setSigner(account.signer);

      try {
        const originChainIdentifier = await bridge.getChain(fromChain);
        const targetChainIdentifier = await bridge.getChain(toChain);
        console.log("identifiers: ", {
          originChainIdentifier,
          targetChainIdentifier,
        });

        const xPDecentralizedUtility = new XPDecentralizedUtility();

        const { hash: claimedHash } = await xPDecentralizedUtility.claimNFT(
          originChainIdentifier,
          targetChainIdentifier,
          hash,
          chainWapper,
          fromChainWapper
        );

        console.log("claimedHash", claimedHash);

        setDestHash(claimedHash);
        dispatch(setTransferLoaderModal(false));

        dispatch(setTemporaryFrom(""));
        dispatch(
          setTempleWalletData({
            account: {},
            isTempleWallet: false,
            isClaimed: false,
          })
        );
      } catch (e) {
        console.log("in catch block");
        console.log(e);
        dispatch(setError({ message: e.message }));
        dispatch(setTransferLoaderModal(false));
      }
    };

    return (
      <>
        <Modal
          show={showModal}
          onHide={handleClose}
          animation={null}
          className="ChainModal wallet-modal"
        >
          <Modal.Header>
            <Modal.Title style={{ minWidth: "max-content" }}>
              Connect Wallet
            </Modal.Title>
            <span className="CloseModal" onClick={handleClose}>
              <div className="close-modal"></div>
            </span>
          </Modal.Header>
          <div className="wallet-search__container">
            <input
              ref={inputElement}
              onChange={handleChange}
              value={walletSearch}
              className="wallet-search serchInput"
              type="text"
              placeholder="Search"
            />
            <div className="magnify"></div>
          </div>
          <Modal.Body>
            <div className="walletListBox">
              <WalletList input={walletSearch} connected={handleClose} />
            </div>
          </Modal.Body>
        </Modal>
        <button className="changeBtn ClaimInDestination" onClick={handler}>
          Claim
        </button>
      </>
    );
  };
};
