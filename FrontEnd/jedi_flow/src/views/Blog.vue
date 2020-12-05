<template>
    <div id="blog">
        <Header></Header>
        <!-- <el-button>注册</el-button> -->
        <router-view />
    </div>
</template>
<script>
import Header from "@/views/blog_modules/Header.vue";

export default {
    name: "Blog",
    components: {
        Header,
    },
};
</script>

<style>


</style>
