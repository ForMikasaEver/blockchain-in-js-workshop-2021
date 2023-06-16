import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数

  constructor() {}

  isValid() {}

  setNonce(nonce) {}

  // 根据交易变化更新区块 hash
  _setHash() {}

  // 汇总计算交易的 Hash 值
  /**
   * 默克尔树实现
   */
<<<<<<< Updated upstream
  combinedTransactionsHash() {}
=======
  combinedTransactionsHash() {
    let combinedHash = '';

    for (const hash1 of this.transactions) {
        combinedHash += this.transactions;
    }

    return this.hash = sha256(this.previousHash + this.height + this.nonce + combinedHash).toString();

    // 基于默克尔树实现，还没看懂
    // const transactionHashes = this.transactions.map(transaction => transaction.hash);
    // const merkleTree = new MerkleTree(transactionHashes, (value) => createHash('sha256').update(value).digest());
    //
    // const merkleRoot = merkleTree.getRoot();
    // this.merkleRoot = merkleRoot.toString('hex');
    //
    // return this.hash = sha256(this.previousHash + this.height + this.nonce + this.merkleRoot).toString();
  }

>>>>>>> Stashed changes

  // 添加交易到区块
  /**
   *
   * 需包含 UTXOPool 的更新与 hash 的更新
   */
<<<<<<< Updated upstream
  addTransaction() {}

  // 添加签名校验逻辑
  isValidTransaction(transaction) {
    
  }
=======
  addTransaction(transaction) {
    if (!this.utxoPool.isValidTransaction(transaction)) {
      return false;
    }

    if (!transaction.hasValidSignature()) {
      return false;
    }

    // 这行语句一定要加在if后面，不然不符合规则的交易会自动略过，比如lesson5里面的badtrx
    this.transactions.push(transaction.hash)

    this.utxoPool.handleTransaction(transaction);

    this.hash = sha256(this.previousHash + this.height + this.nonce + transaction.hash).toString();

    return true;

      // 基于默克尔树实现，还没看懂
      // this.transactions.push(transaction);
      //
      // if (!this.utxoPool.isValidTransaction(transaction.miner, transaction.value)) {
      //   return false;
      // }
      //
      // this.utxoPool.handleTransaction(transaction);
      //
      // this.combinedTransactionsHash();
      //
      // return true;
    }

  // 添加签名校验逻辑
  isValidTransaction(transaction) {
    if (!transaction.miner || !transaction.signature) {
      return false;
    }

    return transaction.hasValidSignature()
  }

>>>>>>> Stashed changes
}

export default Block
