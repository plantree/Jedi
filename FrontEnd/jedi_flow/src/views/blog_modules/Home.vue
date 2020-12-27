<template>
    <div id="home">
   
        <!-- 搜索栏 -->
        <!-- <div id="serch_bar">
            <input type="text">
        </div> -->

        <!-- 最新文章列表 -->
        <div id="blog_list">

            <div class="blog_item"
                @click="getBlogContent(index)"
                v-for="(item,index) in blogListData" :key="item.id">
                标题：{{item.title}}---作者：{{item.author}}---时间：{{item.time}}
            </div>
        </div>
        
        <!-- 分页组件 -->
        <div id="blog_page">
            <el-pagination
                layout="prev, pager, next"
                :total="100">
            </el-pagination>
        </div>

        <!-- 首页显示3~5条内容,有摘要,不要搜索框 -->

        <!-- 点击文章进入详情页(跳转至BlogDetails,走子路由),要有返回页头 -->

        <!-- 点击更多(跳转至BlogList,走根路由),进入所有文章列表,要分页,可搜索 -->

        <!-- <div id="more_blogs">
            
            <router-link :to="{name:'BlogList'}"> 
                <button>查看更多</button>
            </router-link>
        </div> -->

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
            blogListData:[
                { uuid:1,title:'nodejs 的使用',author:'wang',time:'2020-11-26'},
                { uuid:2,title:'c++ 的使用',author:'wang',time:'2020-10-21'},
                { uuid:3,title:'type js 的使用',author:'wang',time:'2020-08-22'},
                { uuid:4,title:'python 的使用',author:'wang',time:'2020-05-18'},
                { uuid:5,title:'css 的使用',author:'wang',time:'2020-05-08'},
            ],


        };
    },
    mounted(){

    },
    methods:{
        getBlogContent(index){
            // this.$router.push(name,'/BlogDetails')
            // this.$router.push({path:`/BlogDetails/${blogID}`})
            this.$router.push({path:'/blog/articles', 
                query:{ blogID: this.blogListData[index].uuid}
            })

        },
            
    }
};
</script>

<style scoped>
#home{
    padding: 20px;
    height: 94%;
}

.blog_item{
    margin-bottom: 15px;
    padding: 5px;
    cursor: pointer; 
}

#blog_page .el-pagination{
    position: fixed;
    bottom: 40px;
    left: 35%;
}
</style>