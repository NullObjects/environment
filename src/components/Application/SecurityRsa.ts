import { JSEncrypt } from "jsencrypt";

export default class SecurityRsa {
  /**
   * 加密
   * @param source
   * @constructor
   */
  Encrypt(source: string): string {
    const jse = new JSEncrypt();
    const pubKey = window.localStorage["pubKey"];
    jse.setPublicKey(pubKey);
    return jse.encrypt(source);
  }
}
