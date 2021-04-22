// components/nav-bar/nav-bar.js
/**
 * 使用方法
 *  属性说明
 *    title 页面标题
 *    background 导航背景，未开启渐变色生效
 *    leftIcon 左侧图标 none关闭图标
 *    leftText 左侧文字
 *    leftIconSize 图标大小 仅home&&back之外的图标生效
 *    color 标题颜色
 *    backgroundHeight  渐变色高度 单位rpx
 *  当leftIcon = none, title = '',leftText = ''时slot='center'为整体插入，
 *  否则 slot='left'为左侧插入，slot='center' 为中间插入，
 *  自动避开右侧导航按钮
 * 
 */
import project from "../../apiconfig.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 背景
    background: {
      type: String,
      value: '#fff'
    },
    // 左边图标 仅能使用weUI组件库中的icon组件图标
    leftIcon: {
      type: String,
      value: ''
    },
    leftIconSize: {
      type: Number,
      value: 14
    },
    // 标题颜色
    color: {
      type: String,
      value: '#000'
    },
    // 渐变色高度
    backgroundHeight: {
      type: String,
      value: ''
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: project.statusNavBarHeight(),
    left_icon: '',
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backClick() {
      switch(this.data.left_icon){
        case 'home': 
          wx.switchTab({
            url: '/pages/index/index',
          })
          break;
        case 'back':
          if(selfBack) {
            this.triggerEvent('click');
            break;
          }
          wx.navigateBack({
            fail(err) {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        break;
        default: 
          this.triggerEvent('click');
        break;
      }
    }
  },
  ready() {
    const page = getCurrentPages();
    if(this.data.leftIcon == '') {
      if(page.length === 1) {
        this.setData({
          left_icon: 'home'
        })
      }else {
        this.setData({
          left_icon: 'back'
        })
      }
    }else {
      this.setData({
        left_icon: this.data.leftIcon
      })
    }
  }
})
