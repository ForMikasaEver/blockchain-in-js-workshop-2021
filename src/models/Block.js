import sha256 from 'crypto-js/sha256.js'
import { MerkleTree } from 'merkletreejs';
import { createHash } from 'crypto';

import UTXOPool from "./UTXOPool.js";

export const DIFFICULTY = 2 // 难度常量 DIFFICULTY，用于指定哈希值的前缀中 0 的数量

class Block {
  // 1. 完成构造函数及其参数

  constructor(blockChain, previousHash, height, hash, coinbaseBeneficiary, nonce, transactions) {
    this.blockChain = blockChain;  // 区块链对象
    this.previousHash = previousHash;  // 前一个区块的哈希值
    this.height = height;  // 区块的高度
    this.hash = hash;  // 区块的哈希值
    this.coinbaseBeneficiary = coinbaseBeneficiary; // 添加coinbaseBeneficiary属性用于存储币库收益地址（一般是矿工地址）
    this.nonce = nonce;  // 添加一个nonce属性用于存储区块的随机数
    this.utxoPool = blockChain.utxoPool.clone(); // 添加utxoPool属性用于存储未使用的交易输出池
    this.transactions = transactions || []
    this.merkleRoot = null; // Merkle树的根哈希值
  }


  /**
   isValid() 方法检查当前区块的哈希值是否符合难度要求

   哈希值前缀中 0 的个数应该大于或等于难度值 DIFFICULTY 才认为哈希值符合标准。
   因为难度值越大，要求哈希值前缀中 0 的个数就越多，这就要求哈希值的计算越困难

   ！！！-----------但是函数中这里来又为什么是等于呢？？？------------！！！
   在我们的实现中，我们定义了一个难度常量 DIFFICULTY，用于指定哈希值的前缀中 0 的数量。
   当哈希值前缀中 0 的数量等于 DIFFICULTY 时，我们就认为该哈希值满足了要求。
   这里的“等于”指的是“大于等于”。也就是说，如果哈希值前缀中 0 的数量大于等于 DIFFICULTY，我们就认为该哈希值满足要求

   hash.substring(0, DIFFICULTY) 表示从字符串 hash 的第一个字符开始取 DIFFICULTY 个字符
   '0'.repeat(DIFFICULTY) 表示由 DIFFICULTY 个 0 组成的字符串
   如果哈希值的前缀中包含至少 DIFFICULTY 个 0，则认为该哈希值满足要求
   */
  isValid() {
    const hash = sha256(this.previousHash + this.height + this.nonce).toString()
    return hash.substring(0, DIFFICULTY) === '0'.repeat(DIFFICULTY)
  }

  // setNonce(nonce) 方法用于设置当前区块的随机数属性
  setNonce(nonce) {
    this.nonce = nonce
  }

  // 根据交易变化更新区块 hash
  // _setHash() {
  //
  // }

  /**
   * 添加计算交易 hash 的函数 combinedTransactionsHash
   * 要求能够根据区块添加的交易更新整个 Hash 值
   *
   */
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


  /**
   * 添加交易并处理交易函数 addTransaction
   * 要求进行交易的验证
   * 将符合要求的交易更新⾄当前区块的 UTOXPool 交易池中
   * 需包含 UTXOPool 的更新与 hash 的更新
   */
  addTransaction(transaction) {
    // 这行语句一定要加在if前面，不然不符合规则的交易会自动略过，比如lesson5里面的badtrx
    this.transactions.push(transaction.hash)

    if (!this.utxoPool.isValidTransaction(transaction)) {
      return false;
    }

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

}

export default Block
