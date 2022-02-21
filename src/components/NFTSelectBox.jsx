import React, { useState } from "react";
import Departure from "../assets/img/nftSelect/departure.svg";
import Destination from "../assets/img/nftSelect/destination.svg";
import LineArrow from "../assets/img/nftSelect/Line.svg";
import ChainArrow from "../assets/img/icons/Swap.svg";
import SwapHover from "../assets/img/icons/SwapHover.svg";
import SwapPressed from "../assets/img/icons/SwapPressed.svg";
import { useDispatch } from "react-redux";
import {
  setChainModal,
  setDepartureOrDestination,
  setTo,
  setFrom,
} from "../store/reducers/generalSlice";
import { useSelector } from "react-redux";
import SelectDeparture from "./SetDeparture";
import { Image, Modal, Button, Header, Title, Body } from "react-bootstrap";
import SetDeparture from "./SetDeparture";
import SetDestination from "./SetDestination";

import { ReactComponent as LineArrowComp } from "../assets/img/nftSelect/Line.svg";
import { ReactComponent as ChainArrowComp } from "../assets/img/icons/Swap.svg";

export default function NFTSelectBox() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from);
  const to = useSelector((state) => state.general.to);
  const widget = useSelector((state) => state.general.widget);
  const [swapHover, setSwapHover] = useState();
  const [swapDown, setSwapDown] = useState();

  // const handleShow = (str) => {
  //     dispatch(setChainModal(true));
  //     str === "departure" ? dispatch(setDepartureOrDestination("departure")) : dispatch(setDepartureOrDestination("destination"))
  // }

  const switchChains = (e) => {
    e.preventDefault();
    const temp = to;
    dispatch(setTo(from));
    dispatch(setFrom(temp));
  };

  return (
    <div className="nftSelectBox">
      {/* <div className="selChain seleDepat" onClick={() => handleShow("departure")}>
            { from ? 
                <div className="seleDepatSelec">
                    <img src={ from.image.src } alt="" />{from.text === "xDai" ? "Gnosis Chain" : from.text}
                </div>
                :
                <div className="seleDepatSelec">
                    <img src={ Departure } alt="" />Select departure chain
                </div>
            }
        </div> */}
      <SetDeparture />
      {from && to ? (
        <span
          onMouseDown={() => setSwapDown(true)}
          onMouseUp={() => setSwapDown(false)}
          onMouseOut={() => setSwapHover(false)}
          onMouseOver={() => setSwapHover((prev) => !prev)}
          onClick={(e) => switchChains(e)}
          className="chainArrow"
        >
          {widget ? (
            <ChainArrowComp className="svgWidget swpBtn" />
          ) : (
            <img
              src={swapDown ? SwapPressed : swapHover ? SwapHover : ChainArrow}
              alt=""
            />
          )}
        </span>
      ) : (
        <span className="chainArrow">
          {widget ? (
            <ChainArrowComp className="svgWidget swpBtn" />
          ) : (
            <img src={ChainArrow} alt="arrow-swap" />
          )}
        </span>
      )}
      <span className="LineArrow">
        {widget ? (
          <LineArrowComp className="svgWidget lineArrow" />
        ) : (
          <img src={LineArrow} alt="" />
        )}
      </span>
      <SetDestination />
      {/* <div className="selChain seleDesti" onClick={() => handleShow("destination")}>
            { to ?
                <div className="seleDestiSele">
                    <img  style={{width: "28px"}} src={ to.image.src } alt="" />{to.text === "xDai" ? "Gnosis Chain" : to.text}
                </div>
                :
                <div className="seleDestiSele">
                    <img  style={{width: "28px"}} src={ Destination } alt="" />Select destination chain
                </div>
            }
        </div> */}
    </div>
  );
}
