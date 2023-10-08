<template>
  <div class="bg-fixed h-full flex flex-row justify-center items-center"
       style="background-image: url(/src/assets/images/login/pexels-photo.jpg)">
    <div class="bg-white w-1/6 h-1/4 rounded-md">
      <h1 class="p-4 rounded-md">Sign In</h1>
      <label for="phone" >Nhập số điện thoại của bạn</label>
      <div>
        <input name="phone" type="text" class="border-black border">
      </div>
      <button>Đăng nhập</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>

</style>
