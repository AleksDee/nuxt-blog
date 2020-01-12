<template>
  <div class="posts-page">
    <PostList />
  </div>
</template>

<script>
export default {
  middleware: "log",
  computed: {
    loadedPost() {
      return this.$store.getters.loadedPost;
    }
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.featured-posts {
  background-color: grey;
}
</style>
