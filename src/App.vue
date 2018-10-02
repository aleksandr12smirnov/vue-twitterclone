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
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'login'}">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'signup'}">Sign up</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>

</style>
