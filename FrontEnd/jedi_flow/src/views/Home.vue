<template>
    <div id="home">
   
        <!-- 搜索栏 -->
        <!-- <div id="serch_bar">
            <input type="text">
        </div> -->

        <!-- 最新文章列表 -->
        <div id="blog_list">

            <ul style="width: 200px; margin-left: 600px">
                <li>地图注记</li>
                <li>地图注记</li>
                <li>地图注记</li>
                <li>地图注记</li>
            </ul>
        </div>

        <!-- 首页显示3~5条内容,有摘要,不要搜索框 -->

        <!-- 点击文章进入详情页(跳转至BlogDetails),要有返回页头 -->

        <!-- 点击更多(跳转至BlogList),进入所有文章列表,要分页,可搜索 -->

        <div id="more_blogs">
            <button>查看更多</button>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: "Home",
    components: {},

    data(){
        return {
            //搜索框输入值
            searchValue:'',

            //存放博文列表的数组
            blogListData:[],


        }
    }
};
</script>

<style scoped>

</style>