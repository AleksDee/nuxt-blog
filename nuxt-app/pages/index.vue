<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <section class="featured-posts">
      <PostList :posts="loadedPost" />
    </section>
  </div>
</template>

<script>
export default {
  created() {
    // setTimeout(() => {
    //   this.loadedPosts = [
    //     {
    //       id: 1,
    //       title: "first post",
    //       previewText: "this is our first post"
    //     }
    //   ];
    // }, 1500);
  },
  computed: {
    loadedPost() {
      let test = this.$store.getters.loadedPost;
      return this.$store.getters.loadedPost;
    }
  }
  // asyncData(context, callback) {
  //   console.log("asyncData is executed!");
  //   setTimeout(() => {
  //     callback(null, {
  //       loadedPost: [
  //         {
  //           id: 1,
  //           title: "first post",
  //           previewText: "this is our first post"
  //         }
  //       ]
  //     });
  //   }, 1500);
  // }
  // data() {
  //   return {
  //     loadedPosts: []
  //   };
  // }
};
</script>

<style scoped>
.featured-posts {
  background-color: grey;
}

.intro {
  background-image: url("~assets/images/img-bg.jpg");
  background-position: center;
  background-size: cover;
}
</style>

