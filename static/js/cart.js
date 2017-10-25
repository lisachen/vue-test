new Vue({
  el: "#app",
  data: {
    productList: [],
    isCheckedAll: false,
    totalMoney: 0,
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
    }
  },
});

Vue.filter('moneyToFormat', function(value, type) {
  return '￥ ' + value.toFixed(2) + type;
})