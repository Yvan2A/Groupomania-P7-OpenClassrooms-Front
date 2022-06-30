
<template>
  <footer>
    <ul>
        <li>
            <p><img src="../assets/icon-left-font-monochrome-black.png" alt="Logo Groupomania"></p>
        </li>
        <li>
            <a href="mailto:admin@groupomania.com" aria-label="Envoyer un mail à l'administrateur" > Contacter l'administrateur</a>
        </li>
    </ul>
    <div class="copyright">
      <p>© Groupomania | 2022 | Créateur du site Yvan REMOND </p>
    </div>
  </footer>
</template>

<style scoped>
ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    list-style: none;
    margin-top: 100px;
}

li {
  width: 200px;
}

a {
  font-size: 1.2rem;
  color: #000000;
  text-decoration: none;
}

a:hover {
  color: #fd2d01;
}

img {
    height: 150px;
}

.copyright{
  font-size: 1rem;
  display: flex;
  justify-content: center;
}

@media screen and (max-width:768px) {
  a {
    font-size: 1rem;
  }

  ul {
    margin: 0
  }
  
  li {
    width: 150px;
  }

  img {
    height: 25vw;
  }

  .copyright{
  font-size: 0.7 rem;
  }
}

</style>

