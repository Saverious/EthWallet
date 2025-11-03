// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.3;

interface IErrors {
    error InsufficientFunds(uint _balance, uint _amountToSend);
    error InsufficientPrivileges(string message);
    error TransactionFailed(uint _amountToSend, address _recipient);
}