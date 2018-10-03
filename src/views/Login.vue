<template>
  <div class="login container pt-5">
    <div v-if="onLogin" class="text-center">
      <img src="../assets/loading.svg" alt="loading">
    </div>
    <div v-if="dangerMsg" class="alert alert-danger" role="alert">
      {{ dangerMsg }}
    </div>
    <form v-if="!onLogin" @submit.prevent="login">
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
import Joi from 'joi';

const URL = 'http://localhost:3000';
const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(8).max(20).required(),
  password: Joi.string().trim().min(8).required(),
});

export default {
  data: () => ({
    dangerMsg: '',
    onLogin: false,
    user: {
      username: '',
      password: ''
    }
  }),
  watch: {
    user: {
      handler() {
        this.dangerMsg = ''
      },
      deep: true
    }
  },
  methods: {
    login() {
      this.dangerMsg = '';
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password
        };

        this.onLogin = true;
        fetch(`${URL}/api/login`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json'
          }
        }).then((res) => {
          if(res.ok) {
            return res.json();
          }

          return res.json().then((error) => {
            throw new Error(error.message);
          });

        }).then((user) => {
          if (user !== undefined) {
            setTimeout(() => {
              this.onLogin = false;
              console.log(user);  
              this.$router.push('/');
            }, 1500);
          }
        }).catch((error) => {
          setTimeout(() => {
            this.onLogin = false;
            this.dangerMsg = error.message;
            console.log(error)
          }, 1500);
        });
      }
    },
    validUser() {
      const validResult = Joi.validate(this.user, schema);

      if (validResult.error === null) {
        return true;
      }

      this.dangerMsg = 'Login failed';
      return false;
    }
  }
};
</script>
