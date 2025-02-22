import Ethereum from "../assets/img/chain/Etherium.svg";
import Ton from "../assets/img/chain/ton.svg";
import Elrond from "../assets/img/chain/multiverseX.png";
import Binance from "../assets/img/chain/Binance.svg";
import Cardano from "../assets/img/chain/Cardano.svg";
import Algorand from "../assets/img/chain/Algarand.svg";
import Tron from "../assets/img/chain/Tron.svg";
import Polygon from "../assets/img/chain/Polygon.svg";
import Avalanche from "../assets/img/chain/Avalanche.svg";
import Fantom from "../assets/img/chain/Fantom.svg";
import Gnosis from "../assets/img/chain/Gnosis.png";
import Solana from "../assets/img/chain/Solana.svg";
import Fuse from "../assets/img/chain/Fuse.svg";
import Velas from "../assets/img/chain/velas.svg";
import Tezos from "../assets/img/chain/Tezos.svg";
import Iotex from "../assets/img/chain/iotx.svg";
import One from "../assets/img/chain/One.svg";
import Aurora from "../assets/img/chain/aurora.svg";
import GT from "../assets/img/chain/GateChain.svg";
import VET from "../assets/img/chain/Vechain.png";
import SCRT from "../assets/img/chain/secret.svg";
import CKB from "../assets/img/chain/godwoken.svg";
import HBAR from "../assets/img/chain/Hedera.svg";
import SKL from "../assets/img/chain/SFUEL.svg";
import Moon from "../assets/img/chain/Moonbeam.svg";
import Abey from "../assets/img/chain/Abey.svg";
import Caduceus from "../assets/img/chain/caduceus.svg";
import Aptos from "../assets/img/chain/aptos.svg";
import InternetComputer from "../assets/img/chain/InternetComputer.svg";
import near from "../assets/img/wallet/NearWallet.svg";
import okx from "../assets/img/chain/okx.svg";
import arbitrum from "../assets/img/chain/arbitrum.svg";
import arbitrumTestNet from "../assets/img/chain/arbitrumTN.svg";
import brise from "../assets/img/chain/brise.png";
import casper from "../assets/img/chain/casper.svg";
import optimism from "../assets/img/chain/optimism.svg";
import zeta from "../assets/img/chain/zeta.svg";
import Energi from "../assets/img/chain/NRG.svg";
import Base from "../assets/img/chain/base.svg";
import Findora from "../assets/img/chain/Findora_Symbol.svg";

export const bridgeUrl = "https://bridge.walletconnect.org";

export const EVM = "EVM";
export const ELROND = "MultiversX";
export const TEZOS = "TEZOS";

export const stagingWNFT = "https://staging-nft.xp.network";
export const wnft = ["https://wnfts.xp.network", "https://nft.xp.network"];
export const cacheService = "https://nft-cache.xp.network/";

export const wnftPattern = /(\S+xp\.network)/;

//testnet in any bucket
export const isTestnet = /testnet/.test(window.location.pathname);

//if on https://dev.bridge.xp.network/ domain
export const dev = /(localhost|dev|10\.0\.0|trycloudflare)/.test(
    window.location.hostname
);
//if on https://staging.bridge.xp.network/  or https://dev.bridge.xp.network/ domains
export const biz = dev || /(staging)/.test(window.location.hostname);

//v3 bridge activation (currenly workig only for BSC, Multiversx, Polygon in testnet)
export const v3_bridge_mode = true;

export const BridgeModes = {
    Staging: "staging",
    TestNet: "testnet",
    CheckWallet: "checkWallet",
};

export const sockets = {
    mainnet: "wss://explorer-app.xp.network::/ws", //"wss://dev-explorer-api.herokuapp.com", //wss://dest-scraper.herokuapp.com/
    staging: "https://staging-tx-socket-925db65784a7.herokuapp.com/",
    testnet: "wss://tools.xp.network::/testnet-explorer/ws", //"https://testnet-tx-socket.herokuapp.com/", //"wss://testnet-bridge-explorer.herokuapp.com/",
};

export const getChainObject = (nonce) =>
    chains.find((chain) => chain.nonce === nonce);

