import React, { useEffect } from "react";
import Close from "../../assets/img/icons/close.svg";
import Back from "../../assets/img/icons/Back.svg";
import { useSelector } from "react-redux";
import {
  cleanSelectedNFTList,
  removeFromSelectedNFTList,
} from "../../store/reducers/generalSlice";
import { useDispatch } from "react-redux";
import ListedView from "../NFT/ListedView"
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import { ReactComponent as BackComp } from "../../assets/img/icons/Back.svg";

function SelectedNFT() {
  const dispatch = useDispatch();
  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
  const nfts = useSelector((state) => state.general.NFTList);
  const widget = useSelector((state) => state.general.widget);
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const handleClear = () => {
    dispatch(cleanSelectedNFTList());
  };

  const handleRemove = (nft) => {
    dispatch(removeFromSelectedNFTList(nft));
  };

  useEffect(() => {}, [selectedNFTs]);

  return (
    <div className="selected-nfts-list">
      <div className="selected-nfts__header">
          {/* <a className="backBtn mobileOnly">
            {widget ? (
              <BackComp className="svgWidget" />
            ) : (
              <img src={Back} alt="Back" />
            )}
          </a> */}
          {/* <span className="mobileOnly">Selected NFTs</span> */}
          <span className="desktop__header">
            Selected NFTs{" "}
            <span>
              {selectedNFTs.length} / {nfts?.length}
            </span>
          </span>
          <div
            style={selectedNFTs.length ? {} : OFF}
            onClick={() => handleClear()}
            className="clear-selected"
          >
            Clear all
          </div>

      </div>
      <ul className="selected-nfts__body">
        {selectedNFTs
          ? selectedNFTs.map((nft, index) => (
              <li
                key={`selected-nft-${index}`}
                onClick={() => handleRemove(nft)}
                className="selected-nfts-item"
              >
                <ListedView nft={nft} key={`nft-n-${index}`} />
                <span className="nfts-item__name">
                  {nft.data?.name || nft.name || nft.native.name}
                </span>
                <span className="selected-nfts__delete">
                  {widget ? (
                    <CloseComp className="svgWidget" />
                  ) : (
                    <img alt="" src={Close} />
                  )}
                </span>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}

export default SelectedNFT;
