<template>
  <div class="home">
    <div class="container">
        <img alt="Groupomania logo" src="../assets/icon-above-font.svg" />
    </div>
    <Signup/>
  </div>
  <Footer />
</template>

<script>
// @ is an alias to /src
import Signup from "@/components/Signup.vue";
import Footer from "@/components/Footer.vue";


export default {
  name: "CreateAccountView",
  components: {
    Signup,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
  .home {
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1050px;
    height: 70vh;
    margin: 0 auto;
    .container {
      width: 30%;

      border-radius: 6px;
      .img {
        border-radius: 6px;
      }
    }
  }
  
  
    @media only screen and (max-width: 925px) {
        .home {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .container {
                margin: 15px 0;
                padding: 15px 0;
                top:0;
                width:40%;
            }
        }
        footer {
          margin-top: 100px;
        }
    }


</style>