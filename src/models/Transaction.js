import sha256 from 'crypto-js/sha256.js'
<<<<<<< Updated upstream

class Transaction {
  constructor() {
=======
import {verifySignature} from "../validators/crypto.js";

class Transaction {
    constructor(miner, receiverPubKey, value, fee, signature, hash) {
        this.miner = miner
        this.receiverPubKey = receiverPubKey
        this.value = value
        this.fee = fee  // 支付给矿工的费用
        this.signature = signature
        this.hash = hash || this._calculateHash()
    }
>>>>>>> Stashed changes

  }

  // 更新交易 hash
  _setHash() {

  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {

  }

  // 校验交易签名 返回 bool 类型的值
  hasValidSignature() {

  }

<<<<<<< Updated upstream
=======
    /**
     * 计算交易 hash 的摘要函数
      */
    _calculateHash() {
        return sha256(this.miner + this.receiverPubKey + this.value + this.fee).toString()
    }

    // 校验交易签名 返回 bool 类型的值
    hasValidSignature() {
        const message = this.hash
        const signature = this.signature
        const publicKey = this.miner

        // 调用/validators/crypto.js中的verifySignature方法
        return verifySignature(message, signature, publicKey)
    }
>>>>>>> Stashed changes
}

export default Transaction
