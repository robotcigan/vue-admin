<template lang="jade">
  div
    admin-header
    .container
      .row
        .col-lg-6
          form(@submit="updatePost")
            .form-group
              label Название
              input.form-control(type="text" v-model="post.title")
            .form-group
              label Топик
              select.form-control(type="text" v-model="post.topic")
                option(v-for="topic in topics") {{ topic.title }}
            .form-group
              label Превью текст
              textarea.form-control(v-model="post.previewContent" rows=3)
            #markdown-editor.form-group
              label Подробно
              textarea.form-control(:value="input" @input="update" v-model="post.content" rows=8)
            button(type="submit").btn.btn-success Сохранить
        .col-lg-6
          h1 {{ post.title }}
          div(v-html="compiledMarkdown")
</template>

<script>
  import AdminHeader from '../Admin-header'

  export default {
    name: 'edit-post',
    components: {
      AdminHeader
    },
    data() {
      return {
        post: {},
        topics: [],
        input: ''
      }
    },

    computed: {
      compiledMarkdown: function() {
        return marked(this.input, { sanitize: true })
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
      },

      getTopics() {
        this.$http.get('http://localhost:3000/get-topics')
          .then(response => {
            this.topics = response.body.topics;
          }, response => {
            if (err) console.log(err)
          })
      },

      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300),

      updatePost(e) {
        e.preventDefault();
        let updatedPost = {
          id: this.post._id,
          title: this.post.title,
          topic: this.post.topic,
          previewContent: this.post.previewContent,
          content: this.post.content
        }
        this.$http.post('http://localhost:3000/update-post/', updatedPost)
          .then( () => {
            this.post = {}
            this.$router.push({path: '/admin'})
          }, res => {
            if (err) console.log(err)
          })
      }

    },

    created: function() {
      this.getPost(this.$route.params.id);
      this.getTopics();
    }

  }
</script>

<style></style>