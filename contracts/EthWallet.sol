// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.3;

import "../interfaces/IEvents.sol";
import "../interfaces/IErrors.sol";

contract EthWallet is IEvents, IErrors {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier hasEnoughEth(uint _amount) {
        uint _balance = address(this).balance;

        if(_balance < _amount) {
            revert InsufficientFunds(_balance, _amount);
        }

        _;
    }

    modifier isOwnerOfWallet() {
        if(msg.sender != owner) {
            revert InsufficientPrivileges("You can only withdraw from your wallet");
        }

        _;
    }

    receive() 
    external 
    payable 
    {
        emit EthReceived(msg.sender, msg.value);
    }

    function withdrawEth(uint _amount) 
    isOwnerOfWallet 
    hasEnoughEth(_amount) 
    public 
    {
        /*
        *   WITHDRAW ETH LOGIC (SEND ETH BACK TO WALLET)
        */
        emit EthWithdrawn(_amount);
    }

    function getContractBalance() 
    public 
    view 
    returns (uint) 
    {
        return address(this).balance;
    }
}