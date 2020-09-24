// import "jsencrypt";
// // import JSEncrypt from "jsencrypt";
// //加密
// //str 未加密字符串
// export function getEncryCode(str) {
//     let pubKey = window.localStorage["pubKey"];
//
//   jse.setPublicKey(pubKey);
//   let data = jse.encrypt(str.toString()); // 进行加密
//   return data;
// }
//
// //解密
// //params 待解密字符串
// export function sendEncryCode(params) {
//   //实例化JSEncrypt
//   let jse = new JSEncrypt();
//   //使用前端私钥解密（私钥由服务端生成）
//   let privKey = `-----BEGIN PRIVATE KEY-----
//     MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAKYGNM2g1siOtlWg
//     S3k4E0zrNn/INnvCC/ncDp6RO4Cyp8neNeYsLs+qqsnGCqoN/aXvYKdELxnEgCSJ
//     QGYgr8UgOuWoIE+XWHRibyo8uZS6/mXfGaGVvr5r+/bbjjg9b9TpSvSXUG9sKiuu
//     xZXeV4UV8tnmhPiar2NfORAu/wXrAgMBAAECf0qUfyPgHJv7f+z3FPBfQExNXS4J
//     wm/Vu4uCTw7sLs6hcr48E/pR3rVq9U2uqRu7LTZdUg3Rk1b/7pB7F3LJPCuX5n/t
//     nqcEWfWoyAc6wnVLffxkvx7toD7nMl7+2/LsUgSiY/QFdG43dKs+5rXuEOOwcZV/
//     tLdivN9SEN44mEECQQDXls/rpMPYnd0IHHqh6YZEA3dH1CZAWeW/4XF/BINW/02m
//     jtoNr+sTcZN9ekaLFTQnF/jJRi35dNwGhroG+k/hAkEAxST9oYDugGPTbu81JU1p
//     nO8tLQPHvpVu3lGQEFahWZi6j70FlhNEhX74lDLrhvTOI4ohzHX28pU5TbQkiyl/
//     SwJBALxQseHmFGR80HurVLtlnrB+TozhlWAUpolLRbZrnMY7T/qzQWk/Rxm+1dR/
//     IGuQ4/NaDyjRMot6Nk9FE+3QbEECQQCXib+MDVdHSXSUqTro2YB9KTxIhcdcL/Fw
//     4rEiXfTYshV1t447tcPN+bOJ9zokGrj5iIxCZcrU3O+XUwlkDxnRAkArwYiJZFlS
//     Lu9zj+e03+kGWu6c/x8RRoLqfZcWFffBZlkxOHa06aN6jYCdJtRON43JUbynMvDY
//     l5glkcwnZlbi
//     -----END PRIVATE KEY-----`;
//
//   jse.setPrivateKey(privKey);
//   let data = jse.decrypt(params); //解密
//
//   return data;
// }