export const secretnodes = "https://secretnodes.com/secret/accounts";
export const proxy = "https://sheltered-crag-76748.herokuapp.com/";
export const tonAuth = "tonkeeper.xp.network";

export const chains = [
    {
        type: "EVM",
        key: "Ethereum",
        text: "Ethereum",
        value: "Ethereum",
        wagmi: "mainnet",
        nonce: 5,
        chainId: 1,
        tnChainId: 11155111,
        order: -6,
        image: { avatar: true, src: Ethereum },
        maintenance: false,
        testNet: false,
        mainnet: false,
    },
    {
        type: "EVM",
        key: "BSC",
        text: "BSC",
        value: "BSC",
        nonce: 4,
        chainId: 56,
        tnChainId: 97,
        order: 2,
        image: { avatar: true, src: Binance },
        maintenance: false,
        //maintenanceTo: !biz,
        testNet: false,
        mainnet: false,
    },
    {
        type: "Tron",
        key: "Tron",
        text: "Tron",
        value: "Tron",
        nonce: 9,
        order: 12,
        image: { avatar: true, src: Tron },
        maintenance: false,
        testNet: true,
        mainnet: true,
        updated: false,
    },
    {
        type: "Elrond",
        key: "Elrond",
        text: ELROND,
        value: "Elrond",
        nonce: 2,
        order: 15,
        image: { avatar: true, src: Elrond },
        maintenance: false,
        testNet: false,
        mainnet: false,
    },
    {
        type: "EVM",
        key: "Polygon",
        text: "Polygon",
        value: "Polygon",
        nonce: 7,
        chainId: 137,
        tnChainId: 80002, //* This is the amoy testnet chain id
        order: 3,
        image: { avatar: true, src: Polygon },
        maintenance: false,
        testNet: false,
        mainnet: false,
    },
    {
        type: "EVM",
        key: "Avalanche",
        text: "Avalanche",
        value: "Avalanche",
        nonce: 6,
        chainId: 43114,
        tnChainId: 43113,
        order: 11,
        image: { avatar: true, src: Avalanche },
        maintenance: false,
        testNet: false,
        mainnet: false,
    },
    {
        type: "EVM",
        key: "Fantom",
        text: "Fantom",
        value: "Fantom",
        nonce: 8,
        chainId: 250,
        order: 16,
        image: { avatar: true, src: Fantom },
        maintenance: false,
        testNet: false,
        mainnet: false,
    },
    {
        type: "Algorand",
        key: "Algorand",
        text: "Algorand",
        value: "Algorand",
        nonce: 15,
        order: 13,
        image: { avatar: true, src: Algorand },
        maintenance: false,
        testNet: true,
        mainnet: true,
        updated: false,
    },
    {
        type: "EVM",
        key: "xDAI",
        wagmi: "gnosis",
        text: "Gnosis",
        value: "xDAI",
        nonce: 14,
        chainId: 100,
        order: 17,
        image: { avatar: true, src: Gnosis },
        maintenance: false,
        testNet: false,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Energi",
        text: "Energi",
        value: "Energi",
        nonce: 42,
        chainId: 39797,
        tnChainId: 49797,
        order: -4,
        image: { avatar: true, src: Energi },
        maintenance: false,
        testNet: biz,
        mainnet: false,
        newChain: false,
    },
    {
        type: "Solana",
        key: "Solana",
        text: "Solana",
        value: "Solana",
        chainId: undefined,
        order: -2,
        nonce: 26,
        coming: false,
        image: { avatar: true, src: Solana },
        maintenance: false,
        testNet: true,
        mainnet: true,
        newChain: true,
    },
    {
        type: "",
        key: "Cardano",
        text: "Cardano",
        value: "Cardano",

        order: -2,

        image: { avatar: true, src: Cardano },
        testNet: false,
        mainnet: false,
        coming: true,
        newChain: false,
        //chainId: ,
        //tnChainId: ,
    },
    {
        type: "TON",
        key: "TON",
        text: "TON",
        value: "TON",
        chainId: undefined,
        order: -1,
        nonce: 27,
        coming: false,
        image: { avatar: true, src: Ton },
        maintenance: false,
        testNet: false,
        mainnet: false,
        newChain: true,
    },
    {
        type: "EVM",
        key: "Fuse",
        text: "Fuse",
        value: "Fuse",
        nonce: 16,
        chainId: 122,
        order: 21,
        image: { avatar: true, src: Fuse },
        maintenance: false,
        testNet: false,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Velas",
        text: "Velas",
        value: "Velas",
        nonce: 19,
        chainId: 106,
        tnChainId: 0x6f,
        order: 20,
        image: { avatar: true, src: Velas },
        newChain: false,
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "Tezos",
        key: "Tezos",
        text: "Tezos",
        value: "Tezos",
        nonce: 18,
        order: 12,
        image: { avatar: true, src: Tezos },
        newChain: false,
        coming: false,
        maintenance: false,
        testNet: false,
        mainnet: false,
    },
    {
        type: "EVM",
        key: "Iotex",
        text: "Iotex",
        value: "Iotex",
        nonce: 20,
        chainId: 4689,
        tnChainId: 0x1252,
        order: 20,
        image: { avatar: true, src: Iotex },
        coming: false,
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Harmony",
        text: "Harmony",
        value: "Harmony",
        wagmi: "harmonyOne",
        nonce: 12,
        chainId: 1666600000,
        tnChainId: 1666700000,
        order: 6,
        image: { avatar: true, src: One },
        maintenance: false,
        testNet: false,
        mainnet: false,
    },
    {
        type: "EVM",
        key: "Aurora",
        text: "Aurora",
        value: "Aurora",
        nonce: 21,
        chainId: 1313161554,
        tnChainId: 1313161555,
        order: 7,
        image: { avatar: true, src: Aurora },
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Godwoken",
        text: "Godwoken",
        value: "Godwoken",
        nonce: 22,
        chainId: 71402,
        tnChainId: 71401,
        order: 4,
        image: { avatar: true, src: CKB },
        maintenance: false,
        testNet: true,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "GateChain",
        text: "GateChain",
        value: "GateChain",
        nonce: 23,
        tnChainId: 85,
        chainId: 86,
        order: 19,
        image: { avatar: true, src: GT },
        maintenance: false,
        testNet: false,
        mainnet: true,
    },
    {
        type: "EVM",
        key: "Moonbeam",
        text: "Moonbeam",
        value: "Moonbeam",
        nonce: 32,
        order: 3,
        chainId: 1284,
        tnChainId: 1287,
        image: { avatar: true, src: Moon },
        testNet: false,
        mainnet: false,
    },
    {
        type: "EVM",
        key: "Abeychain",
        text: "ABEY",
        value: "Abeychain",
        nonce: 33,
        order: 54,
        chainId: 179,
        tnChainId: 178,
        image: { avatar: true, src: Abey },
        testNet: true,
        mainnet: true,
        newChain: false,
        coming: false,
    },
    {
        type: "VeChain",
        key: "VeChain",
        text: "VeChain",
        value: "VeChain",
        nonce: 25,
        tnChainId: 39,
        chainId: undefined,
        order: 5,
        image: { avatar: true, src: VET },
        maintenance: false,
        mainnet: false,
        testNet: false,
    },
    {
        type: "Cosmos",
        key: "Secret",
        text: "Secret",
        value: "Secret",
        nonce: 24,
        order: -3,
        tnChainId: "pulsar-2",
        chainId: "secret-4",
        image: { avatar: true, src: SCRT },
        mainnet: false,
        testNet: false,
        test: false,
        newChain: false,
        coming: false,
    },
    {
        type: "Hedera",
        key: "Hedera",
        text: "Hedera",
        nonce: 29,
        order: -6,
        image: { avatar: true, src: HBAR },
        testNet: false,
        mainnet: false,
        newChain: true,
        coming: false,
        chainId: 295,
        tnChainId: 296,
    },
    {
        type: "EVM",
        key: "Skale",
        text: "SKALE",
        nonce: 30,
        order: 3,
        chainId: 1564830818,
        tnChainId: 344106930,
        image: { avatar: true, src: SKL },
        testNet: true,
        mainnet: true,
        newChain: false,
    },
    {
        type: "EVM",
        key: "Caduceus",
        text: "Caduceus",
        value: "Caduceus",
        nonce: 35,
        order: 6,
        chainId: 256256,
        tnChainId: 512512,
        image: { avatar: true, src: Caduceus },
        testNet: true,
        mainnet: true,
        newChain: false,
    },
    {
        type: "ICP",
        key: "ICP",
        text: "ICP",
        nonce: 28,
        order: -7,
        // chainId: 1564830818,
        //tnChainId: 1305754875840118,
        image: { avatar: true, src: InternetComputer },
        testNet: false,
        mainnet: false,
        newChain: false,
        coming: false,
    },
    {
        type: "APTOS",
        key: "Aptos",
        text: "Aptos",
        nonce: 0x22,
        order: 0,
        image: { avatar: true, src: Aptos },
        testNet: biz,
        mainnet: biz,
        coming: !biz,
    },
    {
        type: "NEAR",
        key: "NEAR",
        text: "NEAR",
        value: "NEAR",
        nonce: 31,
        order: -4,
        image: { avatar: true, src: near },
        testNet: false,
        mainnet: false,
        newChain: true,
        coming: false,
    },
    {
        type: "EVM",
        key: "OKC",
        text: "OKC",
        value: "OKC",
        nonce: 0x24,
        order: 5,
        image: { avatar: true, src: okx },
        testNet: true,
        mainnet: true,
        coming: false,
        newChain: false,
        chainId: 66,
        tnChainId: 65,
    },
    {
        type: "EVM",
        key: "Arbitrum",
        text: window.location.href.includes("testnet")
            ? "Arbitrum"
            : "Arbitrum Nova",
        value: "Arbitrum",
        nonce: 0x25,
        order: 4,
        image: {
            avatar: true,
            src: window.location.href.includes("testnet")
                ? arbitrumTestNet
                : arbitrum,
        },
        testNet: true,
        mainnet: true,
        coming: false,
        newChain: false,
        chainId: 42170,
        tnChainId: 421613,
    },
    {
        type: "EVM",
        key: "Bitgert",
        text: "Bitgert",
        value: "Bitgert",
        nonce: 0x26,
        order: -1,
        image: { avatar: true, src: brise },
        testNet: false,
        mainnet: false,
        coming: false,
        newChain: true,
        chainId: 32520,
        tnChainId: 64668,
    },
    {
        type: "Casper",
        key: "Casper",
        text: "Casper",
        value: "Casper",
        nonce: 39,
        order: -8,
        image: { avatar: true, src: casper },
        testNet: false,
        mainnet: false,
        coming: false,
        newChain: biz,
    },
    {
        type: "EVM",
        key: "Optimism",
        text: "Optimism",
        value: "Optimism",
        nonce: 0x28,
        order: -8,
        image: { avatar: true, src: optimism },
        testNet: biz,
        mainnet: false,
        coming: !biz,
        newChain: false,
        chainId: 420,
        tnChainId: 420,
    },
    {
        type: "EVM",
        key: "ZetaChain",
        text: "ZetaChain",
        value: "ZetaChain",
        nonce: 0x29,
        order: -9,
        image: { avatar: true, src: zeta },
        testNet: biz,
        mainnet: false,
        coming: !biz,
        newChain: false,
        chainId: 7000,
        tnChainId: 7001,
    },
    {
        type: "EVM",
        key: "Base",
        text: "Base",
        value: "Base",
        nonce: 0x2b,
        order: -5,
        image: { avatar: true, src: Base },
        testNet: false,
        mainnet: false,
        coming: false,
        newChain: true,
        chainId: 8453,
        tnChainId: 84531,
    },
    {
        type: "EVM",
        key: "Findora",
        text: "Findora",
        value: "Findora",
        nonce: 44,
        order: -6,
        image: { avatar: true, src: Findora },
        testNet: biz,
        mainnet: false,
        coming: !biz,
        newChain: biz,
        chainId: 2152,
        tnChainId: 2153,
    },
];
