<template>
  <div id="home" class="text-center">
    <h2>{{ currentText }}</h2>
    <h3 style="visibility:hidden">{{ timetext }}</h3>
      <div>
      <flip-clock ref="flipclock" :options="options"/>
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
    <!-- <button @click="reset">reset with options</button>
    <button @click="changeOptions">change options</button>
    <button @click="stop">stop</button>
    <button @click="stopReset">stop and reset</button> -->
  </div>
</template>
<script>
import { FlipClock } from '@mvpleung/flipclock'
export default {
  data () {
    return {
      // 0 = 停止
      // 1 = 播放
      // 2 = 暫停
      status: 0,
      timer: 0,
      options: {
        digit: 1500,
        countdown: true,
        clockFace: 'MinuteCounter',
        // autoPlay: false,
        autoStart: false
      }
    }
  },
  components: {
    FlipClock
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
  methods: {
    start () {
      var mm = parseInt(this.timetext.toString().slice(0, this.timetext.toString().indexOf(':')))
      var ss = parseInt(this.timetext.toString().slice(-2))
      if (this.status === 2) {
        this.options.digit = mm * 60 + ss
        // 暫停後繼續
        this.options.autoStart = true
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
          this.options.digit = mm * 60 + ss
          this.options.autoStart = true
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
        var mm = parseInt(this.timetext.toString().slice(0, this.timetext.toString().indexOf(':')))
        var ss = parseInt(this.timetext.toString().slice(-2))
        this.options.digit = mm * 60 + ss
        this.options.autoStart = false
      }
    },
    pause () {
      clearInterval(this.timer)
      this.status = 2

      var mm = parseInt(this.timetext.toString().slice(0, this.timetext.toString().indexOf(':')))
      var ss = parseInt(this.timetext.toString().slice(-2))
      this.options.digit = mm * 60 + ss
      this.options.autoStart = false
    }
  }
}
</script>
