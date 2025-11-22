import hardhat from "hardhat";
const { ethers } = hardhat;

try{
    const EthSenderCFactory = await ethers.getContractFactory('EthSender');
    const ethSender = await EthSenderCFactory.deploy();
    await ethSender.waitForDeployment();

    let address = await ethSender.getAddress();
    console.log(`EthSender.address: ${address}`);
    console.log(`EthSender.owner  : ${await ethSender.owner()}`);

    let balance = await ethSender.getContractBalance();
    console.log(`EthSender.balance: ${ethers.formatEther(balance)} ETH`);

    const EthWalletCFactory = await ethers.getContractFactory('EthWallet');
    const ethWallet = await EthWalletCFactory.deploy();
    await ethWallet.waitForDeployment();

    address = await ethWallet.getAddress();
    console.log(`EthWallet.address: ${address}`);
    console.log(`EthWallet.owner  : ${await ethWallet.owner()}`);

    balance = await ethWallet.getContractBalance();
    console.log(`EthWallet.balance: ${ethers.formatEther(balance)} ETH`);
}catch(e){
    console.log("*** scripts/deploy.js ***\n", e);
}