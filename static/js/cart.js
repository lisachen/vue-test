new Vue({
  el: "#app",
  data: {
    productList: [],
    isCheckedAll: false,
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
      return item.productQuantity = item.productQuantity < 1 ? 0 : item.productQuantity;
    },
    //单选
    checkProduct: function(item) {
      //判断是否存在isChecked
      if (typeof item.isChecked == "undefined") {
        //Vue.set是全局注册
        this.$set(item, 'isChecked', true); //局部注册对象属性
      } else {
        item.isChecked = false;
      }
    },
    //全选、取消全选
    checkAllProduct: function() {
      var _this = this;
      this.isCheckedAll = !this.isCheckedAll;
      this.productList.forEach(function(item, index) {
        item.isChecked = _this.isCheckedAll;
      })
    }
  },
});