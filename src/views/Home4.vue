<template>
  <div id="home" class="text-center mt-5">
    <!-- <div>
        <flip-clock ref="flipclock" :options="options"/>
    </div> -->
    <h2>{{ currentText }}</h2>
    <h3>{{ timetext }}</h3>
    <div class="FlipClock">
      <Flipper ref="flipperMinute1" />
      <Flipper ref="flipperMinute2" />
      <em>:</em>
      <Flipper ref="flipperSecond1" />
      <Flipper ref="flipperSecond2" />
    </div>
      <div class="mt-3">
        <b-btn variant="danger" v-if="status != 1" @click="start" class="btn-lg">
          <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
        </b-btn>
        <b-btn variant="danger" v-if="status == 1" @click="pause" class="btn-lg">
          <font-awesome-icon :icon="['fas', 'pause']"></font-awesome-icon>
        </b-btn>
        <b-btn variant="danger" v-if="current.length > 0 || todos.length > 0" @click="finish(true)" class="btn-lg">
          <font-awesome-icon :icon="['fas', 'step-forward']"></font-awesome-icon>
        </b-btn>
      </div>
    </div>
</template>
<script>
import Flipper from '../components/Flipper.vue'

export default {
  name: 'FlipClock',
  data () {
    return {
      flipObjs: [],
      status: 0,
      timer: null,
      timer_num: null
    }
  },
  computed: {
    currentText () {
      return this.current.length > 0 ? this.current : this.todos.length > 0 ? '點擊開始' : '請新增事項'
    },
    timetext () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m} : ${s}`
    },
    alarm () {
      return this.$store.getters.alarm
    },
    timeleft () {
      return this.$store.getters.timeleft
    },
    current () {
      return this.$store.getters.current
    },
    todos () {
      return this.$store.getters.todos
    }
  },
  components: {
    Flipper
  },
  methods: {
    start () {
      if (this.status === 2) {
        // 暫停後繼續
        this.status = 1
        this.nowTimeStr = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= 0) {
            this.finish_num(false)
          }
        }, 1000)
      } else {
        // 開始新倒數
        if (this.todos.length > 0) {
          this.run()
          this.$store.commit('start')
          this.status = 1
          this.timer = setInterval(() => {
            this.$store.commit('countdown')
            if (this.timeleft <= 0) {
              this.finish(false)
            }
          }, 1000)
        }
      }
    },
    finish_num (skip) {
      clearInterval(this.timer_num)
      if (this.todos.length > 0) {
        this.init()
        this.run()
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish')

      if (!skip) {
        const audio = new Audio()
        audio.src = './alarms/' + this.alarm
        audio.play()
      }

      if (this.todos.length > 0) {
        this.start()
        this.run()
      } else {
        alert('結束')
      }
    },
    pause () {
      clearInterval(this.timer_num)
      this.status = 2
    },
    // 初始化数字
    init () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      var mstr = '0' + m.toString()
      var sstr = '0' + s.toString()
      if ((m.toString().length) > 1) {
        mstr = m.toString()
      }
      if ((s.toString().length) > 1) {
        sstr = s.toString()
      }
      const nowTimeStr = mstr + sstr
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nowTimeStr[i])
      }
    },
    // stop () {
    //   const audio = new Audio()
    //   audio.src = './alarms/' + this.alarm
    //   audio.play()
    // },
    // 开始计时
    run () {
      var m = Math.floor(this.timeleft / 60)
      var s = Math.floor(this.timeleft % 60)
      var mstr = '0' + m.toString()
      var sstr = '0' + s.toString()
      this.timer_num = setInterval(() => {
      // 获取当前时间
      //   const now = new Date()
      //   console.log(now.getTime())
      //   console.log(now.getTime() - 1000)
      //   if (val === 1) {
      //   }
      //   var mstr = '0' + m.toString()
      //   var sstr = '0' + s.toString()
        if ((m.toString().length) > 1) {
          mstr = m.toString()
        }
        if ((s.toString().length) > 1) {
          sstr = s.toString()
        }
        const nowTimeStr = mstr + sstr
        console.log(sstr)
        // console.log(mstr)
        if (parseInt(sstr) > 0 || parseInt(mstr) > 0) {
          if (parseInt(sstr) === 0) {
            mstr = parseInt(sstr) - 1 < 0 ? (parseInt(mstr) - 1).toString() : mstr
          }
          sstr = parseInt(sstr) - 1 < 0 ? 60 : parseInt(sstr) - 1
        } else {
          this.finish_num(false)
        }
        if ((mstr.toString().length) > 1) {
          mstr = mstr.toString()
        } else {
          mstr = '0' + mstr.toString()
        }
        if ((sstr.toString().length) > 1) {
          sstr = sstr.toString()
        } else {
          sstr = '0' + sstr.toString()
        }
        console.log(sstr)
        console.log('sstrsstrsstrsstrsstrsstrsstr')
        const nextTimeStr = mstr + sstr
        // console.log(nowTimeStr)
        // console.log(nextTimeStr)
        for (let i = 0; i < this.flipObjs.length; i++) {
          if (nowTimeStr[i] === nextTimeStr[i]) {
            continue
          }
          this.flipObjs[i].flipDown(
            nowTimeStr[i],
            nextTimeStr[i]
          )
          m = mstr
          s = sstr
        }
      }, 1000)
    }
  },
  mounted () {
    this.flipObjs = [
      this.$refs.flipperMinute1,
      this.$refs.flipperMinute2,
      this.$refs.flipperSecond1,
      this.$refs.flipperSecond2
    ]
    this.init()
    // this.run()
  }
}
</script>
<style>
.FlipClock {
    text-align: center;
}
.FlipClock .M-Flipper {
    margin: 0 3px;
}
.FlipClock em {
    display: inline-block;
    line-height: 120px;
    font-size: 200px;
    font-style: normal;
    vertical-align: top;
}
</style>
