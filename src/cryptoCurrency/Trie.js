// 定义一个状态树节点
class TrieNode {
    /**
     *  每个状态树节点的结尾标识符默认为 isEndOfWord = -1 (表示不具有子节点)
     *  当添加子节点之后，便修改结尾标志符 (isEndOfWord = 1)
     */
    constructor(value) {
        //存放节点的值
        this.value = value;

        // 使用集合map来存放子节点
        this.children = new Map();

        // 结尾标识符 默认为-1
        // -1表示最后一个节点，1表示非最后一个节点
        this.isEndOfWord = -1;
    }
}

// 初始化一棵树
class Trie {

    constructor() {
        // 实验要求root的值为0
        this.root = new TrieNode(0);
    }

    // 添加单词
    insert(word) {
        // 从根节点开始遍历
        let currentNode = this.root;

        // 只要往根节点添加过子节点，便将结尾标识符设置为 1
        // if语句是为了防止重复操作
        if (currentNode.isEndOfWord == -1) {
            currentNode.isEndOfWord = 1;
        }

        // 遍历单词，letter是单词所含字母
        for (const letter of word) {
            /**
             * has() 的用法：
             *  `.has() 方法接受一个参数，即要检查的属性名，如果该属性存在于对象中，方法会返回 true`
             * 因为子节点是以键值对的形式存储，键即属性名，值为树节点结构
             */
            // 判断当前节点是否含有 letter这个键，如果没有便将该节点加入子节点集合中
            if (!currentNode.children.has(letter)) {
                // new TrieNode(letter) 将键赋予value
                currentNode.children.set(letter, new TrieNode(letter));
            }
            // 如果有的话，将当前节点的值更新为 键letter对应的树节点
            currentNode = currentNode.children.get(letter);

            // 将当前节点的结尾标识符改为 1
            currentNode.isEndOfWord = 1;
        }
    }


    // 删除单词
    delete(word) {
        this._deleteHelper(this.root, word, 0);
    }


    _deleteHelper(node, word, index) {
        // 遍历到单词的末尾字符
        if (index === word.length) {
            // 如果该节点后面没有子节点，即最后一个节点,
            if (node.isEndOfWord != 0) {
                return false;
            }
            //将该节点设置为该链最后一个节点
            node.isEndOfWord = false;
            // `===` 作用是判断
            return node.children.size === 0;
        }

        const char = word[index];
        // 如果node的孩子节点中不含有 键 word[index]，说明该单词没有被存储在字典树中，直接返回 false。
        if (!node.children.has(char)) {
            return false;
        }

        //根据word[index]键，去
        const shouldDeleteChild = this._deleteHelper(node.children.get(char), word, index + 1);

        if (shouldDeleteChild) {
            node.children.delete(char);
            return node.children.size === 0 && !node.isEndOfWord;
        }

        return false;
    }
}


const trie = new Trie();
trie.insert('apple');
trie.insert('banana');
trie.insert('app');
trie.delete('apple');

let key;
for (key in trie) {
    console.log(key + " =>", trie[key])
}

console.log(trie)

// console.log(trie.value)
