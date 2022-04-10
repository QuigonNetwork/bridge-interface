import { Modal } from "react-bootstrap";
import Close from "../../../assets/img/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import TransferredNft from "./TransferredNft";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ConnectAlgorand from "../../ConnectAlgorand";
import ClaimAlgorandNFT from "../../ClaimAlgorandNFT";
import { useEffect } from "react";
import { setNFTS, socket } from "../../../wallet/helpers";

import {
  cleanTxnHashArr,
  connectAlgorandWalletClaim,
  removeFromSelectedNFTList,
  setTxnStatus,
} from "../../../store/reducers/generalSlice";
import "./SuccessModal.css";
import Tooltip from "../AccountModal/Tooltip";
import { chainsConfig } from "../../values";

export default function SuccessModal() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);

  const algorandAccount = useSelector((state) => state.general.algorandAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);
  const tronWallet = useSelector((state) => state.general.tronWallet);
  const account = useSelector((state) => state.general.account);
  const receiver = useSelector((state) => state.general.receiver);
  const txnHashArr = useSelector((state) => state.general.txnHashArr);
  const selectedNFTList = useSelector((state) => state.general.selectedNFTList);
  const testnet = useSelector((state) => state.general.testNet);
  const address = account
    ? account
    : algorandAccount
    ? algorandAccount
    : elrondAccount
    ? elrondAccount
    : tronWallet
    ? tronWallet
    : "";
    
  const handleClose = () => {
    selectedNFTList.forEach((nft) => {
      const { txn } = nft;
      if (txn) dispatch(removeFromSelectedNFTList(nft));
    });
    dispatch(cleanTxnHashArr());
    setNFTS(address, from.key)
  };

  const getSubstringValue = () => {
    if (window.innerWidth <= 320) return 3;
    else if (window.innerWidth <= 375) return 6;
    else return false;
  };

  const getTX = () => {
    let ntx;
    if (txnHashArr && txnHashArr.length > 0) {
      if (typeof txnHashArr === "object" && !Array.isArray(txnHashArr)) {
        return txnHashArr[0].hash.toString();
      } else if (Array.isArray(txnHashArr)) {
        if (typeof txnHashArr[0] === "object") {
          return txnHashArr[0].hash.toString();
        } else {
          return txnHashArr[0].toString();
        }
      } else {
        return txnHashArr;
      }
    } else {
      return "wrong tx";
    }
  };

  const toShow = () => {
    return txnHashArr?.length ? true : false;
    return true
  };

  useEffect(() => {
    socket.on("incomingEvent", async e => {
      dispatch(setTxnStatus(e))
    });
    socket.on("updateEvent", async e => {
      dispatch(setTxnStatus(e))
    })
    return () => {
      if (socket) {
      socket.off("incomingEvent");
      socket.off("updateEvent");
      }
    }
  }, [])
  

  useEffect(() => {
    if (txnHashArr && txnHashArr.length > 0 && to && to.key === "Algorand") {
      dispatch(connectAlgorandWalletClaim(true));
    }
  }, [txnHashArr]);

  return (
    <>
      <ConnectAlgorand />
      <ClaimAlgorandNFT />
      <Modal animation={false} className="success-modal" show={toShow()}>
        <span onClick={handleClose} className="success-modal-close">
          <div className="close-modal"></div>
        </span>
        <Modal.Header className="border-0">
          <Modal.Title>
            <div className="custom-success-modal__title">Bridging Results</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="success-info-list">
          <div className="success-info-box">
            <div className="success-info-item">
              <div className="info-item-label">Date</div>
              <span>{moment().format("YYYY-MM-DD hh:mm")}</span>
            </div>
            <div className="success-info-item">
              <div className="info-item-label">Txn Hash</div>
              <CopyToClipboard text={getTX() || "No tx"}>
                <a href={testnet
              ? `${chainsConfig[from?.key]?.testTx + getTX()}`
              : `${chainsConfig[from?.key]?.tx + getTX()}`} target="_blank" className="success-hash">
                  {getTX()
                    ? `${getTX().substring(
                        0,
                        getSubstringValue() || 10
                      )}...${getTX().substring(getTX().length - 6)}`
                    : ""}
                  <Tooltip />
                </a>
              </CopyToClipboard>
            </div>
          </div>
          <div className="success-info-box">
            <div className="success-info-item">
              <div className="info-item-label">Sent From</div>
              <div className="info-item-chain">
                <img src={from?.image?.src} alt={from?.text} />
                {from?.text === "xDai" ? "Gnosis" : from?.text}
              </div>
            </div>
            <div className="success-info-item">
              <div className="info-item-label">Departure Address</div>
              <div className="success-hash">
                {address
                  ? `${address.substring(
                      0,
                      getSubstringValue() || 10
                    )}...${address.substring(address.length - 6)}`
                  : ""}
              </div>
            </div>
            <div className="success-info-item">
              <div className="info-item-label">Sent To</div>
              <div className="info-item-chain">
                <img src={to?.image?.src} alt={to?.text} />
                {to?.text === "xDai" ? "Gnosis" : to?.text}
              </div>
            </div>
            <div className="success-info-item">
              <div className="info-item-label">Destination address</div>
              <div className="success-hash">
                {receiver
                  ? `${receiver.substring(
                      0,
                      getSubstringValue() || 10
                    )}...${receiver.substring(receiver.length - 6)}`
                  : "test"}
              </div>
            </div>
          </div>
          <div className="success-info-box">
            <div className="info-item-label">
              Sent NFT / {selectedNFTList?.length || "8"}
            </div>
            <div className="success-nft-info">
              {selectedNFTList.length
                ? selectedNFTList.map((nft, index) => (
                    <TransferredNft
                      key={`index-${index}-nft-success`}
                      nft={nft}
                    />
                  ))
                : ""}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}