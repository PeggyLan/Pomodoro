<template>
  <div id="home" class="text-center">
    <h2>{{ currentText }}</h2>
    <!-- <h3>{{ timetext }}</h3> -->
      <div class="mt-5">
      <flip-clock ref="flipclock" :options="options"/>
      </div>
      <div class="mt-3">
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
        digit: 5,
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
    // timetext () {
    //   const m = Math.floor(this.timeleft / 60)
    //   const s = Math.floor(this.timeleft % 60)
    //   return `${m} : ${s}`
    // },
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
          // this.options.digit = parseInt(this.timetext)
          console.log(this.timeleft)
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
      }
    },
    pause () {
      clearInterval(this.timer)
      this.status = 2
    }
  }
}
</script>
