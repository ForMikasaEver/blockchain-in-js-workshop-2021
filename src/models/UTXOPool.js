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

  /**
   * 将当前 UXTO 的副本克隆
   */
  clone() {
    return new UTXOPool({...this.utxos})
  }

  // 处理交易函数
  handleTransaction(transaction) {

    // 因为第三个区块的utxoPool是复制的第二个区块，所以它没有coinbaseBeneficiary
    // 因此就把第三个区块的utxos第一个地址当作coinbaseBeneficiary
    const keys = Object.keys(this.utxos);
    const firstUTXOKey = keys[0];

    if (!this.isValidTransaction(transaction)) {
      return
    }

    if (!transaction.hasValidSignature()) {
      return;
    }

    // 判断交易的发起者是不是矿工，如果是矿工，手续费是先从发起者扣除，再给到接收者，因为矿工打包区块，接收者也是矿工，所有等于没有手续费
    // 如果交易发起者不是矿工，手续费是先从发起者扣除，再给到接收者
    // 这里还没解决的问题是：怎么把矿工字符串换成矿工地址（已经解决）
    if (transaction.miner === firstUTXOKey) {
      // miner地址的amount减去交易的value和fee
      this.utxos[transaction.miner].amount -= transaction.value

      // ！！！注意！！！
      // 这里把公钥的地址加入到utxos里面，就不用在addUTXO函数里面添加判断这个地址到底是miner还是receiverPubKey了
      // 因为addUTXO里面也判断不了，没有传transaction判断不了导致的
      if (!this.utxos[transaction.receiverPubKey]) {
        this.utxos[transaction.receiverPubKey] = new UTXO(transaction.receiverPubKey, 0)

        // 把receiverPubKey加入到UTXOPool里面
        this.addUTXO(transaction.receiverPubKey, transaction.value);
      }

    }else {
      this.utxos[transaction.miner].amount -= transaction.value + transaction.fee

      this.utxos[transaction.receiverPubKey].amount += transaction.value + transaction.fee

    }

  }

  /**
   * 验证交易合法性
   * 验证余额
   * 返回 bool
   * lesson4-lesson5的函数：
   * lesson6这改了之后，牵涉到这个函数的所有部分都要改
   * isValidTransaction(address, amount) {
   *     return this.utxos[address].amount && this.utxos[address].amount >= amount
   *   }
   */
  isValidTransaction(trx) {
    const sender = this.utxos[trx.miner];
    const transactionAmount = trx.value + trx.fee;

    return sender && sender.amount >= transactionAmount;
  }

}

export default UTXOPool