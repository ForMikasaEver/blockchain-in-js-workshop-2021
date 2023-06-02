import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos
  }

  /**
   * 添加交易函数
   * 将交易的信息更新至 UTXOPool 中
   */
  addUTXO(address, amount) {
    if (this.utxos[address]) {
      this.utxos[address].amount += amount
    }
    else {
      this.utxos[address] = new UTXO(address, amount)
      this.utxos[address].amount += amount
    }
  }

  // 将当前 UXTO 的副本克隆
  clone() {
    return new UTXOPool({...this.utxos})
  }

  // 处理交易函数
  handleTransaction(transaction) {
    if (!this.isValidTransaction(transaction.miner, transaction.value)) {
      return
    }

    // miner地址的amount减去交易的value
    this.utxos[transaction.miner].amount -= transaction.value

    // ！！！注意！！！
    // 这里把公钥的地址加入到utxos里面，就不用在addUTXO函数里面添加判断这个地址到底是miner还是receiverPubKey了
    // 因为addUTXO里面也判断不了，没有传transaction判断个屁
    this.utxos[transaction.receiverPubKey] = new UTXO(transaction.receiverPubKey, 0)

    // 把receiverPubKey加入到UTXOPool里面
    this.addUTXO(transaction.receiverPubKey, transaction.value);
  }

  /**
   * 验证交易合法性
   * 验证余额
   * 返回 bool
   */
  isValidTransaction(address, amount) {
    return this.utxos[address].amount && this.utxos[address].amount >= amount
  }

}

export default UTXOPool