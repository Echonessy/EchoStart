# EchoStart
> this is demo
## Creat By Echonessy  2017.06.13
``` bash
/*****************************congfig参数说明****************************/ 
//'ele ':绑定的DOM  例如 .app  #app
//'type':数据源类型  1表示根据值展示星级评分 2表示星级操作
//'link':事件名，参数值选项 hover touch click 可以同时、单独存在；
//'data':数据源 表示星级的特定值 不填默认为0

用法
复制css里面三个类   绝对地址可根据自己修改

```

``` bash


Html:

<div id='app0'></div>


 Js:
 var RateValue1 = new EchoStart();
    RateValue1.config({
        'ele': '#app0', //绑定的DOM
        'type': 1, //数据源类型  1表示根据值展示星级评分 2表示星级操作
        'data': 3.5 //数据源
    });
```


## 效果图
![image](https://github.com/Echonessy/EchoStart/blob/master/read/1.png)