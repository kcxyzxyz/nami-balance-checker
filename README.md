# @sk1ppi/cardano-nami-wallet-recovery

![Made by](https://img.shields.io/badge/SK1PPI-8A2BE2)
![GitHub License](https://img.shields.io/github/license/sk1ppi/cardano_nami_wallet_recovery)
![NPM Version](https://img.shields.io/npm/v/%40sk1ppi%2Fcardano-nami-wallet-recovery)

Recover a wallet from a mnemonic phrase using the Cardano Serialization Library and the bip39 library. It retrieves the private key, public key and address of each wallet created in Nami Wallet.


## Install

Recover a wallet from a mnemonic phrase using the Cardano Serialization Library and the bip39 library. It retrieves the private key, public key and address of each wallet created in Nami Wallet.

```bash
npm i @sk1ppi/cardano-nami-wallet-recovery
```

## Example

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

## Testing

To run tests, use the following command:  

```bash
npm run test
```

## Contribute

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Reach out

![image0_0-3](https://github.com/sk1ppi/cardano_nami_wallet_recovery/assets/121653522/4dc2f3ff-a082-45fb-80de-d3a32bea18ae)

- [Via e-mail](mailto:kcxyzxyz@icloud.com?subject=Reaching%20out!)

## License

[Apache-2.0](LICENSE)