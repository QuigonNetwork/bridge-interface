import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RedClose from "../../assets/img/icons/RedClose.svg";
import {
  setReceiver,
  setSwitchDestination,
} from "../../store/reducers/generalSlice";
import ChainSwitch from "../Buttons/ChainSwitch";
// import vet from "../../assets/img/Vector.svg";
// import { ReactComponent as Vet } from "../../assets/img/Vector.svg";

function DestinationChain() {
  const to = useSelector((state) => state.general.to);
  const { widget } = useSelector(({ general: { widget } }) => ({
    widget,
  }));

  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.general.receiver);

  const handleChange = (e) => {
    dispatch(setReceiver(e.target.value));
  };

  function handleSwitchChain() {
    dispatch(setSwitchDestination(true));
  }

  useEffect(() => {}, [to]);

  return (
    <div className="destination-props">
      <div className="destination__header">
        <span className="destination__title">Destination</span>
        <ChainSwitch assignment={"to"} func={handleSwitchChain} />
      </div>

      <div className="destination__address">
        <input
          value={receiver}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Paste destination address"
        />
        <span className="invalid">
          <img src={RedClose} alt="Close" /> Invalid address
        </span>
      </div>
    </div>
  );
}

export default DestinationChain;
