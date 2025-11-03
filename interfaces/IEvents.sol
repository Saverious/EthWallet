// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.3;

interface IEvents {
    event EthSent(uint _amount, address _recipient);
    event EthReceived(address _sender, uint _amount);
    event EthWithdrawn(uint _amount);
}