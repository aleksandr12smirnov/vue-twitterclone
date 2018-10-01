<template>
  <div class="home">
    <div class="jumbotron">
      <h1 class="display-4">tweetclone</h1>
      <p class="lead">
        Maybe a Twitter clone
      </p>
      <hr class="my-4">
      <router-link
        class="btn btn-primary btn-lg"
        role="button"
        :to="{name: 'signup'}"
        >
        Sign up!
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>
