<template>
  <div class="main">
    <div v-for="post in posts" class="card">
      <header class="card-header">
        <div class="card-title">
          {{ post.user.name }} {{ post.user.last_name }}
        </div>
        <div class="card-button">
          <button v-if="post.UserId == UserId || admin === 'true'" class="card-btn" :id="post.id" @click="modifyPost"><i
              class='fas fa-edit' style='color: white'></i>
          </button>
          <button v-if="post.UserId == UserId || admin === 'true'" class="card-btn" :id="post.id" @click="deletePost"><i
              class="fa fa-trash" aria-hidden="true"></i>
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
import axios from "axios";
import CommentList from "@/components/CommentList.vue";
import CommentCreate from "@/components/CommentCreate.vue";
export default {
  name: "PostList",
  components: {
    CommentList,
    CommentCreate,
  },
  data() {
    return {
      posts: [],
      user: localStorage.getItem("userId"),
      admin: localStorage.getItem("admin"),
    };
  },

  async created() {
    this.emitter.on("post-refresh", this.loadPosts);
    this.emitter.on("comment-created", this.loadPosts);

    this.loadPosts();
  },

  methods: {
    async loadPosts() {
      const response = await axios.get("http://localhost:4200/api/post", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      this.posts = response.data;
    },
    async deletePost(event) {
      const id = event.target.id;
      console.log("id", id);
      const response = await axios
        .delete(`http://localhost:4200/api/post/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status == 201) {
            this.emitter.emit("post-refresh");
          }
        })
        .catch(error => {
          alert("Vous n'êtes pas authorisé à supprimer les posts des autres utilisateurs")
          console.log(error)
        }) 
    },
    fileUpload(event) {
      this.file = event.target.files[0];
    },
    //request to modify post
    async modifyPost() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      const postId = window.location.pathname.split('/')[2];
      //in the case the image is modified 
      if (this.file && this.title && this.content) {
        let formData = new FormData();
        formData.append('image_url', this.file);
        formData.append('title', this.title);
        formData.append('content', this.content);
        try {
          await axios.put('http://localhost:4200/api/post' + postId, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          alert("Votre post a bien été modifié");
          this.$router.push({ path: '/home' });
        } catch (error) {
          console.log("envoi du post a échoué")
        }
      } else if (this.title && this.content) { //in the case the image is not modified
        try {
          await axios.put('http://localhost:4200/api/post' + postId,
            {
              title: this.title,
              content: this.content
            });
          alert("Votre post a bien été modifié");
          this.$router.push({ path: '/home' });

        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Vous devez au moins remplir le titre et le contenu du post");
      }
    }
  }
};
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
  background-color: #d05059;
  color: #fff;
  font-weight: bold;
  padding: 10px;
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
}
</style>
