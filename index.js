const _ = require("lodash");
const Bip39 = require("bip39");
const Blockfrost = require("@blockfrost/blockfrost-js");
const CardanoWasm = require("@emurgo/cardano-serialization-lib-nodejs");

const blockfrostApi = new Blockfrost.BlockFrostAPI({
  projectId: "BLOCKFROST_API_KEY", // see: https://blockfrost.io
  // For a list of all options see section below
});

// A list of seeds to check
const seedList = [
  // "sample sample sample sample sample sample sample sample sample sample sample sample"
];

// harden deriviation
const harden = (t) => 2147483648 + t;

const main = async () => {
  // compile address
  const addressList = [];

  // number of accounts to check
  const accountIndex = 10;

  // build address
  seedList.forEach((seed) => {
    const entropy = Bip39.mnemonicToEntropy(seed);

    const rootKey = CardanoWasm.Bip32PrivateKey.from_bip39_entropy(
      Buffer.from(entropy, "hex"),
      Buffer.from("")
    );

    // compile address till account index n
    _.range(0, accountIndex).forEach((n) => {
      const accountKey = rootKey
        .derive(harden(1852)) // purpose
        .derive(harden(1815)) // coin type
        .derive(harden(n)); // account #0

      const utxoPubKey = accountKey
        .derive(0) // external
        .derive(0)
        .to_public();

      const stakeKey = accountKey
        .derive(2) // chimeric
        .derive(0)
        .to_public();

      const baseAddr = CardanoWasm.BaseAddress.new(
        CardanoWasm.NetworkInfo.mainnet().network_id(),
        CardanoWasm.StakeCredential.from_keyhash(
          utxoPubKey.to_raw_key().hash()
        ),
        CardanoWasm.StakeCredential.from_keyhash(stakeKey.to_raw_key().hash())
      );

      const shelleyAddress = baseAddr.to_address().to_bech32();
      addressList.push(shelleyAddress);
    });
  });

  for (const address of addressList) {
    const utxos = await blockfrostApi
      .addressesUtxosAll(address)
      .catch((err) => 0);

    console.log(`${address} => ${utxos.length} utxos`);
  }
};

(async () => await main())();
