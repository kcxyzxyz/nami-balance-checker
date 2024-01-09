# @sk1ppi/cardano-nami-wallet-recovery

Recover a wallet from a mnemonic phrase using the Cardano Serialization Library and the bip39 library. It retrieves the private key, public key and address of each wallet created in Nami Wallet.


## Installation

To use this package, install it in your project using npm:

```bash
npm i cardano-nami-wallet-recovery
```

## Usage

```js
const { fromMnemonicSeed } = require("cardano-nami-wallet-recovery");

// Example mnemonic seed
const mnemonicSeed = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
const accounts = fromMnemonicSeed(mnemonicSeed);

// Output the generated accounts
console.log(accounts);
// [
//   {
//     accountKey: 'acct_xvk1...',
//     publicKey: 'xpub1...',
//     stakeKey: 'stake1u...',
//     addressShelley: 'addr1...'
//   },
//   ...
// ]
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[Apache-2.0](LICENSE)