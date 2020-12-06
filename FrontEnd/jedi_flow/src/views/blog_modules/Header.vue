<template>
    <div id="nav">
        <div class="nav_name">
            <router-link to="/blog/home">Home首页</router-link>
        </div>
        <div class="nav_name">
            <router-link to="/blog/categories">Categories分类</router-link>
        </div>
        <div class="nav_name">
            <router-link to="/blog/tags">Tags归档</router-link> 
        </div>
        <div class="nav_name">
            <router-link to="/blog/about">About关于</router-link>
        </div>
        <!-- <div class="nav_name">

        </div> -->

    </div>
</template>

<script>
export default {

}
</script>

<style>
#nav {
    background-color: beige;
    padding: 25px 15%;
    display: flex;
    justify-content: space-around;
    height: 6%;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>