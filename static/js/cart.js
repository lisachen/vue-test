new Vue({
  el: "#app",
  data: {
    productList: [],
    isCheckedAll: false,
    totalMoney: 0,
    isShowMd: false, //是否显示删除弹出框
    curProductList: [],
  },
  filters: {
    //金额格式化
    moneyFormat: function(num) {
      return '￥ ' + num.toFixed(2);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getProduct();
    })
  },
  methods: {
    //获取商品列表
    getProduct: function() {
      var _this = this;
      _this.$http.get('../../data/cartData.json').then(function(res) {
        _this.productList = res.data.result.list;
      })
    },
    //商品数量加减
    changeQuantity: function(item, way) {
      item.productQuantity = item.productQuantity + way;
      item.productQuantity = item.productQuantity < 1 ? 0 : item.productQuantity;
      this.calcTotalMoney();
    },
    //单选
    checkProduct: function(item) {
      //判断是否存在isChecked
      if (typeof item.isChecked == "undefined") {
        //Vue.set是全局注册
        this.$set(item, 'isChecked', true); //局部注册对象属性
      } else {
        item.isChecked = !item.isChecked;
        if (!item.isChecked) { //如果全选状态下，取消单品选择
          this.isCheckedAll = false;
        }
      }
      this.calcTotalMoney();
    },
    //全选、取消全选
    checkAllProduct: function() {
      var _this = this;
      this.isCheckedAll = !this.isCheckedAll;
      this.productList.forEach(function(item, index) {
        if (typeof item.isChecked == "undefined") {
          _this.$set(item, 'isChecked', true); //局部注册对象属性
        } else {
          item.isChecked = _this.isCheckedAll;
        }
      })
      this.calcTotalMoney();
    },
    //计算总金额
    calcTotalMoney: function() {
      var _this = this;
      _this.totalMoney = 0;
      this.productList.forEach(function(item, index) {
        if (item.isChecked) {
          _this.totalMoney += item.productPrice * item.productQuantity;
        }
      })
    },
    //删除
    delConfirm: function(item) {
      var _this = this;
      this.isShowMd = true;
      console.log(item);
      if (typeof item == 'undefined') {
        this.productList.forEach(function(item, index) {
          if (item.isChecked) {
            _this.curProductList[index] = item;
          }
        })
      } else {
        this.curProductList[0] = item;
      }
    },
    delProduct: function() {
      var _this = this;
      this.curProductList.forEach(function(item, index) {
        var index = _this.productList.indexOf(item);
        _this.productList.splice(index, 1);
      })
      this.isShowMd = false;
      this.curProductList = [];
      this.totalMoney = 0;
    },
  },
});

Vue.filter('moneyToFormat', function(value, type) {
  return '￥ ' + value.toFixed(2) + type;
})