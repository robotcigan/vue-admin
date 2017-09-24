<template lang="jade">
  div
    admin-header
    .container
      .row
        .col-lg-6
          form(@submit="savePost")
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
    name: 'add-new-post',
    components: {
      AdminHeader
    },
    data() {
      return {
        post: {
          topic: 'Верстка'
        },
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

      getTopics() {
        this.$http.get('http://localhost:3000/get-topics')
          .then(response => {
            this.topics = response.body.topics;
          }, response => {
            if (err) next(err)
          })
      },

      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300),

      savePost(e) {
        e.preventDefault();
        let newPost = {
          title: this.post.title,
          topic: this.post.topic,
          previewContent: this.post.previewContent,
          content: this.post.content
        }
        this.$http.post('http://localhost:3000/save_post', newPost)
          .then( () => {
            this.post = {}
            this.$router.push({path: '/admin'})
          })
      }

    },

    created: function() {
      this.getTopics();
    }

  }
</script>

<style></style>