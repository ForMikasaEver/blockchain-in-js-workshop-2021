const { keccak256 } = require('keccak256');

class MPTNode {
    constructor() {
        this.value = null; // 节点的值，用于存储账户数据和内容
        this.children = {}; // 子节点映射表
    }
}

class MPT {
    constructor() {
        this.root = new MPTNode(); // 根节点
    }

    getAddressKey(address) {
        // 将以太坊地址转换为索引键
        return address.toLowerCase();
    }

    addOrUpdateAccount(address, data) {
        const key = this.getAddressKey(address);
        const hash = keccak256(data);

        let currentNode = this.root;
        for (let i = 0; i < key.length; i++) {
            const char = key[i];

            if (!currentNode.children[char]) {
                currentNode.children[char] = new MPTNode();
            }

            currentNode = currentNode.children[char];
        }

        currentNode.value = {
            address,
            data,
            hash,
        };
    }

    verifyAccount(address, expectedData) {
        const key = this.getAddressKey(address);
        const expectedHash = keccak256(expectedData);

        let currentNode = this.root;
        for (let i = 0; i < key.length; i++) {
            const char = key[i];

            if (!currentNode.children[char]) {
                return false; // 节点不存在，验证失败
            }

            currentNode = currentNode.children[char];
        }

        if (!currentNode.value) {
            return false; // 节点没有存储值，验证失败
        }

        return currentNode.value.address === address && currentNode.value.hash === expectedHash;
    }
}

// 示例用法
const mpt = new MPT();

const address1 = '0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5';
const data1 = 'Account data for address1';
mpt.addOrUpdateAccount(address1, data1);

const address2 = '0x1234567890abcdef1234567890abcdef12345678';
const data2 = 'Account data for address2';
mpt.addOrUpdateAccount(address2, data2);

console.log('MPT Root:', mpt.root);

// 验证账户信息
console.log('Verification for address1:', mpt.verifyAccount(address1, data1)); // true
console.log('Verification for address2:', mpt.verifyAccount(address2, 'Invalid data')); // false
