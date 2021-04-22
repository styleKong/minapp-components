// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   * tabs: 选项，
   * name： 选项名称key
   * isNum： 选项是否带有数值
   * num： 选项数值key
   * tabid： 选项匹配key
   * checkid: 选中的值
   * activecolor： 选中的颜色
   * color: 选项默认颜色
   * background： 背景颜色
   * borderColor: 下划线的颜色
   * leng: 下划线长度 min 短线， default 选项宽度
   */
  properties: {
    tabs: {
      type: Array
    },
    name: {
      type: String
    },
    isNum: {
      type: Boolean,
      value: false
    },
    tabid: {
      type: String,
      value: 'id'
    },
    num: {
      type: String,
      value: 'id'
    },
    checkid: {
      type: [String,Number]
    },
    color: {
      type: String,
      value: '#000'
    },
    activeColor: {
      type: String,
      value: "#fff"
    },
    background: {
      type: String,
      value: '#fff'
    },
    borderColor: {
      type: String,
      value: '#fff'
    },
    leng: {
      type: String,
      value: 'default'
    },
    borderHeight:{
      type: String,
      value: '3rpx'
    } 
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeId: null,
  },
  observers: {
    tabs: function(data) {
      if(data.length > 0) {
        this.setData({
          typeId: this.data.checkid || this.data.tabs[0][this.data.tabid]
        })
      }
    }
  },
  ready() {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabsClick: function(e) {
      var id = e.currentTarget.id
      if(id == this.data.typeId) return;
      this.setData({
        typeId: id
      })
      this.triggerEvent('click',{id: id});
    }
  }
})
