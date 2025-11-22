import hardhat from 'hardhat';
const { ethers } = hardhat;

const ethSenderAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const ethWalletAddr = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

try{
    // deposit Eth to EthSender account
    const ethSender = await ethers.getContractAt('EthSender', ethSenderAddr);
    await ethSender.deposit({value: ethers.parseEther('500')}); // deposit from the default signer's account

    console.log('####### Before sending/receiving Eth #######');

    let balance = await ethSender.getContractBalance();
    console.log(`EthSender.balance: ${ethers.formatEther(balance)} ETH`);

    const ethWallet = await ethers.getContractAt('EthWallet', ethWalletAddr);

    balance = await ethWallet.getContractBalance();
    console.log(`EthWallet.balance: ${ethers.formatEther(balance)}`);

    // send Eth to EthWallet account
    let amountToSend = ethers.parseEther('10');
    await ethSender.sendEth(ethWalletAddr, amountToSend);

    console.log('\n####### After sending/receiving Eth #######');

    balance = await ethSender.getContractBalance();
    console.log(`EthSender.balance: ${ethers.formatEther(balance)} ETH`);

    balance = await ethWallet.getContractBalance();
    console.log(`EthWallet.balance: ${ethers.formatEther(balance)}`);
}catch(e){
    console.log('*** scripts/interact.js***\n', e);
}