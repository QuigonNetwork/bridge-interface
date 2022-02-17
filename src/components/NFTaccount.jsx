import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DestinationChain from "./innercomponents/DestinationChain";
import DestinationChainReload from "./innercomponents/DestinationChainReload";
import SelectedNFT from "./innercomponents/SelectedNFT";
import Approval from "./innercomponents/Approval";
import NFTgridView from "./innercomponents/NFTgridView";
import NFTlistView from "./innercomponents/NFTlistView";
import SendFees from "./innercomponents/SendFees";
import NFTlistTop from "./innercomponents/NFTlistTop";
import { useSelector } from "react-redux";
import { setError } from "../store/reducers/generalSlice";
import { useDispatch } from "react-redux";
import ButtonToTransfer from "./innercomponents/ButtonToTransfer";
import { setNFTS } from "../wallet/helpers";
import Comment from "../components/innercomponents/Comment";
// import MyAlgoConnect from '@randlabs/myalgo-connect';
// import { algoConnector } from "../wallet/connectors"
// import BigNumber from 'bignumber.js'
// import { ethers } from "ethers";
// import {chainsConfig, CHAIN_INFO} from './values'
// import { ExtensionProvider } from '@elrondnetwork/erdjs/out';
// import { useWeb3React } from '@web3-react/core';
// import { TempleWallet } from "@temple-wallet/dapp";
// import { BeaconWallet } from "@taquito/beacon-wallet";
// import TransferButton from '../components/innercomponents/TransferButton';

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
  const testnet = useSelector((state) => state.general.testNet);

  // const [loading, setLoading] = useState()
  // const to = useSelector(state => state.general.to.key)
  // const kukaiWallet = useSelector(state => state.general.kukaiWallet)
  // const maiarProvider = useSelector(state => state.general.maiarProvider)
  // const selectedNFTList = useSelector(state => state.general.selectedNFTList)
  // const receiver = useSelector(state => state.general.receiver)
  // const approved = useSelector(state => state.general.approved)
  // const bigNumberFees = useSelector(state => state.general.bigNumberFees)
  // const algorandWallet = useSelector(state => state.general.AlgorandWallet)
  // const MyAlgo = useSelector(state => state.general.MyAlgo)
  // const [fees, setFees] = useState(0)
  // const factory = getFactory()
  // const isToEVM = useSelector(state => state.general.to).type === 'EVM'
  // const approvedNFTList = useSelector(state => state.general.approvedNFTList)
  // const Web3Utils = require("web3-utils");
  // const [estimateInterval, setEstimateInterval] = useState()
  // const onMaiar = useSelector(state => state.general.onMaiar)
  // const modalError = useSelector(state => state.general.error)
  // const WCProvider = useSelector(state => state.general.WCProvider)
  // const { library } = useWeb3React()

  // const getAlgorandWalletSigner = async () => {
  //     const base = new MyAlgoConnect();
  //     if( algorandWallet ){
  //         try {
  //             const factory = await getFactory()
  //             const inner = await factory.inner(15)
  //             const signer = await inner.walletConnectSigner(algoConnector, algorandAccount)
  //             return signer
  //         } catch (error) {
  //             console.log(error.data ? error.data.message : error.data ? error.data.message : error.message);
  //         }
  //     }
  //     else if(MyAlgo){
  //         const factory = await getFactory()
  //         const inner = await factory.inner(15)
  //         const signer = inner.myAlgoSigner(base, algorandAccount)
  //         return signer
  //     }
  //     else{
  //         const signer = {
  //             address: algorandAccount,
  //             algoSigner: window.AlgoSigner,
  //             ledger: "MainNet"
  //         }
  //         return signer
  //     }
  // }

  async function getNFTsList() {
    const useHardcoded = false;
    const hard = "0x47Bf0dae6e92e49a3c95e5b0c71422891D5cd4FE";
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
      await setNFTS(w, from, testnet);
    } catch (error) {
      dispatch(setError(error.data ? error.data.message : error.message));
    }
  }

  //! Estimate moved to SendFees component
  // async function estimate () {
  //     // debugger
  //     let fact
  //     let fee
  //     try {
  //         const fromChain = await handleChainFactory(from)
  //         const toChain = await handleChainFactory(to)
  //         const wallet =
  //         to ==='Tron' ? 'TCCKoPRcYoCGkxVThCaY9vRPaKiTjE4x1C'
  //         : from === 'Tron' && isToEVM ? '0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6'
  //         : from === 'Algorand' && isToEVM ? '0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6'
  //         : from === 'Elrond' && isToEVM ? '0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6'
  //         : from === 'Tezos' && isToEVM ? '0x5fbc2F7B45155CbE713EAa9133Dd0e88D74126f6'
  //         : account;

  //         fact = await getFactory()
  //         if(selectedNFTList.length) {
  //             if(to ==='Tron'){
  //                fee = from === 'BSC' ? new BigNumber('100000000000000000')
  //                 : from === 'Polygon' ? new BigNumber('23200000000000000000')
  //                 : from === 'Ethereum' ? new BigNumber('14952490000000000')
  //                 : from === 'Algorand' ? new BigNumber('32160950300000000000')
  //                 : from === 'Elrond' ? new BigNumber('239344350000000000')
  //                 : from === 'Avalanche' ? new BigNumber('529683610000000000')
  //                 : from === 'xDai' ? new BigNumber('56645012600000000000')
  //                 : from === 'Fuse' ? new BigNumber('95352570490000000000')
  //                 : ''
  //             }
  //             else{
  //                 try {
  //                    fee = await fact.estimateFees(fromChain, toChain, selectedNFTList[0], wallet)
  //                 } catch (error) {
  //                     console.error(error);
  //                 }
  //             }
  //         }

  //         const bigNum = fee ? fee.multipliedBy(1.1).integerValue().toString(10) : undefined
  //         dispatch(setBigNumFees(bigNum))
  //         const fees =  await Web3Utils.fromWei(bigNum, "ether")
  //         setFees(fees)
  //     } catch (error) {
  //       console.log(error.data ? error.data.message : error.message);
  //     //   dispatch(setError(error))
  //     }
  // }

  //! All sending function moved to ButtonToTransfer component
  // const getSigner = async () => {
  //     // debugger
  //     let signer
  //     try {
  //         if(from === "Tezos"){
  //             if(kukaiWallet){
  //                 signer = new BeaconWallet({ name: "XP.NETWORK Cross-Chain NFT Bridge" })
  //                 return signer
  //             }
  //             else{
  //                 signer = new TempleWallet("XP.NETWORK Cross-Chain NFT Bridge");
  //                 await signer.connect("mainnet");
  //                 return signer
  //             }
  //         }
  //         else if(from === "Algorand"){
  //             signer = await getAlgorandWalletSigner()
  //             return signer
  //         }
  //         else if(from === 'Elrond') return maiarProvider || ExtensionProvider.getInstance()
  //         else{
  //             const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : ''
  //             signer = provider.getSigner(account)
  //             return signer
  //         }
  //     } catch (error) {
  //         console.error(error)
  //         return
  //     }
  // }

  // const sendEach = async (nft, index) => {
  //     debugger
  //     const signer = await getSigner()
  //     const nonce = CHAIN_INFO[to].nonce
  //     const nftSmartContract = nft.native.contract
  //     let factory
  //     let toChain
  //     let fromChain
  //     let result
  //     try {
  //         if(from === "Tron"){
  //             factory = await getFactory()
  //             const contract = nftSmartContract.toLowerCase()
  //             const mintWidth = await factory.getVerifiedContracts(contract, nonce)
  //             toChain = await factory.inner(chainsConfig[to].Chain)
  //             fromChain = await factory.inner(chainsConfig[from].Chain)
  //             result = await factory.transferNft(
  //                 fromChain,
  //                 toChain,
  //                 nft,
  //                 undefined,
  //                 receiver,
  //                 bigNumberFees,
  //                 mintWidth?.length ? mintWidth[0] : undefined
  //             )
  //             dispatch(dispatch(setTransferLoaderModal(false)))
  //             setLoading(false)
  //             dispatch(setTxnHash({txn: result, nft}))
  //         }
  //         else{
  //             factory = await getFactory()
  //             const contract = nftSmartContract.toLowerCase()
  //             const mintWidth = await factory.getVerifiedContracts(contract, nonce)
  //             toChain = await factory.inner(chainsConfig[to].Chain)
  //             fromChain = await factory.inner(chainsConfig[from].Chain)
  //             result = await factory.transferNft(
  //                 fromChain,
  //                 toChain,
  //                 nft,
  //                 signer,
  //                 receiver,
  //                 bigNumberFees,
  //                 mintWidth?.length ? mintWidth[0] : undefined
  //             )
  //             dispatch(dispatch(setTransferLoaderModal(false)))
  //             setLoading(false)
  //             dispatch(setTxnHash({txn: result, nft}))
  //         }
  //         if(to === "Algorand") await setClaimablesAlgorand(algorandAccount)
  //     } catch (err) {
  //         console.error(err)
  //         console.log('this is error in sendeach')
  //         setLoading(false)
  //         dispatch(dispatch(setTransferLoaderModal(false)))
  //         const { data, message, error } = err
  //         if(message){
  //             if(
  //                 message.includes("NFT not whitelisted")
  //                 || message.includes('contract not whitelisted')
  //                 || (data ? data.message.includes('contract not whitelisted') : false )
  //             ){
  //                 dispatch(setNFTsToWhitelist({
  //                     url: nft.image,
  //                     name: nft.name
  //                 }))
  //             }
  //             else if(
  //                 message.includes('User cant pay the bills')
  //                 || (data ? data.message.includes('User cant pay the bills') : false )
  //             ) dispatch(setError(`You don't have enough funds to pay the fees`))
  //             else dispatch(setError(err.data ? err.data.message : err.message))
  //             return
  //         }
  //         else dispatch(setError(err.data ? err.data.message : err.message))
  //         return
  //     }
  // }

  // const sendAllNFTs = () => {
  //     if(!loading && approved) {
  //         setLoading(true)
  //         dispatch(setTransferLoaderModal(true))
  //         selectedNFTList.forEach( (nft, index) => {
  //             sendEach(nft, index)
  //         })
  //     }
  // }

  useEffect(async () => {
    await getNFTsList();
  }, []);

  useEffect(async () => {}, [nfts]);

  // ! Estimate moved to SendFees component
  // useEffect(() => {
  //     if(selectedNFTList.length > 0) estimate();
  //     else setFees("0")
  //     const s = setInterval(() => estimate(), 1000 * 30);
  //     setEstimateInterval(s)
  //     return () => clearInterval(s);
  // }, [selectedNFTList])

  // useEffect(() => {
  //     clearInterval(estimateInterval)
  //     estimate()
  //     const s = setInterval(() => estimate(), 1000 * 30);
  //     setEstimateInterval(s)
  //     return () => clearInterval(s)
  // }, [to])

  return (
    <div className="NFTaccount">
      <Container className="nftSlectContaine">
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
            <div className="mobileOnly">
              <Approval getNft={getNFTsList} />
              <div className="nftSendBtn disenable">
                <SendFees />
                <ButtonToTransfer />
                {/* <div onClick={sendAllNFTs} className={approved && receiver && !loading ? 'nftSendBtn' : 'nftSendBtn disabled'}  >
                                <a  className="themBtn">
                                    {loading ? 'Processing' : 'Send' }
                                </a>
                            </div> */}
              </div>
            </div>
          </div>
          <div className="sendNftCol col-lg-4 desktopOnly">
            <div className="sendNftBox">
              <form action="#">
                <div className="sendNftTit">
                  <h3>Send NFT</h3>
                </div>
                <DestinationChain />
                {nfts?.length ? (
                  <>
                    <SelectedNFT />
                    <Approval />
                    <SendFees />
                    <ButtonToTransfer />
                    {/* <div 
                                        onClick={sendAllNFTs} className={approved && receiver && !loading ? 'nftSendBtn' : 'nftSendBtn disabled'}  >
                                            <a  className="themBtn">
                                                {loading ? 'Processing' : 'Send' }
                                            </a>
                                        </div> */}
                  </>
                ) : (
                  <Comment />
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NFTaccount;
