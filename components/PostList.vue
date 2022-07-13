<template>
  <div class="main">
    <div v-for="post in posts" class="card">
      <header class="card-header">
        <div class="card-title">
          <img class="photo_default" :src="photoUrl" alt="Image du profil d'un utilisateur" />
          {{ post.user.name }} {{ post.user.last_name }}<br>
          <span>posté {{ moment(post.createdAt).locale("fr").fromNow() }}</span>
        </div>
        <div class="card-button">
          <button v-if="post.userId == user" class="card-btn" :id="post.id" @click="modifyPost(post.id)">
            <i class="fas fa-edit" aria-hidden="true"></i>
          </button>
          <button v-if="post.userId == user || admin === 'true'" class="card-btn" :id="post.id"
            @click="deletePost(post.id)">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </header>
      <div class="card-body">

        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-content">
          {{ post.content }}
        </p>
        <img :src="post.attachment" @change="fileUpload($event)" class="fullwidth" />
      </div>
      <div class="card-btn" id="card-like">
        <div class="interaction">
          <Likes :postId="post.id" :userId="userId" />
        </div>
      </div>
      <div class="card-footer">
        <div class="card-comments">
          <CommentList :postid="post.id" />
        </div>
        <div class="card-comment-create">
          <CommentCreate :id="post.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let moment = require("moment");
import axios from 'axios';
import Likes from "@/components/Likes.vue";
import CommentList from '@/components/CommentList.vue';
import CommentCreate from '@/components/CommentCreate.vue';
import photoDefaultUrl from '@/assets/avatar_default.png';
import router from '@/router';

export default {
  name: 'PostList',
  components: {
    CommentList,
    CommentCreate,
    Likes,
  },
  data() {
    return {
      posts: [],
      photoUrl: photoDefaultUrl,
      photoUrlToUpload: '',
      like: null,
      user: localStorage.getItem('userId'),
      admin: localStorage.getItem('admin'),
      moment: moment,

    };
  },
  
  async created() {
    this.emitter.on('post-refresh', this.loadPosts);
    this.emitter.on('comment-created', this.loadPosts);

    this.loadPosts();
  },

  methods: {
    async loadPosts() {
      const response = await axios.get('http://localhost:3000/api/post', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      this.posts = response.data;
    },
    async deletePost(idPost) {
       axios.delete("http://localhost:3000/api/post/" + idPost, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          alert("Supprimer ce post ?")
          if (response.status == 201) {
            this.emitter.emit('post-refresh');
          }
        })
        .catch((error) => {
          alert(
            "Vous n'êtes pas authorisé à supprimer les posts des autres utilisateurs"
          );
          console.log(error);
        });
    },
    fileUpload(event) {
      this.file = event.target.files[0];
    },

    /* vers la page de modification du post (selon son id) */
  modifyPost(id) {
      router.push({ path: `/modify-post/${id}` })
  }}}

</script>

<style lang="scss" scoped>
// HEADER
.card {
  border: 1px solid #dbdbdb;
  background: #ffff;
  border-radius: 5px;
  max-width: 80%;
  margin: auto;
  border-bottom: 15px solid #ffd7d7;
}

.card-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(15, 52, 113, 0.6);
  margin: 10px;
  border-radius: 3px;
}

.card-title {
  font-weight: bold;
  color: #000;
  font-size: 18px;
  margin: 5px 0;
}

.card-button {
  display: flex;
  gap: 10px;
}

.card-btn {
  border-radius: 3px;
  border: 1px solid #4e5166;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s ease-in;

  &:active {
    transform: scale(0.9);
  }

  &:focus {
    outline: none;
  }
}

// BODY
.card-body {
  padding: 0 10px;
}

.card-body .fullwidth {
  width: calc(100% + 20px);
  display: block;
  margin: auto;
  max-width: 70%;
}

.card-body p:first-child {
  margin-top: 0;
}

.card-body p:last-child {
  margin-bottom: 0;
}

.photo_default {
  width: 50px;
  height: 50px;
}

#card-like {
  border: none;
  display: flex;
  justify-content: right;
  margin: 20px;
}

.like-button {
  display: flex;
  align-items: center;
}

.fa-thumbs-up {
  display: flex;
}

span {
  font-size: small;
  color: #dbdbdb;
}

@media only screen and (max-width: 925px) {
  .card-btn {
    padding: 5px;
    font-size: 0.7rem;
  }

  .card-body .fullwidth {
    max-width: 100%;
    margin: 0;
    display: block;
  }
    #card-like {
    margin: 10px;
}
}
</style>
