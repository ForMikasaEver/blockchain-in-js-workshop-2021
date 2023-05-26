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
}

export default UTXOPool