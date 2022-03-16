import { useEffect } from "react";
import { Container } from "react-bootstrap";
import DestinationChainReload from "../../components/innercomponents/DestinationChainReload";
import NFTgridView from "../NFT/NFTgridView";
import NFTlistView from "../NFT/NFTlistView";
import NFTlistTop from "./NFTlistTop";
import { setError } from "../../store/reducers/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setNFTS } from "../../wallet/helpers";
import { ReturnBtn } from "../Settings/returnBtn";
import DesktopTransferBoard from "../TransferBoard/DesktopTransferBoard";
import MobileTransferBoard from "../TransferBoard/MobileTransferBoard";
import "./NFTsBoard.css"

function NFTaccount() {
  const dispatch = useDispatch();
  const from = useSelector((state) => state.general.from.key);
  const type = useSelector((state) => state.general.from.type);
  const algorandAccount = useSelector((s) => s.general.algorandAccount);
  const NFTListView = useSelector((state) => state.general.NFTListView);
  const nfts = useSelector((state) => state.general.NFTList);
  const tronWallet = useSelector((state) => state.general.tronWallet);
  const account = useSelector((state) => state.general.account);
  const tezosAccount = useSelector((state) => state.general.tezosAccount);
  const elrondAccount = useSelector((state) => state.general.elrondAccount);


  async function getNFTsList() {
    const useHardcoded = false;
    const hard = "0x889B683a17942d093d796c815d32c253145FE87a";
    try {
      const w = useHardcoded
        ? hard
        : type === "EVM"
        ? account
        : type === "Tezos"
        ? tezosAccount
        : type === "Algorand"
        ? algorandAccount
        : type === "Elrond"
        ? elrondAccount
        : type === "Tron"
        ? tronWallet
        : undefined;
      await setNFTS(w, from);
    } catch (error) {
      dispatch(setError(error.data ? error.data.message : error.message));
    }
  }

  useEffect(async () => {
    await getNFTsList();
  }, []);
  
  useEffect(async () => {}, [nfts]);

  return (
    <div className="NFTaccount">
      <Container className="nftSlectContaine">
        <ReturnBtn />
        <div className="row">
          <div className="nftListCol col-lg-8">
            <div className="mobileOnly">
              <div className="sendNftTit">
                <h3>Send NFT</h3>
              </div>
              <DestinationChainReload />
            </div>
            <div className="nft_selectBox">
              <NFTlistTop />
              {NFTListView ? <NFTlistView /> : <NFTgridView />}
            </div>
            <MobileTransferBoard />
          </div>
          <DesktopTransferBoard />
        </div>
      </Container>
    </div>
  );
}

export default NFTaccount;