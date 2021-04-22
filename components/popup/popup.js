// components/self-popup/self-popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹出位置
    type: {
      type: String,
      value: 'center',
    },
    // 是否显示阴影
    shadow: {
      type: Boolean,
      value: true
    },
    // 点击阴影是否关闭弹窗
    shadowcancel: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false, // 显示弹出
    animation: null, // 弹窗动画
    shadowAnimation: null, // 遮罩动画
  },

  /**
   * 组件的方法列表
   */
  methods: {
    open() {
      this.setData({
        show: true
      })
      var animation = wx.createAnimation({
        duration: 200,
      });
      this.shadow();
      switch(this.data.type) {
        case 'center':
           this.center(animation);
          break;
        case 'top':
          this.top(animation);
          break;
        case 'bottom':
          this.bottom(animation);
          break;
      }
    },
    // 遮罩动画
    shadow() {
      const animation = wx.createAnimation({
        duration: 100,
      })
      animation.backgroundColor('rgba(0,0,0,0.4)').step();
      this.setData({
        shadowAnimation: animation
      })
    },
    // 中间弹出样式
    center(animation) {
      animation.scale(1).step();
      this.setData({
        animation: animation.export()
      })
    },
    // 从顶部弹出
    top(animation) {
      animation.translateY(0).step();
      this.setData({
        animation: animation.export()
      })
    },
    // 从底部弹出
    bottom(animation) {
      this.top(animation)
    },
    // 关闭弹窗
    close() {
      this.setData({
        show: false,
        animation: null,
        shadowAnimation: null
      })
      this.triggerEvent('cancel')
    }
  }
})
