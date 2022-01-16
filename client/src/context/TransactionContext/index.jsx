import React, { useState, useEffect, createContext } from "react";
import { ethers, providers } from "ethers";
import { contractABI, contractAddress } from "../../utils/constants";
export const TransactionContext = createContext();
const { ethereum } = window;
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log({
    provider,
    signer,
    transactionContract,
  });
  return transactionContract
};

export const TransactionProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState()
  const [transactionCount, setTransactionCount] = useState(
      localStorage.getItem('transactionCount')
  );
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts?.length > 0) {
        setAccount(accounts[0]);
      } else {
        console.log("No accounts found!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const sendTransaction = async (addressTo, amount, keyword, message) => {
    const transactionContract = getEthereumContract();
    const gas = ethers.utils.parseEther('0.0001');
    const parsedAmount = ethers.utils.parseEther(amount);
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: account,
          to: addressTo,
          gas: '0x5208',
          value: parsedAmount._hex,
        },
      ],
    });
    const transactionResponse =  await transactionContract.transferAmount(addressTo, parsedAmount, message, keyword);
    transactionResponse.wait();
    const transactionCount = await transactionContract.getTransactionCount();
    console.log(transactionCount)
    setTransactionCount(transactionCount.toNumber());
    localStorage.setItem('transactionCount', transactionCount.toNumber())
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <TransactionContext.Provider
      value={{ connectedAccount: account, transactionCount, connectWallet, sendTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
