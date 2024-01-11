<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GroupCreation",
  props: {
    editingGroup: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      group: {
        name: '',
        description: '',
        rules: ''
      }
    }
  },
  methods: {
    async onCreateGroup() {
      if (Object.keys(this.editingGroup)) {
        const body = this.editingGroup
        body.name = this.group.name
        body.description = this.group.description
        body.rules = this.group.rules
        const group = await this.$store.dispatch('group/updateGroup', {id: this.editingGroup._id, body})
        if (group) {
          this.$emit('onCloseGroupCreation')
        } else {
          alert('Sửa group lỗi')
        }
      } else {
        const group = await this.$store.dispatch('group/createGroup', this.group)
        if (group) {
          this.$router.push({path: `/group/${group._id}`})
        } else {
          alert('Tạo group lỗi')
        }
      }
    }
  },
  mounted() {
    this.group.name = this.editingGroup.name
    this.group.description = this.editingGroup.description
    this.group.rules = this.editingGroup.rules
  }
})
</script>

<template>
  <div class="bold py-2">Tên:</div>
  <input type="text" class="w-full rounded" v-model="group.name">
  <div class="bold py-2">Mô tả về nhóm:</div>
  <textarea v-model="group.description" class="w-full p-2 h-70px text-sm rounded"></textarea>
  <div class="bold py-2">Nội quy:</div>
  <textarea v-model="group.rules" class="w-full p-2 h-70px text-sm rounded"></textarea>
  <button @click="onCreateGroup"
          class="border-1 p-2 mt-6 rounded bg-ll-primary dark:bg-ld-primary text-white bold hover:bg-blue-700">Cập
    nhật</button>
</template>

<style scoped>

</style>
