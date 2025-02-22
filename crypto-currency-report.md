# 数字货币技术理论课实验报告

## 小组成员

- 2021131104-罗嘉 （组长）
- 2021131106-王宇佳
- 2021131101-王语阳
- 2021131123-李碧友
- 2021131102-张正阳
- 2021131122-陈祥福


## 代码仓库链接

https://github.com/ForMikasaEver/blockchain-in-js-workshop-2021



## 第一课代码


### 代码 commint 地址

https://github.com/ForMikasaEver/blockchain-in-js-workshop-2021/blob/fme-lesson1/src/cryptoCurrency/MerkleTree.js


### 代码截图

![Vkq6YJ.png](https://i.imgloc.com/2023/06/02/Vkq6YJ.png)

### 主观与讨论题内容
实现加分项内容添加默克尔树后更新了两个函数addTransaction（） combinedTransactionsHash(),还有构造函数：this.merkleRoot = null; // Merkle树的根哈希值:

```
 import sha256 from 'crypto-jsa256.js'
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
    const transactionHashes = this.transactions.map(transaction => transaction.hash);
    const merkleTree = new MerkleTree(transactionHashes, (value) => createHash('sha256').update(value).digest());

    const merkleRoot = merkleTree.getRoot();
    this.merkleRoot = merkleRoot.toString('hex');

    return this.hash = sha256(this.previousHash + this.height + this.nonce + this.merkleRoot).toString();
  }


  /**
   * 添加交易并处理交易函数 addTransaction
   * 要求进行交易的验证
   * 将符合要求的交易更新⾄当前区块的 UTOXPool 交易池中
   * 需包含 UTXOPool 的更新与 hash 的更新
   */
  addTransaction(transaction) {

      this.transactions.push(transaction);

      if (!this.utxoPool.isValidTransaction(transaction.miner, transaction.value)) {
        return false;
      }

      this.utxoPool.handleTransaction(transaction);

      this.combinedTransactionsHash();

      return true;
    }

}

export default Block

```
---





## 第二课代码


### 代码 commint 地址

https://github.com/ForMikasaEver/blockchain-in-js-workshop-2021/blob/fme-lesson1/src/cryptoCurrency/Trie.js


### 代码截图

![](https://s1.vika.cn/space/2023/06/07/31a4afdd87d04caa953a472cdc49a31e)


### 主观与讨论题内容

## 字典树的优点：
字典树查询公共前缀时是十分高效的，他减少了无意义的字符串匹配，其查询效率要优于哈希树。
## 缺点：
字典树的内存消耗非常大。


## 思考如何能够扩展和优化字典树数据结构：
1. 压缩字典树：将具有相同前缀的节点合并成一个节点，从而减少字典树的空间占用。

2. 使用哈希表：在字典树中使用哈希表来存储字符与子节点之间的映射关系，可以提高查询效率。

3. 路径压缩：当只有一个子节点的节点可以被删除时，可以将其父节点的值更新为该节点的子节点的值，并继承该节点的属性，从而减少不必要的节点。

4. 懒惰删除：在删除操作中，不立即删除节点，而是将其标记为“已删除”，等到需要重新利用该节点时再进行删除操作，从而减少频繁的内存分配和释放操作。

5. 多重集合支持：在字典树中支持多重集合（即可以出现重复元素的集合）的操作，例如计算某个元素在集合中出现的次数等。

6. 并查集支持：在字典树中支持并查集的操作，例如查找两个节点是否在同一集合中等。

7. 位运算优化：使用位运算来实现字典树的一些操作，例如在查询时，可以将字符串的每个字符与一个二进制位相对应，从而快速定位节点。

8. 分支限界优化：在查找操作中使用分支限界算法，通过剪枝等技巧来减少搜索空间，提高查找效率。

## 如果把例⼦⾥的字⺟扩展成字⺟和数字的形式, 该如何实现
如果要把字母扩展成字母和数字的形式，可以使用基于字典树的数据结构来实现。具体来说，可以使用一个26叉树（或更多叉树，具体取决于需要支持的字符集大小），其中每个节点代表一个字符或数字，从根节点到叶节点的路径表示一个完整的字符串。

---





## 第三课代码


### 代码 commint 地址

https://github.com/ForMikasaEver/blockchain-in-js-workshop-2021/blob/fme-lesson1/src/cryptoCurrency/MPT.cjs


### 代码截图

![](https://i.imgloc.com/2023/06/08/VwFkYP.jpeg)


### 主观与讨论题内容
## 基于字典树, 以太坊做了哪些改良, 为什么
以太坊对基于字典树的Merkle Patricia树（MPT）进行了改良，旨在提高以太坊的性能和可扩展性。以下是以太坊对MPT所做的改进：

去中心化存储：以太坊将MPT存储在P2P网络中，使其成为去中心化的数据结构。这意味着每个节点都可以存储和访问MPT，从而提高了可用性和鲁棒性。

缓存机制：以太坊实现了一个缓存机制来提高MPT的访问速度。缓存机制可以将频繁访问的节点存储在内存中，从而避免了每次都需要从磁盘中读取节点的开销。

优化存储：以太坊使用了一种名为"Rinkeby Patricia Trie"的优化存储方式来减少MPT的存储空间。这种存储方式将重复的节点进行共享，从而减少了存储空间的使用。

## MPT 想要解决的核⼼问题是什么


MPT的核心问题是在高并发的情况下，多个节点并发地修改MPT节点时可能会导致冲突和竞争条件。为了解决这个问题，以太坊采用了一种称为“状态树”的MPT变体，它将存储和状态分离，并使用一种称为“状态转换”（state transition）的机制来确保唯一性和一致性。这种机制使得以太坊能够实现高并发的状态转换，从而提高了性能和可扩展性。


---