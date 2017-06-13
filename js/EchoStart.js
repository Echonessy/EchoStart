/*****************************EchoStart*****Creat By Echonessy  2017.06.13*******************************/

/*****************************congfig参数说明****************************/
//'ele ':绑定的DOM  例如 .app  #app
//'type':数据源类型  1表示根据值展示星级评分 2表示星级操作
//'link':事件名，参数值选项 hover touch click 可以同时、单独存在；
//'data':数据源 表示星级的特定值 不填默认为0
/**********************************Code******************************************/
window.EchoStart = (function () {
    var RateValue = function () {
    }
    RateValue.prototype = {
        config: function (params) {
            console.log(params)
            this.link = params.params;
            this.params = params;
            this.type = params.type || 1;
            this.ele = document.querySelector(params.ele);
            //this.type 1表示根据值来获取等级  2表示针对等级操作
            switch (this.type) {
                case 1:
                    this.Fixation(params);
                    break;
                case 2:
                    this.BindEvent(params)
                    break;
                default:
                    throw new Error('错误提示: 没有这种操作类型');
                    break;
            }
        },
        //固定值对应星级
        Fixation: function (params) {
            this.Append(params);//初始化html
            this.ValueJuge(params)
        },
        //数值判断
        ValueJuge: function (params) {
            var that = this;
            //数值
            this.value = this.ValueReset(params);
            //当前星级父级
            this.ChildUl = document.querySelector(params.ele);
            //查找每个li
            this.eleli = this.ChildUl.childNodes[0].childNodes;
            //判断是否是整数
            function IsIntNumber(obj) {
                return obj % 1 === 0
            }
            if (IsIntNumber(this.value)) {
                this.Before = this.value;//前半截
                this.End = this.Before;//后半截开始
                for (var i = 0; i < this.Before; i++) {
                    that.eleli[i].className = 'Start1';
                    that.eleli[i].setAttribute('data-value', 1)
                }
                for (var i = this.End; i < 5; i++) {
                    that.eleli[i].className = 'Start0';
                    that.eleli[i].setAttribute('data-value', 0)
                }
            }
            else {
                this.Before = (this.value - 0.5);//前半截
                this.Now = this.Before;//半
                this.End = this.Now + 1;//后半截开始
                for (var i = 0; i < this.Before; i++) {
                    that.eleli[i].className = 'Start1';
                    that.eleli[i].setAttribute('data-value', 1)
                }
                that.eleli[this.Now].className = 'Start2';
                that.eleli[this.Now].setAttribute('data-value', 0.5)
                for (var i = this.End; i < 5; i++) {
                    that.eleli[i].className = 'Start0';
                    that.eleli[i].setAttribute('data-value', 0)
                }
            }
        },
        //数值界限处理
        ValueReset: function (params) {
            var that = this;
            var num = /^[0-9]+.?[0-9]*$/;
            //判断对象是否为空
            function isEmptyObject(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            }

            this.value = params.data;
            if (!isEmptyObject(this.value)) {
                this.value = 0;
            } else {
                if (num.test(this.value)) {
                    if (this.value >= 5) {
                        this.value = 5;
                    } else if (this.value <= 0) {
                        this.value = 0;
                    } else {
                        this.value;
                    }
                } else {
                    this.value = 0;
                }
            }
            return parseFloat(this.value);
        },
        //创建html
        CreatHtml: function (e) {
            this.Result = '';
            this.Result += '<ul class="RateValue">'
            for (var i = 0; i < 5; i++) {
                this.Result += '<li class="Start0" data-index="' + i + '" data-value="' + 0 + '"></li>';
            }
            this.Result += '</ul>';
            return this.Result;
        },
        //初始化html
        Append: function (e) {
            var that = this;
            that.ele.innerHTML = this.CreatHtml();
        },
        //事件
        BindEvent: function (params) {
            var that = this;
            this.Append(params);//初始化html
            //数值
            this.value = this.ValueReset(params);
            //当前星级父级
            this.ChildUl = document.querySelector(params.ele);
            //查找每个li
            this.eleli = this.ChildUl.childNodes[0].childNodes;
            //添加事件
            function AddEvent() {
                this.Now = parseInt(this.getAttribute('data-index'));//当前星星的位置
                this.After = this.Now + 1;//当前星星之后的星星
                this.className = 'Start1';
                //当前星星之前的都要填充
                for (var i = 0; i < this.Now; i++) {
                    that.eleli[i].className = 'Start1';
                    that.eleli[i].setAttribute('data-value', 1)
                }
                //当前星星之后的都要重置
                for (var i = this.After; i < 5; i++) {
                    that.eleli[i].className = 'Start0';
                    that.eleli[i].setAttribute('data-value', 0)
                }
                this.EndResult = 0;//记录最终评级值
                for (var i = 0; i < 5; i++) {
                    this.result = parseFloat(that.eleli[i].getAttribute('data-value'));
                    this.EndResult += this.result;
                }
                console.log('最终得分=' + this.EndResult)
                return this.EndResult;
            }
            //为每个li绑定事件
            this.link = params.link;
            for (var i = 0; i < this.eleli.length; i++) {
                if (this.link.indexOf('click') != -1) {
                    this.eleli[i].addEventListener('click', AddEvent);
                }
                if (this.link.indexOf('touch') != -1) {
                    this.eleli[i].addEventListener('touchstart', AddEvent);
                    this.eleli[i].addEventListener('touchmove', AddEvent);
                    this.eleli[i].addEventListener('touchend', AddEvent);
                }
                if (this.link.indexOf('hover') != -1) {
                    this.eleli[i].addEventListener('mouseover', AddEvent);
                    this.eleli[i].addEventListener('mouseout', AddEvent);
                }
            }
        }
    }
    return RateValue;
})()