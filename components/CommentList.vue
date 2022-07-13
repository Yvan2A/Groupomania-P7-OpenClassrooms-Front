<template>
  <div class="main">
    <div class="line"></div>
    <h2>Commentaires</h2>
    <div v-for="comment in comments" class="card" @change="sendComment">
      <div class="card-body" v-if="postid === comment.postId">
        <div>
          <h3 class="card-user">
            {{ comment.user.name }} {{ comment.user.last_name }}
          </h3>
          <p class="card-content"> {{ comment.content }}</p>
        </div>
        <div class="card-button">
          <!-- <button v-if="comment.UserId == UserId || admin === 'true'" :id="comment.id" class="card-btn"
            @click="modifyComment"><i class='fas fa-edit' style='color: black'></i>
          </button> -->
          <button v-if="comment.userId == user || admin === 'true'" :id="comment.id" class="card-btn"
            @click="deleteComment(comment.id)"><i class="fa fa-trash" style='color: black' aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CommentList",
  props: ["postid", "postComments"],
  data() {
    return {
      comments: [],
      user: localStorage.getItem("userId"),
      admin: localStorage.getItem("admin"),
    };
  },
  async created() {
    this.emitter.on("comment-created", this.loadComments);

    this.loadComments();

  },
  methods: {
    async loadComments() {
      const response = await axios.get("http://localhost:3000/api/comment", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      this.comments = response.data;
    },
    async deleteComment(idComment) {
       axios.delete("http://localhost:3000/api/comment/" + idComment, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          alert("Supprimer ce commentaire ?")
          if (response.status == 201) {
            this.emitter.emit("comment-created");
          }
        })
        .catch(error => {
          alert("Vous n'êtes pas authorisé à supprimer les commentaires des autres utilisateurs")
          console.log(error)
        }) 
    },
  },
};
</script>

<style lang="scss" scoped>
// HEADER
.main {
  margin: 10px;
}
.line {
  background-color: #4e5166;
  height: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
}
h2 {
  font-size: 1.1rem;
  margin: 0;
  color: #ffd7d7;
  margin-bottom: 10px;
}
.card {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
.card-body {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.card-button {
  display: flex;
  gap: 10px;
}
.card-btn {
  border-radius: 3px;
  border: 1px solid #4e5166;
  font-weight: bold;
  height: 25px;
  cursor: pointer;
  transition: transform 0.1s ease-in;
  &:active {
    transform: scale(0.9);
  }
  &:focus {
    outline: none;
  }
}
.card-user {
  font-style: italic;
  font-size: 0.9rem;
  color: #4e5166;
  margin: 0;
}

.card-content {
  margin: 0;
  font-size: 0.9rem;
}

@media only screen and (max-width: 925px) {
  .card-btn {
    padding: 0 5px;
    font-size: 0.7rem;
  }
}
</style>
