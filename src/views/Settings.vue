<template>
  <div id="settings" class="row">
    <div class="col p-2">
      <b-table :items="items" :fields="fields" @row-clicked="selectAlarm">
        <template v-slot:cell(preview)="data">
          <audio controls :src="'./alarms/'+data.item.file"></audio>
        </template>
        <template v-slot:cell(select)="data">
          <font-awesome-icon v-if="data.item.file == alarm" :icon="['fas', 'check']"></font-awesome-icon>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          name: '修理紗窗',
          file: 'haha.mp3'
        },
        {
          name: '獅子王',
          file: 'lionking.mp3'
        },
        {
          name: '小朋友 你是否有很多問號?',
          file: 'child.mp3'
        },
        {
          name: 'shape of you',
          file: 'whatsapp.mp3'
        }
      ],
      fields: [
        {
          key: 'name',
          label: '名稱'
        },
        {
          key: 'preview',
          label: '預覽'
        },
        {
          key: 'select',
          label: '選擇'
        }
      ]
    }
  },
  computed: {
    alarm () {
      return this.$store.getters.alarm
    }
  },
  methods: {
    selectAlarm (item) {
      this.$store.commit('selectAlarm', item.file)
    }
  }
}
</script>
