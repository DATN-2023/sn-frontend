<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GroupThumb",
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    onClickTitle() {
      this.$router.push({path: `/group/${this.$props.item.data._id}`})
    }
  }
})
</script>

<template>
  <div class="h-320px w-330px rounded rounded-xl bg-ll-neutral dark:bg-ld-neutral">
    <img class="w-330px h-180px rounded-t-lg object-fill"
         src="https://images-cdn.carpla.dev/HybridErtigajpg-1664383054.jpg" alt="image">
    <div class="mx-4 my-2">
      <div @click="onClickTitle" class="cursor-pointer">
        <div class="bold text-xl">{{ item?.data?.name || '' }}</div>
        <div>{{ `${item?.data?.memberTotal || 0} thành viên` }}</div>
      </div>
      <button
          class="border border-2 p-2 w-full rouded border-ll-border dark:border-ld-border hover:bg-ll-border hover:dark:bg-ld-border rounded-2xl my-2">
        Tham gia
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
