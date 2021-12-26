import Creature from '../contracts/Creature.json';
import Web3 from 'web3';
import { useEffect } from 'react';
import { MetaMaskProvider } from "metamask-react";
// import {Contract} from 'web3-eth-contract';

const provider = 'wss://rinkeby.infura.io/ws/v3/309d7bd56ad14e9cae7715830435ceff';

// var contract = new Contract(Creature.abi, process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);


const Index = () => {
  // const initWeb3 = async() => {
  //   const web3 = new Web3(provider);
  //   window.web3 = web3;
  //   const accounts = await web3.eth.getAccounts();
  //   const contract = new web3.eth.Contract(Creature.abi, process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);
  //   console.log(accounts)
  // }
  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(Creature.abi, process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);
      window.contract = contract;
      contract.methods.mintCustomer().send({from: accounts[0], value: web3.utils.toWei('0.1', 'ether')},(err, res)=>{
        console.log(err);
        console.log(res);
      })
      return true;
    }
    return false;
  }
  
  useEffect(() => {
  }, []);
  return (
    <div>
      <div>this is index page</div>
      <button onClick={ethEnabled}>click me mint</button>
    </div>
  );
};

export default Index;
