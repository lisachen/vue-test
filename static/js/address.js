new Vue({
  el: ".container",
  data: {
    addressList: [],
    limitLen: 3,
    curAddressIndex: 0,
    editMdShow: false, //是否显示编辑弹出框
    newUserName: '',
    newStreetName: '',
    newTel: '',
    curAddress: '',
    delMdShow: false,
    shippingMethod: 1, //配送方式
  },
  filters: {

  },
  computed: { //实时计算
    //截取前3个地址
    filterAddress: function() {
      var _this = this;
      //默认地址排到第一个
      this.addressList.forEach(function(item, index) {
        if (item.isDefault) {
          _this.addressList.splice(index, 1);
          _this.addressList.unshift(item);
        }
      })
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
      event.stopPropagation(); //阻止事件冒泡
      this.curAddressIndex = 0;
    },

    //编辑地址
    editMd: function(item) {
      this.editMdShow = true;
      this.newUserName = item.userName;
      this.newStreetName = item.streetName;
      this.newTel = item.tel;
      this.curAddress = item;
    },
    //添加/修改地址
    saveAdress: function() {
      var _this = this;
      if (this.curAddress == '') {
        this.addressList.unshift({ //添加到数组前面
          "addressId": "",
          "userName": this.newUserName,
          "streetName": this.newStreetName,
          "postCode": "",
          "tel": this.newTel,
          "isDefault": false
        });
        this.curAddressIndex = 1;
      } else {
        this.addressList.forEach(function(item, index) {
          if (_this.curAddress == item) {
            item.userName = _this.newUserName;
            item.streetName = _this.newStreetName;
            item.tel = _this.new_Tel;
          }
        })
      }
      this.editMdClose();
    },
    //关闭编辑框
    editMdClose: function() {
      this.editMdShow = false;
      this.newUserName = this.newStreetName = this.newTel = this.curAddress = ''; //清空表单和当前选中的地址
    },

    //删除地址
    delConfirm: function(item) {
      this.curAddress = item;
      this.delMdShow = true;
    },
    delAddress: function() {
      var index = this.addressList.indexOf(this.curAddress);
      this.addressList.splice(index, 1);
      this.delMdClose();
    },
    //关闭删除框
    delMdClose: function() {
      this.delMdShow = false;
      this.curAddress = '';
    }
  },
});