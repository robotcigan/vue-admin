<template lang="jade">
  div
    admin-header
    .container
      .row
        .col-lg-8.col-lg-offset-1
          h1 {{ post.title }}
          span.label.label-primary {{ post.topic }}
          p: time {{ post.createdDate }}
          div(v-html="compiledMarkdown")
</template>

<script>
  import AdminHeader from '../Admin-header'

  export default {
    name: 'view-post',
    components: {
      AdminHeader
    },
    data() {
      return {
        post: {},
      }
    },

    computed: {
      compiledMarkdown: function() {
        if (this.post.content != undefined) {
          return marked(this.post.content, { sanitize: true })
        }
      }
    },

    methods: {

      getPost(id) {
        this.$http.post('http://localhost:3000/get-post/', { id: id })
          .then(res =>{
            this.post = res.body.post;
          }, res => {
            if (err) console.log(err);
          })
      }

    },

    created: function() {
      this.getPost(this.$route.params.id);
    }

  }
</script>

<style></style>