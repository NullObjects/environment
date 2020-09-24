declare module "jsencrypt" {
  export class JSEncrypt {
    constructor();
    setPrivateKey(priKey: string): void;
    setPublicKey(pubKey: string): void;
    encrypt(source: string): string;
    decrypt(source: string): string;
  }
}
