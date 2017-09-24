<template lang="jade">
  div
    admin-header
    .container
      .row
        .col-lg-4(v-for="post in posts")
          section.panel.panel-default
            .panel-body
              h3 {{ post.title }}
              span.label.label-primary {{ post.topic }}
              p: time {{ post.createdDate }}
              p {{ post.previewContent }}
              router-link(:to="{ path: '/admin/post/' + post._id }") Подробнее →
            .panel-footer
                router-link(:to="{ path: '/admin/edit-post/' + post._id }").btn.btn-primary Редактировать
                &nbsp;
                button.btn.btn-danger(@click="deletePost(post._id)") Удалить
</template>

<script>

import AdminHeader from './Admin-header'

export default {
  name: 'admin',
  components: {
    AdminHeader
  },
  data () {
    return {
      posts: []
    }
  },
  methods: {

    getPosts() {
      this.$http.get('http://localhost:3000/get-posts')
        .then(res => {
          this.posts = res.body.posts;
        }, res => {
          if (err) console.log(err)
        })
    },

    deletePost(id) {
      this.$http.post('http://localhost:3000/delete-post/', {id: id})
        .then(res => {
          console.log(res)
        }, res => {
          if (err) console.log(err)
        })
    }

  },
  created: function() {
    this.getPosts();
  },
  updated: function() {
    this.getPosts();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
