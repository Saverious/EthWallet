import readline from 'node:readline/promises';

import { selectOperation } from './utils.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


try {
    let index = '';

    while(index !== '0'){
        console.log('\n\n******* ETH Wallet Smart Contract *******\n');
        console.log('Select option:\n');
        console.log('1. Deploy contract');
        console.log('2. View addresses');
        console.log('3. View owners');
        console.log('4. View EthSender balance');
        console.log('5. View EthWallet balance');
        console.log('6. Deposit ETH');
        console.log('7. Send ETH');
        console.log('0. Exit\n');

        index = await rl.question('💬 Option: ');
        await selectOperation(rl, index);
    }

    rl.close();
} catch (e) {
    console.error(`‼️  ${e.message}`);
}