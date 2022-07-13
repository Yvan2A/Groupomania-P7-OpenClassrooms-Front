<template>
    <div class="main">
        <div class="container">
            <h1>Compte</h1>
            <div class="card">
                <div class="card-img">
                    <h3>Photo de profil</h3>
                    <img class="photo_default" :src="photoUrl" alt="Image du profil d'un utilisateur" />
                    <input type="file" name="avatar" id="user-avatar" @change="imgUploaded()" style="display:none"
                        aria-label="choisir une image" />
                    <button class="image-btn" @click.prevent="getFile()"><i class="fa fa-picture-o"
                            aria-hidden="true"></i></button>
                </div>
                <div class="card-content">
                    <div class="nom">
                        Nom : {{ user.last_name }}
                    </div>
                    <div class="last_name">
                        Prénom : {{ user.name }}
                    </div>
                    <div class="email">
                        Email : {{ user.email }}
                    </div>

                </div>
                <form @submit.prevent="deleted" class="form">
                    <button type="submit" class="btn btn-primary" @clik="deteledData;">
                        Supprimer mon compte
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import photoDefaultUrl from "../assets/avatar_default.png";
export default {
    name: 'Profil',
    data() {
        return {
            user: '',
            photoUrl: photoDefaultUrl,
            photoUrlToUpload: "",
            avatar: null
        }
    },

    async created() {
        const id = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/api/auth/user/${id}`,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }

            });
        // console.log('ici');
        this.user = response.data;
        },
        
    methods: {

        // Utilisé pour styliser le input file
        getFile() {
            document.querySelector('#user-avatar').click();
        },

        // Enregistre l'image dans une variable
        imgUploaded() {
            const inputFile = document.querySelector('#user-avatar');
            this.avatar = inputFile.files[0];
            console.log(this.avatar)
        },
        // Assigne une image au profil de l'utilisateur 
        getUserAvatar() {
            const userId = localStorage.getItem('id');
            const formDataUser = new FormData();
            const token = localStorage.getItem('token');
            formDataUser.append('image', this.avatar)
            const options = {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
            axios.put('http://localhost:3000/api/images/' + userId, formDataUser, options)
                .then((response) => {
          if (response.status == 401) {
            this.status = "error_saveUserInfo";
          } else {
            response.json().then((formDataUser) => {
              if (formData.user.photoUrl != "") {
                this.photoUrl = formDataUser.photoUrl;
                this.photoUrlToUpload = "";
              }
              this.status = "success_saveUserInfo";
            });
          }
        })
        .catch((error) => console.log(error));
    },


        async deleted() {
            if (confirm("Voulez-vous vraiment supprimer le compte") == true) {
                const id = localStorage.getItem('userId');
                const response = await axios.delete(`http://localhost:3000/api/auth/user/${id}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    });
                this.user = response.data;
                localStorage.removeItem('userId');
                localStorage.removeItem('token');
                this.$router.push('/login');
                console.log('deleted');

            }
        },
    }



}
</script>

<style lang="scss" scoped>
.card {
    border: 3px solid #4e5166;
    background: #FFD7D7;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
}

.container {
    max-width: 80%;
    display: block;
    margin: auto;
}

// BODY 
.card-content {
    padding:  20px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 10px;
}

input[type="file"] {
    display: none;
}

input {
    width: calc(100% - 10px);
    overflow: hidden;
    border: none;
    background-color: #eee;
    border-radius: 3px;

    &:focus {
        outline: none;
        background-color: #fff;
    }
}

.input-content {

    height: 100px;
}

button,
label {
    border-radius: 3px;
    border: 1px solid #4E5166;
    background-color: #FD2D01;
    color: #fff;
    font-weight: bold;
    padding: 15px 40px;
    margin: 30px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform .1s ease-in;

    &:active {
        transform: scale(.9);
    }

    &:focus {
        outline: none;
    }
}
h1 {
    display: flex;
    justify-content: center;
}
.photo_default {
    width:200px;
    height: 200px;
}
.image-btn {
    padding: 5px;
    color: white;
    margin: 0 5px;
    background-color: #4E5166;
}

@media only screen and (max-width: 925px) {
    h1 {
        display: flex;
        justify-content: center;
    }

    .card {
        display: flex;
        flex-direction: column;
    }

    .form {
        display: flex;
        justify-content: center;
    }
}
</style>