import React from 'react';
import Creature from '../../contracts/Creature.json';
import Web3 from 'web3';

const Withdraw = () => {
  const withdraw = async () => {
    if (window.ethereum) {
      // await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(Creature.abi, process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);
      window.contract = contract;
      contract.methods.withdrawMoney().send({ from: accounts[0] }, (err, res) => {
        console.log(err);
        console.log(res);
      })
      return true;
    }
    return false;
  }
  return (
    <div>
      <button onClick={withdraw}>提款</button>
    </div>
  );
};

export default Withdraw;