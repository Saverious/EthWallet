import { isAddress } from 'ethers';

import { deployContracts, viewAddresses, viewOwners, getEthSenderBalance,  getEthWalletBalance, depositEth, sendEth, } from './interact.js';

export async function selectOperation(rl, index) {
    switch(index){
        case '1':
            await deployContracts();
            break;

        case '2': 
            viewAddresses();
            break;

        case '3':
            await viewOwners();
            break;

        case '4':
            await getEthSenderBalance();
            break;

        case '5':
            await getEthWalletBalance();
            break;

        case '6': {
            const amount = await rl.question('💬 Enter amount: ');
            await depositEth(amount);
            break;
        }

        case '7': {
            const recipient = await rl.question('💬 Enter recipient address: ');

            if(!isAddress(recipient)){
                console.log('🚫 Invalid Ethereum address');
                break;
            }

            const amount = await rl.question('💬 Enter amount: ');
            await sendEth(recipient, amount);
            break;
        }

        default:
            break;
    }
}