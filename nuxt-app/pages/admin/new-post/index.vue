<template>
  <div class="admin-new-post">
    <section class="new-post-form">
      <form @submit.prevent="onSave">
        <AdminPostForm @submit="onSubmitted"></AdminPostForm>
      </form>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  middleware: ["check-auth", "auth"],
  components: {
    AdminPostForm
  },
  methods: {
    onSubmitted(postData) {
      this.$store.dispatch("addPost", postData).then(() => {
        this.$router.push("/admin");
      });
      // axios
      //   .post("https://nuxt-blog-54f59.firebaseio.com/posts.json", {
      //     ...postData,
      //     updatedDate: new Date()
      //   })
      //   .then(result => {
      //     this.$router.push("/admin");
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
    }
  }
};
</script>
