# Cardano Nami Wallet Recovery

This package provides a utility function to generate a list of accounts for Cardano Nami wallet recovery from a mnemonic seed.

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