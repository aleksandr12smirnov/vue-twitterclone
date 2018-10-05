<template>
  <div class="container pt-5">
    <h5 v-if="!user">Getting user information....</h5>
    <h3 v-if="user">Hello! {{ user.username }}</h3>
  </div>
</template>

<script>
const URL = 'http://localhost:3000';

export default {
  data: () => ({
    user: null
  }),
  mounted() {
    fetch(`${URL}/api/auth`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then(res => res.json())
    .then(result => {
      if (result.user) {
        this.user = result.user;
      } else {
        location.reload();
        localStorage.removeItem('token');
        this.$router.push('/login');
      }
    });
  }
};
</script>

<style>

</style>
