const Bip39 = require("bip39");
const CardanoWasm = require("@emurgo/cardano-serialization-lib-nodejs");

/**
 * The coin type used in the Cardano Nami wallet recovery.
 * @type {number}
 */
const COIN_TYPE = 1815;

/**
 * The purpose constant for the Cardano coin.
 * @type {number}
 */
const COIN_PURPOSE = 1852;


/**
 * Harden a number by setting its most significant bit to 1.
 * @param {number} num - The number to be hardened.
 * @returns {number} - The hardened number.
 */
function harden(num) {
  return (num | 0x80000000) >>> 0;
}

/**
 * Generates a list of accounts from a given mnemonic seed.
 * 
 * @param {string} mnemonicSeed - The mnemonic seed to generate the accounts from.
 * @param {number} [maxAccountCount=5] - The maximum number of accounts to generate. Default is 5.
 * @returns {Array} - An array of objects representing the generated accounts.
 * Each account object contains the following properties:
 * - accountKey: The account key in bech32 format.
 * - publicKey: The public key in bech32 format.
 * - stakeKey: The stake key in bech32 format.
 * - addressShelley: The Shelley address in bech32 format.
 * @throws {Error} - If the mnemonic seed is invalid or the account count is less than 1.
 * @throws {Error} - If the mnemonic seed is invalid.
 * @example 
 * const mnemonicSeed = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
 * const accounts = fromMnemonicSeed(mnemonicSeed);
 * console.log(accounts);
 * // [
 * //   {
 * //     accountKey: 'acct_xvk1...',
 * //     publicKey: 'xpub1...',
 * //     stakeKey: 'stake1u...',
 * //     addressShelley: 'addr1...'
 * //   },
 * // ...
 * // ]
 */
function fromMnemonicSeed(mnemonicSeed, maxAccountCount = 5) {

  if (!Bip39.validateMnemonic(mnemonicSeed)) {
    throw new Error('Invalid mnemonic seed');
  }

  if (maxAccountCount < 1) {
    throw new Error('Invalid account count');
  }

  const entropy = Bip39.mnemonicToEntropy(mnemonicSeed);

  // eslint-disable-next-line no-undef
  const rootKey = CardanoWasm.Bip32PrivateKey.from_bip39_entropy(Buffer.from(entropy, 'hex'), Buffer.from(''));


  const accountsRetrieved = [];

  for (let i = 0; i < maxAccountCount; i++) {
    const accountKey = rootKey
      .derive(1852 | harden(COIN_PURPOSE))
      .derive(1815 | harden(COIN_TYPE))
      .derive(0 | harden(i))

    const publicKey = accountKey
      .derive(0)
      .derive(0)
      .to_public();

    const stakeKey = accountKey
      .derive(2)
      .derive(0)
      .to_public();

    const addressShelley = CardanoWasm.BaseAddress.new(
      CardanoWasm.NetworkInfo.mainnet().network_id(),
      CardanoWasm.StakeCredential.from_keyhash(publicKey.to_raw_key().hash()),
      CardanoWasm.StakeCredential.from_keyhash(stakeKey.to_raw_key().hash())
    ).to_address().to_bech32();

    accountsRetrieved.push({
      accountKey: accountKey.to_bech32(),
      publicKey: publicKey.to_raw_key().to_bech32(),
      stakeKey: stakeKey.to_raw_key().to_bech32(),
      addressShelley
    });
  }

  return accountsRetrieved;
}

module.exports = {
  fromMnemonicSeed
}