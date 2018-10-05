<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <router-link class="navbar-brand" :to="{name: 'home'}">tweetclone</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav mr-auto">
        </ul>
        <ul v-if="!loggedIn" class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'login'}">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'signup'}">Sign up</router-link>
          </li>
        </ul>
        <ul v-if="loggedIn" class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{user.username}}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" :to="{name: 'profile'}">Profile</router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
const URL = 'http://localhost:3000';

export default {
  data: () => ({
    loggedIn: false,
    user: 'user'
  }),
  methods: {
    checkLogged() {
      if (localStorage.token) {
        this.loggedIn = true;
      }
    },
  },
  beforeMount() {
    this.checkLogged();
  },
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
        localStorage.removeItem('token');
      }
    });
  }
};
</script>

<style>

</style>
