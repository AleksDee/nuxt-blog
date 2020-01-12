<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  layout: "admin",
  middleware: ["check-auth", "auth"],
  components: {
    AdminPostForm
  },
  data() {
    return {
      loadedPost: {
        author: "Dmitry",
        title: "My awesome Post",
        content: "Super amazing"
      }
    };
  },
  asyncData(context) {
    axios
      .get(
        "https://nuxt-blog-54f59.firebaseio.com/posts/" +
          context.params.id +
          ".json"
      )
      .then(res => {
        return {
          loadedPost: { ...res.data, id: context.params.postId }
        };
      })
      .catch(e => context.error(e));
  },
  methods: {
    onSubmitted(editedPost) {
      debugger;
      this.$store.dispatch("editedPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>
