// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.3;

interface IEvents {
    event EthSent(uint _amount, address indexed _recipient);
    event EthReceived(address indexed _sender, uint _amount);
    event EthWithdrawn(uint _amount);
}