const assert = require('assert');
const { fromMnemonicSeed } = require('./index');

describe('fromMnemonicSeed', () => {
    it('should return an array of accounts with valid mnemonic seed and account count', () => {
        const mnemonicSeed = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
        const maxAccountCount = 3;

        const accounts = fromMnemonicSeed(mnemonicSeed, maxAccountCount);

        assert.strictEqual(accounts.length, maxAccountCount);
        assert.strictEqual(typeof accounts[0].accountKey, 'string');
        assert.strictEqual(typeof accounts[0].publicKey, 'string');
        assert.strictEqual(typeof accounts[0].stakeKey, 'string');
        assert.strictEqual(typeof accounts[0].addressShelley, 'string');
    });

    it('should throw an error for invalid mnemonic seed', () => {
        const mnemonicSeed = 'invalid seed';
        const maxAccountCount = 5;

        assert.throws(() => {
            fromMnemonicSeed(mnemonicSeed, maxAccountCount);
        }, Error);
    });

    it('should throw an error for invalid account count', () => {
        const mnemonicSeed = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
        const maxAccountCount = -1;

        assert.throws(() => {
            fromMnemonicSeed(mnemonicSeed, maxAccountCount);
        }, Error);
    });
});