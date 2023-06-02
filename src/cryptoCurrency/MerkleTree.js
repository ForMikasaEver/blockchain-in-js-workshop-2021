import { createHash } from 'crypto';
class MerkleTree {
    constructor(data) {
        this.leaves = data.map(item => this.hash(item));
        this.tree = this.buildTree(this.leaves.slice());
        this.root = this.tree[0];
    }

    hash(data) {
        return createHash('sha256').update(data).digest('hex');
    }

    buildTree(leaves) {
        let tree = leaves;
        while (tree.length > 1) {
            let parentLevel = [];
            for (let i = 0; i < tree.length; i += 2) {
                let left = tree[i];
                let right = tree[i + 1] || left;
                parentLevel.push(this.hash(left + right));
            }
            tree = parentLevel;
        }
        return tree;
    }

    // 添加节点
    addNode(data) {
        this.leaves.push(this.hash(data));
        this.tree = this.buildTree(this.leaves.slice());
        this.root = this.tree[0];
    }

    // 删除节点
    removeNode(data) {
        const hashedData = this.hash(data);
        const index = this.leaves.findIndex(leaf => leaf === hashedData);
        if (index !== -1) {
            this.leaves.splice(index, 1);
            this.tree = this.buildTree(this.leaves.slice());
            this.root = this.tree[0];
        }
    }

    // 验证函数
    verify(data) {
        const hashedData = this.hash(data);
        let tree = this.leaves.slice();
        while (tree.length > 1) {
            let parentLevel = [];
            for (let i = 0; i < tree.length; i += 2) {
                let left = tree[i];
                let right = tree[i + 1] || left;
                if (hashedData === left || hashedData === right) {
                    return true;
                }
                parentLevel.push(this.hash(left + right));
            }
            tree = parentLevel;
        }
        return false;
    }
}

const data = ['A', 'B', 'C', 'D'];
const merkleTree = new MerkleTree(data);
console.log('Merkle Root:', merkleTree.root);

// 验证数据块 'A' 是否在 Merkle Tree 中
console.log('Verify A:', merkleTree.verify('A')); // 应该输出 true

// 添加一个新的数据块 'E'
merkleTree.addNode('E');
console.log('Merkle Root after adding E:', merkleTree.root); // Merkle Root 应该发生变化

// 删除数据块 'E'
merkleTree.removeNode('E');
console.log('Merkle Root after removing E:', merkleTree.root); // Merkle Root 应该恢复到最初的值

export default MerkleTree
