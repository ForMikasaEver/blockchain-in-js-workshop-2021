// "elliptic" 是一个 JavaScript 库，提供了椭圆曲线密码学的实现。
import elliptic from "elliptic";

// 这行代码创建了一个椭圆曲线实例 ec，使用的曲线类型是 "secp256k1"。"secp256k1" 是比特币和以太坊等加密货币常用的曲线类型。
const ec = new elliptic.ec("secp256k1");

// 这段代码是使用 JavaScript 实现了一个基于椭圆曲线密码学的加密功能。
export function generatePair() { // 定义了一个名为 generatePair 的导出函数，用于生成密钥对。
    const keypair = ec.genKeyPair(); // 使用 ec 实例的 genKeyPair 方法生成一个椭圆曲线密钥对。
    window.keypair = keypair; // 将生成的密钥对存储在 window.keypair 对象中，使其在全局范围内可访问。

    // 返回一个对象，包含生成的公钥和私钥。getPublic("hex") 和 getPrivate("hex") 方法分别返回以十六进制表示的公钥和私钥。
    return {
        publicKey: keypair.getPublic("hex"),
        privateKey: keypair.getPrivate("hex")
    };
}

// 定义了一个名为 sign 的导出函数，用于对消息进行签名。
export function sign(message, privateKey) {
    try {
        // 使用私钥创建一个密钥对实例 keypair，通过调用 keyFromPrivate 方法并传入私钥和格式参数 "hex"。
        const keypair = ec.keyFromPrivate(privateKey, "hex");

        // 对给定的消息进行签名，使用 sign 方法并传入消息作为参数。然后，调用 toDER("hex") 方法将签名结果转换为十六进制表示，并将其作为函数的返回值。
        return keypair.sign(message).toDER("hex");
    } catch (error) {
        return "invalid signature"; // 捕获在签名过程中可能出现的错误，并返回一个字符串 "invalid signature" 表示签名无效。
    }
}

// 定义了一个名为 verifySignature 的导出函数，用于验证签名。
export function verifySignature(message, signature, publicKey) {
    try {
        // 使用公钥创建一个密钥对实例 keypair，通过调用 keyFromPublic 方法并传入公钥和格式参数 "hex"。
        const keypair = ec.keyFromPublic(publicKey, "hex");

        // 使用 verify 方法来验证给定消息的签名是否与提供的签名匹配。返回值是一个布尔值，表示验证结果。
        return ec.verify(message, signature, keypair);
    } catch (error) {
        return false; // 捕获在验证过程中可能出现的错误，并返回布尔值 false 表示验证失败。
    }
}