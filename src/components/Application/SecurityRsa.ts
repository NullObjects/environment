import { JSEncrypt } from "jsencrypt";

export default class SecurityRsa {
  /**
   * 加密
   * @param source
   * @constructor
   */
  static Encrypt(source: string): string {
    const jse = new JSEncrypt();
    const pubKey = window.localStorage["pubKey"];
    jse.setPublicKey(pubKey);
    return jse.encrypt(source);
  }

  /**
   * 解密
   * @param source
   * @constructor
   */
  static Decrypt(source: string): string {
    const jse = new JSEncrypt();
    const priKey = ``;
    jse.setPrivateKey(priKey);
    return jse.decrypt(source);
  }
}
