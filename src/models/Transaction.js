import sha256 from 'crypto-js/sha256.js'
import t from "ramda/src/T.js";


class Transaction {
    constructor(miner, receiverPubKey, value, hash) {
        this.miner = miner
        this.receiverPubKey = receiverPubKey
        this.value = value
        this.hash = hash || this._calculateHash()
    }

    // 更新交易 hash
    _setHash() {
        this.hash = this._calculateHash()
    }

    // 计算交易 hash 的摘要函数
    _calculateHash() {
        return sha256(this.miner + this.receiverPubKey + this.value).toString()
    }
}

export default Transaction