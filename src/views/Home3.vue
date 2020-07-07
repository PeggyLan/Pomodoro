<template>
  <div id="home" class="text-center">
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
      <b-btn variant="primary" v-if="status != 1" @click="start">
        <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
      </b-btn>
      <b-btn variant="primary" v-if="status == 1" @click="pause">
        <font-awesome-icon :icon="['fas', 'pause']"></font-awesome-icon>
      </b-btn>
      <b-btn variant="primary" v-if="current.length > 0 || todos.length > 0" @click="finish(true)">
        <font-awesome-icon :icon="['fas', 'step-forward']"></font-awesome-icon>
      </b-btn>
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
      timer: null
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
  watch: {
    changeNum (val) {
      this.flipObjs = [
        this.$refs.flipperMinute1,
        this.$refs.flipperMinute2,
        this.$refs.flipperSecond1,
        this.$refs.flipperSecond2
      ]
      this.init()
      this.run()
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
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= 0) {
            this.finish(false)
          }
        }, 1000)
      } else {
        // 開始新倒數
        if (this.todos.length > 0) {
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
      } else {
        alert('結束')
      }
    },
    pause () {
      clearInterval(this.timer)
      this.status = 2
    },
    // 初始化数字
    init () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      const mstr = '00' + m.toString()
      const sstr = '00' + s.toString()
      const nowTimeStr = mstr.substring(1, mstr.length) + sstr.substring(1, sstr.length)
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nowTimeStr[i])
      }
    },
    // 开始计时
    run () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      const mstr = '00' + m.toString()
      const sstr = '00' + s.toString()
      const nowTimeStr = mstr.substring(1, mstr.length) + sstr.substring(1, sstr.length)
      const nextTimeStr = this.changeNum
      for (let i = 0; i < this.flipObjs.length; i++) {
        if (nowTimeStr[i] === nextTimeStr[i]) {
          continue
        }
        console.log(nowTimeStr)
        this.flipObjs[i].flipDown(nowTimeStr[i], nextTimeStr[i])
      }
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
    this.run()
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
    line-height: 102px;
    font-size: 66px;
    font-style: normal;
    vertical-align: top;
}
</style>
