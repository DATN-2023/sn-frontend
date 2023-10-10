<template>
  <div class="bg-fixed h-full flex flex-row justify-center items-center"
       style="background-image: url(/src/assets/images/login/pexels-photo.jpg)">
    <div class="bg-white rounded-md p-6">
      <h1 class="p-2 rounded-md text-2xl text-center">Sign In</h1>
      <div for="phone" class="my-2 font-bold">Số điện thoại</div>
      <div class="my-2">
        <input name="phone" type="text" class="border-black border rounded" v-model="phone">
      </div>
      <button class="bg-sky-500 mt-2 p-2 rounded w-full" @click="login">Đăng nhập</button>
    </div>
  </div>
</template>

<script>
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
export default {
  name: "Login",
  data() {
    return {
      phone: ''
    }
  },
  methods: {
    login() {
      const auth = getAuth();
      console.log(auth)
      getRedirectResult(auth)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }
  },

}
</script>

<style scoped>

</style>
