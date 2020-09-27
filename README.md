# 树莓派环境监测系统
### 引用
- Vuetify框架
- vue-echarts(echarts)图表
- vue-axios(axios)获取后台数据
- jsencrypt RSA加密
- vue-particles背景
- live2d-widget看板娘

### 加密策略
1. 由前台向Api发起请求获取RSA公钥
2. 获取公钥后前台向Api发起登录请求，携带RSA公钥加密后的登录信息
3. Api接收到请求后RSA私钥解密登录信息，然后AES加密登录信息
4. 将AES加密后数据与数据库中用户信息对比，如果无误，返回前台携带用户身份及角色的jwt
5. 前台获取用户信息，删除信息，修改信息等均需携带jwt
6. 后台可根据需要控制特定用户身份或特定角色等执行权限

### 预览
![environmentRefresh](https://github.com/NullObjects/environment/blob/master/images/Environment-refresh.png)
-----
![environmentLog](https://github.com/NullObjects/environment/blob/master/images/Environment-log.png)
-----
![deviceStatusRefresh](https://github.com/NullObjects/environment/blob/master/images/DeviceStatus-refresh.png)
-----
![deviceStatusLog](https://github.com/NullObjects/environment/blob/master/images/DeviceStatus-log.png)
-----
![about](https://github.com/NullObjects/environment/blob/master/images/About.png)
-----

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
