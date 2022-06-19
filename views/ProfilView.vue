<template>
  <div class="actu">
    <header class="topbar">
      <a href="#" class="topbar-logo"><img alt="Groupomania logo"
          src="../assets/icon-left-font-monochrome-white.svg" /></a>
      <nav class="topbar-nav">
        <form @submit.prevent="handleUnConect" action="#">
          <a href="/actu"><i class="fa fa-home" aria-hidden="true"></i>Accueil</a>
          <a href="/profil"><i class="fa fa-user" aria-hidden="true"></i>Profil</a>
          <button>Deconnexion</button>
        </form>
      </nav>
    </header>
    <Home />
    <Profil />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import Home from "@/components/Home.vue";
import Profil from "@/components/Profil.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "ProfilView",
    components: {
      Home,
      Profil,
      Footer,
  },
  methods: {
    handleUnConect() {
      console.log("je veux me deco");
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        this.$router.push('/login');
    }
  },

};
</script>

<style lang="scss" scoped>
  // HEADER
  .topbar {
    background: #4E5166;
    color: #fff;
    padding: 16px 0;
    text-align: center;
  }
  .topbar-logo {
    img {
      margin: 15px;
      padding-left: 16px;
      width: 40%;
    }
  }
  .topbar a {
    text-decoration: none;
    color: inherit;
  }
  .topbar-nav {
    padding-bottom: 16px;
  }
  .topbar-nav a {
    display: inline-block;
    margin: 0 12px;
    color: rgba(255, 255, 255, 0.70);
    transition: color .3s;
  }
  .topbar-nav a:hover,
  .topbar-nav a:active {
    color: #fff;
  }
  button {
      border-radius: 3px;
      border: 1px solid #4E5166;
      background-color: #fd2d01;
      color: #fff;
      font-weight: bold;
      padding: 15px 5px;
      margin: 10px;
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
  // CONTAINER
  .container {
    padding: 0 15px;
    max-width: 1050px;
    margin: 0 auto;
    display: block;

  }
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
      display: flex;
      justify-content: space-between;
  }
  .card-content {
      display: flex;
      flex-direction: column;
  }



  @media only screen and (min-width: 925px) {
    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .topbar-logo {
      margin: 0;
      text-align: left;
    }
    .topbar-logo,
    .topbar-nav {
      padding: 0;
    }
  }
</style>