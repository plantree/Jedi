<template>
    <div id="app">
        <!-- <Header></Header> -->
        <!-- <el-button>注册</el-button> -->
        <router-view />
    </div>
</template>
<script>
// import Header from "@/views/Header.vue";

export default {
    name: "App",
    components: {
        // Header,
    },
};
</script>

<style>
html,body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;   
    width: 100%;
    height: 100%; 
    background-color: rgb(170, 194, 143);
    overflow:inherit;

}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    width: 100%;

}

</style>
