// moviePages/components/countdown/countdowm.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    backgroundColor: {
      type: String
    },
    splitorColor: {
      type: String,
      value: '#000'
    },
    showday: {
      type: Boolean,
      value: true
    },
    showhour: {
      type: Boolean,
      value: true
    },
    showminute: {
      type: Boolean,
      value: true
    },
    showsecond: {
      type: Boolean,
      value: true
    },
    day: {
      type: Number,
      value: 0
    },
    hour: {
      type: Number,
      value: 0
    },
    minute: {
      type: Number,
      value: 0
    },
    second: {
      type: Number,
      value: 0
    },
    timestamp: {
      type: Number,
      value: 0
    },
    color: {
      type: String,
      value: '#000000'
    },
    size: {
      type: String,
      value: '24rpx'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    d: '00',
    h: '00',
    m: '00',
    s: '00',
    timer: null,
    seconds: 0,
    syncFlag: false
  },

  pageLifetimes:{
    
  },
  observers: {
    day(val) {
      if(val == 0)return
      this.changeFlag()
    },
    hour(val) {
      if(val == 0)return
      this.changeFlag()
    },
    minute(val) {
      if(val == 0)return
      this.changeFlag()
    },
    second(val) {
      if(val == 0)return
      this.changeFlag()
    },
    timestamp(val) {
      if(val == 0)return
      this.changeFlag()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clearcount: function() {
      clearInterval(this.data.timer)
    },
    toSeconds: function(timestamp, day, hours, minutes, seconds) {
				if (timestamp) {
					return timestamp - parseInt(new Date().getTime() / 1000, 10)
        }
				return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds
    },
    timeUp() {
      clearInterval(this.data.timer)
      this.triggerEvent('timeup')
    },
    startData: function() {
        this.setData({
          seconds: this.toSeconds(this.data.timestamp, this.data.day, this.data.hour, this.data.minute, this.data.second)
        })
				if (this.data.seconds <= 0) {
					return
        }
        console.log(11)
        this.countDown()
        clearInterval(this.data.timer)
        this.setData({
          timer: setInterval(() => {
            this.setData({
              seconds: this.data.seconds - 1
            })
            if (this.data.seconds < 0) {
              this.timeUp()
              return
            }
            this.countDown()
          }, 1000)
        })
    },
    countDown() {
      let seconds = this.data.seconds;
      let [day, hour, minute, second] = [0, 0, 0, 0]
      if (seconds > 0) {
        day = Math.floor(seconds / (60 * 60 * 24))
        hour = Math.floor(seconds / (60 * 60)) - (day * 24)
        minute = Math.floor(seconds / 60) - (day * 24 * 60) - (hour * 60)
        second = Math.floor(seconds) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
      } else {
        this.timeUp()
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      this.setData({
        d: day,
        h: hour,
        m: minute,
        s: second
      })
    },
    changeFlag() {
      if (!this.data.syncFlag) {
        this.setData({
          seconds: this.toSeconds(this.data.timestamp, this.data.day, this.data.hour, this.data.minute, this.data.second)
        })
        this.startData();
        this.setData({
          syncFlag: true
        })
      }
    }
  }
})
