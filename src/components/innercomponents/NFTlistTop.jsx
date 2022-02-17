import React, { useEffect, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import BSC from "../../assets/img/chain/Binance.svg";
import Search from "../../assets/img/icons/Search.svg";
import ListView from "../../assets/img/icons/ListView.svg";
import GridView from "../../assets/img/icons/GridView.svg";
import { ReactComponent as SearchComp } from "../../assets/img/icons/Search.svg";
import { ReactComponent as ListViewComp } from "../../assets/img/icons/ListView.svg";
import { ReactComponent as GridViewComp } from "../../assets/img/icons/GridView.svg";

import { useDispatch } from "react-redux";
import {
  setSearchNFTList,
  allSelected,
  setNFTsListView,
  setTo,
  setSwitchDestination,
  cleanSelectedNFTList,
} from "../../store/reducers/generalSlice";
import { useSelector } from "react-redux";
import SelectDestination from "../SelectDestination";
import NFTChainListBox from "../NFTChainListBox";
import Close from "../../assets/img/icons/close.svg";
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import { setNFTS } from "../../wallet/helpers";
import Refresh from "../../assets/img/refresh.svg";
import { ReactComponent as RefreshComp } from "../../assets/img/refresh.svg";
function NFTlistTop() {
  const widget = new URLSearchParams(window.location.search).get("widget");
  const dispatch = useDispatch();
  const nfts = useSelector((state) => state.general.NFTList);
  const {
    algorandAccount,
    tronWallet,
    elrondAccount,
    tezosAccount,
    account,
    bigLoader,
  } = useSelector((state) => state.general);
  const selectedNFTs = useSelector((state) => state.general.selectedNFTList);
  const NFTListView = useSelector((state) => state.general.NFTListView);
  const OFF = { opacity: 0.6, pointerEvents: "none" };
  const from = useSelector((state) => state.general.from);
  const switchDestination = useSelector(
    (state) => state.general.switchDestination
  );
  const search = useSelector((state) => state.general.NFTListSearch);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    dispatch(setSearchNFTList(e.target.value));
  };

  const handleClose = () => {
    dispatch(setSwitchDestination(false));
  };

  const handleView = () => {
    dispatch(setNFTsListView());
  };
  const refresh = async () => {
    if (!bigLoader || !nfts) {
      let w;
      if (from.type === "EVM") w = account;
      else if (from.type === "Tezos") w = tezosAccount;
      else if (from.type === "Algorand") w = algorandAccount;
      else if (from.type === "Elrond") w = elrondAccount;
      else if (from.type === "Tron") w = tronWallet;
      await setNFTS(w, from.key);
    }
  };

  const refreshStyle = {
    cursor: bigLoader ? "" : "pointer",
    opacity: bigLoader ? 0.6 : 1,
  };

  const off = { display: "none" };
  return (
    <>
      <div className="yourNft--mobile">
        <span className="yourNft__title">Your NFTs on </span>
        <div className="yourNft__chain">
          <span>
            <img
              style={{ width: "30px" }}
              src={from.image.src}
              alt="NFT Name"
            />{" "}
            {from.key === "xDai" ? "Gnosis Chain" : from.key}
          </span>
          <span style={refreshStyle} onClick={refresh}>
            {widget ? (
              <RefreshComp className="svgWidget" />
            ) : (
              <img className="refreshnfts" src={Refresh} />
            )}
          </span>
        </div>
      </div>
      <div className="nftListTop">
        <Modal
          animation={false}
          show={switchDestination}
          onHide={() => handleClose()}
          className="ChainModal"
        >
          <Modal.Header className="text-left">
            <Modal.Title>Change destination chain</Modal.Title>
            <span className="CloseModal" onClick={() => handleClose()}>
              {widget ? (
                <CloseComp className="svgWidget" />
              ) : (
                <img src={Close} alt="" />
              )}
            </span>
          </Modal.Header>
          <Modal.Body>
            <NFTChainListBox />
          </Modal.Body>
        </Modal>
        <div className="yourNft desktopOnly">
          Your NFTs on{" "}
          <span>
            <img
              style={{ width: "29px" }}
              src={from.image.src}
              alt="NFT Name"
            />{" "}
            {from.key === "xDai" ? "Gnosis Chain" : from.key}
          </span>
          <span style={refreshStyle} onClick={refresh}>
            {widget ? (
              <RefreshComp className="svgWidget" />
            ) : (
              <img className="refreshnfts" src={Refresh} />
            )}
          </span>
        </div>
        <div className="mobileOnly seleNftMob">
          Selected <span>{`/ ${nfts ? nfts.length : ""} `}</span>
        </div>
        <div className="nftTopRIght">
          <div className="searchNft desktopOnly">
            <Dropdown className="SearchDrop">
              <Dropdown.Toggle id="SearchDrop">
                {widget ? (
                  <SearchComp className="svgWidget" />
                ) : (
                  <img src={Search} />
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <form action="#">
                  <input
                    onChange={(e) => handleSearch(e)}
                    type="text"
                    placeholder="Search NFT"
                  />
                  {/* { search ?  <button type="button"><img src={Close} alt="" /></button> : <button type="button"><img src={Search} alt=""/></button>} */}
                  <button type="button">
                    {widget ? (
                      <SearchComp className="svgWidget" />
                    ) : (
                      <img src={Search} />
                    )}
                  </button>
                </form>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div onClick={() => handleView()} className="ListView">
            {NFTListView ? (
              <span>
                {widget ? (
                  <GridViewComp className="svgWidget" />
                ) : (
                  <img src={GridView} />
                )}
              </span>
            ) : (
              <span>
                {widget ? (
                  <ListViewComp className="svgWidget" />
                ) : (
                  <img src={ListView} />
                )}
              </span>
            )}
          </div>
          {/* <span onClick={() => setShowSearch(prev => prev = !prev)} className="mobileOnly search-btn"><img src={Search} /></span> */}
          {nfts?.length === selectedNFTs?.length ? (
            <div
              onClick={() => dispatch(cleanSelectedNFTList())}
              className="selectAll"
            >
              Clear all
            </div>
          ) : (
            <div
              style={nfts ? {} : OFF}
              onClick={() => dispatch(allSelected())}
              className="selectAll"
            >
              Select all
            </div>
          )}
        </div>
        {/* !!! Show on click */}
        <div style={!showSearch ? {} : off} className="mobileOnly mobSearch">
          <form action="#">
            <input
              type="search"
              placeholder="Search NFT"
              onChange={(e) => handleSearch(e)}
            />
            <button type="button">
              {widget ? (
                <SearchComp className="svgWidget" />
              ) : (
                <img src={Search} />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NFTlistTop;
