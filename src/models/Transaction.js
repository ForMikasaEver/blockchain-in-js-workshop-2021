import sha256 from 'crypto-js/sha256.js'


class Transaction {
    constructor(miner, receiverPubKey, value, fee, hash) {
        this.miner = miner
        this.receiverPubKey = receiverPubKey
        this.value = value
        this.fee = fee  // 支付给矿工的费用
        this.hash = hash || this._calculateHash()
    }

    /**
     * 更新交易 hash
      */

    _setHash() {

    }

    /**
     * 计算交易 hash 的摘要函数
      */
    _calculateHash() {
        return sha256(this.miner + this.receiverPubKey + this.value + this.fee).toString()
    }
}

export default Transaction