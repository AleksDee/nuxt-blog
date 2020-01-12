<template>
  <section class="featured-list">
    <PostPreview
      v-for="post in posts"
      :key="post.id"
      id="post.id"
      :is-admin="isAdmin"
      :title="post.title"
    />
  </section>
</template>

<script>
import PostPreview from "~/components/Posts/PostPreview";

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      reauired: true
    }
  }
};
</script>

<style>
.featured-list {
  background-color: grey;
}
</style>