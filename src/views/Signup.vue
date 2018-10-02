<template>
  <div class="signup container pt-5">
    <div v-if="signingup" class="text-center">
      <img src="../assets/loading.svg" alt="loading">
    </div>
    <div v-if="warningMsg" class="alert alert-warning" role="alert">
      {{ warningMsg }}
    </div>
    <div v-if="dangerMsg" class="alert alert-danger" role="alert">
      {{ dangerMsg }}
    </div>
    <form v-if="!signingup" @submit.prevent="signup">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter a email"
          v-model="user.email"
          required
        >
      </div>
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
  email: Joi.string().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).required(),
  username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(8).max(20).required(),
  password: Joi.string().trim().min(8).required(),
  state: Joi.bool().required()
});

export default {
  data: () => ({
    warningMsg: '',
    dangerMsg: '',
    signingup: false,
    user: {
      email: '',
      username: '',
      password: '',
      state: true,
    }
  }),
  watch: {
    user: {
      handler() {
        this.warningMsg = '',
        this.dangerMsg = ''
      },
      deep: true,
    }
  },
  methods: {
    signup() {
      if (this.validUser()) {
        const body = {
          email: this.user.email,
          username: this.user.username,
          password: this.user.password,
          state: this.user.state
        };

        this.signingup = true;
        fetch(`${URL}/api/signup`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json'
          }
        }).then((res) => {
          if (res.ok) {
            return res.json();
          }

          return res.json().then((error) => {
            throw new Error(error.message);
          });

        }).then((user) => {
          if (user !== undefined) {
            setTimeout(() => {
              this.signingup = false;
              console.log(user);
              this.$router.push('/login');
            }, 1500);
          }
        }).catch((error) => {
          setTimeout(() => {
            this.signingup = false;
            this.dangerMsg = error.message;
            console.error(error);
          }, 1500)
        });
      }
    },
    validUser() {
      const validResult = Joi.validate(this.user, schema);

      if (validResult.error === null) {
        return true;
      }

      if (validResult.error.message.includes('email')) {
        this.warningMsg = 'That is not a valid email';
      } else if (validResult.error.message.includes('username')) {
        this.warningMsg = 'That is not a valid username';
      } else {
        this.warningMsg = 'That is not a valid password';
      }

      return false;
    },
  },
};
</script>
