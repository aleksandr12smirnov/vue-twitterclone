<template>
  <div class="signup container pt-5">
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Enter a username"
          v-model="user.username"
          required
        >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        >
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {
      username: '',
      password: ''
    }
  }),
  methods: {
    signup() {
      console.log('User object', this.user);
      console.log('Username:', this.user.username);
      console.log('Password:', this.user.password);

      console.log('Forms was submitted!');
    }
  }
};
</script>
