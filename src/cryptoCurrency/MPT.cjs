//以下是test.js文件内容

// 导入 EthereumMPT 类和 keccak256、toBuffer 方法
import EthereumMPT from './eth_mpt.cjs';
import { keccak256 } from 'ethereumjs-util';
import { toBuffer } from 'ethereumjs-util';

// 创建异步函数
(async () => {

// 创建 EthereumMPT 类的实例
    const mpt = new EthereumMPT();

// 定义第一个账户的地址、nonce、余额、代码哈希和存储根等参数
    const address1 = '0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5';
    const nonce1 = 1;
    const balance1 = 1000;
    const codeHash1 = keccak256(toBuffer('0x636f646531')).toString('hex');
    const storageRoot1 = keccak256(toBuffer('0x73746f7261676531')).toString('hex');

// 定义第二个账户的地址、nonce、余额、代码哈希和存储根等参数
// const address2 = '0x0a2f3b98c0652b7268b2e80f4d0c806cf56b5a79';
// const nonce2 = 2;
// const balance2 = 2000;
// const codeHash2 = keccak256(toBuffer('code2')).toString('hex');
// const storageRoot2 = keccak256(toBuffer('storage2')).toString('hex');

// 向 EthereumMPT 实例中插入第一个账户的账户信息
    await mpt.putAccount(address1, nonce1, balance1, codeHash1, storageRoot1);
// await mpt.putAccount(address2, nonce2, balance2, codeHash2, storageRoot2);

    console.log('Accounts added to MPT.');

// 获取 Merkle Patricia 树的根节点的哈希值并输出
    const root = await mpt.getRoot();
    console.log('MPT Root:', root);

// 验证第一个账户的余额是否正确并输出验证结果
    const verified = await mpt.verifyAccount(address1, nonce1, balance1, codeHash1, storageRoot1);
    console.log('Account verification result:', verified);

})();

//以下是test.js文件内容

// 导入 EthereumMPT 类和 keccak256、toBuffer 方法
import EthereumMPT from './eth_mpt.cjs';
import { keccak256 } from 'ethereumjs-util';
import { toBuffer } from 'ethereumjs-util';

// 创建异步函数
(async () => {

// 创建 EthereumMPT 类的实例
    const mpt = new EthereumMPT();

// 定义第一个账户的地址、nonce、余额、代码哈希和存储根等参数
    const address1 = '0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5';
    const nonce1 = 1;
    const balance1 = 1000;
    const codeHash1 = keccak256(toBuffer('0x636f646531')).toString('hex');
    const storageRoot1 = keccak256(toBuffer('0x73746f7261676531')).toString('hex');

// 定义第二个账户的地址、nonce、余额、代码哈希和存储根等参数
// const address2 = '0x0a2f3b98c0652b7268b2e80f4d0c806cf56b5a79';
// const nonce2 = 2;
// const balance2 = 2000;
// const codeHash2 = keccak256(toBuffer('code2')).toString('hex');
// const storageRoot2 = keccak256(toBuffer('storage2')).toString('hex');

// 向 EthereumMPT 实例中插入第一个账户的账户信息
    await mpt.putAccount(address1, nonce1, balance1, codeHash1, storageRoot1);
// await mpt.putAccount(address2, nonce2, balance2, codeHash2, storageRoot2);

    console.log('Accounts added to MPT.');

// 获取 Merkle Patricia 树的根节点的哈希值并输出
    const root = await mpt.getRoot();
    console.log('MPT Root:', root);

// 验证第一个账户的余额是否正确并输出验证结果
    const verified = await mpt.verifyAccount(address1, nonce1, balance1, codeHash1, storageRoot1);
    console.log('Account verification result:', verified);

})();