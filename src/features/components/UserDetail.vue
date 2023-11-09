<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "UserDetail"
})
</script>

<template>
  <div class="relative bg-ll-neutral dark:bg-ld-neutral w-full p-2 rounded">
    <img
        class="absolute border-4 rounded-full w-[150px] h-[150px] object-cover left-36 -top-20 border-ll-border dark:border-ld-border"
        src="https://cdn-v2.carpla.vn/256x/customer/avatar/ba0e7a10b2b36aed33a2-1672999012.286.jpg" alt="image">
    <div class="pt-20 font-bold text-center p-2">Pham Duc Quy</div>
    <div class="text-center p-2">Pham Duc Quy</div>
    <div class="mt-6 flex justify-between">
      <div class="text-center">
        <div class="bold text-ll-primary">Người theo dõi</div>
        <div>1</div>
      </div>
      <div class="text-center">
        <div class="bold text-ll-primary">Bài đăng</div>
        <div>2</div>
      </div>
      <div class="text-center">
        <div class="bold text-ll-primary">Lượt thích</div>
        <div>3</div>
      </div>
    </div>
    <button class="mt-8 border-1 w-full rounded-lg p-2 mt-2 border-ll-border dark:border-ld-border text-ll-primary bold hover:bg-ll-primary hover:text-white hover:dark:text-ld-neutral">Chỉnh sửa trang cá nhân</button>
  </div>
</template>

<style scoped>

</style>