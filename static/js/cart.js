new Vue({
  el: "#app",
  data: {
    productList: []
  },
  filters: {
    moneyFormat:function(num){
      return '￥ '+num.toFixed(2);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getProduct();
    })
  },
  methods: {
    getProduct: function() {
      var _this = this;
      _this.$http.get('../../data/cartData.json').then(function(res) {
        _this.productList = res.data.result.list;
      })
    }
  },
});