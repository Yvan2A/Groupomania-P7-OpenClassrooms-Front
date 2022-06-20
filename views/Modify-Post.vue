<template>
    <Home />
    <ModifyPost />
    <Footer />
</template>

<script>
import Home from "@/components/Home.vue";
import ModifyPost from "@/components/ModifyPost.vue"
import Footer from "@/components/Footer.vue";

export default {
    name: 'Modify-Post',
    components: {
        Home,
        ModifyPost,
        Footer,
    }
}
</script>