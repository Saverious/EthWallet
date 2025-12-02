import hardhat from "hardhat";
const { ethers } = hardhat;

let ethWalletAddr = null;
let ethSenderAddr = null;

export async function deployContracts() {
    try{
        const EthSenderCFactory = await ethers.getContractFactory('EthSender');
        const ethSender = await EthSenderCFactory.deploy();
        await ethSender.waitForDeployment();

        ethSenderAddr = await ethSender.getAddress();
        console.log('✅ Deployed EthSender');

        const EthWalletCFactory = await ethers.getContractFactory('EthWallet');
        const ethWallet = await EthWalletCFactory.deploy();
        await ethWallet.waitForDeployment();

        ethWalletAddr = await ethWallet.getAddress();
        console.log('✅ Deployed EthWallet');
    }catch(e){
        console.error(`‼️  ${e.message}`);
    }
}

function ethSenderExist(){
    return ethSenderAddr !== null && ethSenderAddr !== '';
}

function ethWalletExists(){
    return ethWalletAddr !== null && ethWalletAddr !== '';
}

export function viewAddresses() {
    if(ethSenderExist()){
        console.log('✅ EthSender.address: ', ethSenderAddr);
    }else{
        console.log('⚠️  EthSender address not found. Ensure EthSender contract is deployed');
    }

    if(ethWalletExists()){
        console.log('✅ EthWallet.address: ', ethWalletAddr);
    }else{
        console.log('⚠️  EthWallet address not found. Ensure EthWallet contract is deployed');
    }
}

export async function viewOwners() {
    if(ethSenderExist()){
        const ethSender = await ethers.getContractAt('EthSender', ethSenderAddr);
        console.log('✅ EthSender.owner: ', await ethSender.owner());
    }else{
        console.log('⚠️  Cannot view owner. EthSender address not found');
    }

    if(ethWalletExists()){
        const ethWallet = await ethers.getContractAt('EthWallet', ethWalletAddr);
        console.log('✅ EthWallet.owner: ', await ethWallet.owner());
    }else{
        console.log('⚠️  Cannot view owner. EthWallet address not found');
    }
}

export async function getEthSenderBalance() {
    if(!ethSenderExist()){
        console.log('⚠️  Cannot get balance. EthSender address not found');
        return;
    }

    const ethSender = await ethers.getContractAt('EthSender', ethSenderAddr);
    let balance = await ethSender.getContractBalance();
    console.log(`✅ EthSender.balance: ${ethers.formatEther(balance)} ETH`);
}

export async function getEthWalletBalance() {
    try {
        if(!ethWalletExists()){
            console.log('⚠️  Cannot get balance. EthWallet address not found');
            return;
        }

        const ethWallet = await ethers.getContractAt('EthWallet', ethWalletAddr);
        let balance = await ethWallet.getContractBalance();
        console.log(`✅ EthWallet.balance: ${ethers.formatEther(balance)} ETH`);
    } catch (e) {
        console.error(`‼️  ${e.message}`);
    }
}

export async function depositEth(amount) {
    try {
        if(!ethSenderExist()){
            console.log('⚠️  Cannot deposit Eth to EthSender. EthSender address not found');
            return;
        }
    
        const ethSender = await ethers.getContractAt('EthSender', ethSenderAddr);
        await ethSender.deposit({value: ethers.parseEther(amount)});
        console.log(`✅ ${amount} ETH deposited to EthSender`);
    } catch (e) {
        console.error(`‼️  ${e.message}`);
    }
}

export async function sendEth(recipient, amount) {
    try{
        if(!ethSenderExist()){
            console.log('⚠️  Cannot send Eth. EthSender address not found');
            return;
        }

        const ethSender = await ethers.getContractAt('EthSender', ethSenderAddr);
        await ethSender.sendEth(recipient, ethers.parseEther(amount));
    }catch(e){
        console.error(`‼️  ${e.message}`);
    }
}