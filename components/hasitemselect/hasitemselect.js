// components/hasitemselect/hasitemselect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    select: {
      type: Array,
    },
    background: {
      type: String,
      value: '#fff'
    },
    color: {
      type: String,
      value: '#000'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeid: {},
    shadowTop: 0, //遮罩层位置
    shadowLeft: 0,//遮罩层位置
    current: null,
    unfold: false
  },
  /**
   * 组件在视图层布局完成
   */
  ready() {
    const _this = this;
    // 获取到select在页面的位置，计算出shadow的高度和位置
    const query = wx.createSelectorQuery().in(this)
    query.select('.select').boundingClientRect((ret) => {
      console.log(ret)
      _this.setData({
        shadowTop: ret.height + ret.top,
        shadowLeft: ret.left
      })
    }).exec()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    selectClick: function(e) {
      var index = e.currentTarget.dataset.index;
      if(index === this.data.current) {
        this.closeSelect()
        return
      }
      this.setData({
        current: e.currentTarget.dataset.index
      })
    },
    /**
     * 点击选项
     */
    itemClick: function(e) {
      var index = e.currentTarget.dataset.index;
      var select = this.data.select;
      // 子项变化才修改值和返回索引
      if(index != select[this.data.current].index){
        select[this.data.current].index = index;
        var data = []
        select.forEach((item,index) => {
          data[index] = item.index
        })
        // 返回每个下拉子项索引
        this.triggerEvent('change',{value: data})
      }
      this.setData({
        select: select
      })
      this.closeSelect()
    },
    /**
     * 关闭select 下拉
     */
    closeSelect: function() {
      console.log(11)
      this.setData({
        current: null
      })
    },
    arrowClick: function() {
      this.setData({
        unfold: !this.data.unfold
      })
    }
  }
})
