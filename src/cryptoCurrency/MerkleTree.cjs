const crypto = require('crypto');

class MerkleTree {
    constructor(elements) {
        this.elements = elements;
        this.levels = this.calculateLevels(elements);
        this.root = this.levels[this.levels.length - 1][0];
    }

    hash(value) {
        return crypto.createHash('sha256').update(value).digest('hex');
    }

    calculateLevels(elements) {
        if (elements.length === 0) {
            return [[]];
        }

        const levels = [];
        levels.push(elements.map((element) => this.hash(element)));

        while (levels[levels.length - 1].length > 1) {
            const currentLevel = levels[levels.length - 1];
            const nextLevel = [];

            for (let i = 0; i < currentLevel.length; i += 2) {
                const left = currentLevel[i];
                const right = currentLevel[i + 1] || '';
                const hash = this.hash(left + right);
                nextLevel.push(hash);
            }

            levels.push(nextLevel);
        }

        return levels;
    }

    getProof(element) {
        let index = this.elements.indexOf(element);

        if (index === -1) {
            return [];
        }

        const proof = [];

        for (let level = 0; level < this.levels.length - 1; level++) {
            const currentLevel = this.levels[level];
            const isRightNode = index % 2 === 1;
            const siblingIndex = isRightNode ? index - 1 : index + 1;

            if (siblingIndex < currentLevel.length) {
                proof.push(currentLevel[siblingIndex]);
            }

            index = Math.floor(index / 2);
        }

        return proof;
    }

    verifyProof(element, proof, root) {
        let computedHash = this.hash(element);

        for (let i = 0; i < proof.length; i++) {
            const proofElement = proof[i];
            const isRightNode = i % 2 === 1;

            if (isRightNode) {
                computedHash = this.hash(computedHash + proofElement);
            } else {
                computedHash = this.hash(proofElement + computedHash);
            }
        }


        return computedHash === root;
    }

}

// 示例用法
const elements = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const merkleTree = new MerkleTree(elements);

console.log('Merkle Root:', merkleTree.root);

const elementToVerify = 'd';  // f
const proof = merkleTree.getProof(elementToVerify);
const isVerified = merkleTree.verifyProof(elementToVerify, proof, merkleTree.root);


console.log('Proof for', elementToVerify + ':', proof);
console.log('Proof Verification:', isVerified);