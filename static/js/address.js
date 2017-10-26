new Vue({
  el: ".container",
  data: {
    addressList: [],
    limitLen: 3,
    curAddressIndex: 0
  },
  filters: {

  },
  computed: { //实时计算
    //截取前3个地址
    filterAddress: function() {
      var _this = this;
      return _this.addressList.slice(0, this.limitLen); //slice从已有的数组中返回选定的元素,不会破坏原生数组.splice会破坏原数组
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getAddress();
    })
  },
  methods: {
    getAddress: function() {
      var _this = this;
      this.$http.get('../../data/address.json').then(function(res) {
        _this.addressList = res.data.result;
      })
    },
    //显示全部地址
    viewMore: function() {
      this.limitLen = this.addressList.length;
    },
    //设为默认
    setDefault: function(item) {
      this.addressList.forEach(function(item, index) {
        item.isDefault = false;
      })
      item.isDefault = true;
    }
  },
});