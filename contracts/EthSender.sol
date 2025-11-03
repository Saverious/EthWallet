// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.3;

import { EthWallet } from "./EthWallet.sol";

import "../interfaces/IEvents.sol";
import "../interfaces/IErrors.sol";

contract EthSender is IEvents, IErrors {
    address public owner;
    EthWallet private recipientWallet;

    constructor() {
        owner = msg.sender;
    }

    modifier hasEnoughEth(uint _amountToSend) {
        uint _balance = address(this).balance;

        if(_amountToSend > _balance) {
            revert InsufficientFunds(_balance, _amountToSend);
        }

        _;
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function deposit() external payable {
        //
    }

    function sendEth(address payable _recipient, uint _amount) 
    hasEnoughEth(_amount) 
    public
    payable 
    {
        (bool success, ) = address(_recipient).call{value: _amount}("");

        if(!success) {
            revert TransactionFailed(_amount, _recipient);
        }

        emit EthSent(_amount, _recipient);
    }
}