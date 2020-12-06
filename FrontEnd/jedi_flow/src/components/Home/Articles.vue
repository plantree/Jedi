<template>
    <div id="blog_details">

        <!-- 返回页头(返回首页还是列表？？？) -->
        <div id="back_to">
            <router-link :to="{name:'Home'}"> 
                <button>返回主页</button>
            </router-link>
        </div>

        <!-- 文章主体内容 -->
        <div id="blog_content">
            <div id="blog_title">
                这篇文章的名称 {{this.$route.params.blogID}}
            </div>
            <div id="blog_info">
                1. 这篇文章的各类信息 <br>
                2. 这篇文章的各类信息
            </div>
            <div id="blog_body">
                这篇文章的具体内容
            </div>
        </div>  

        <!-- 上 / 下一篇 -->
        <div id="pre_next">
            <button>上一篇</button>
            <button>下一篇</button>
        </div>

        <!-- 相关文章 -->
        <div id="relative_blog">
            相关文章
        </div>
        
    </div>
</template>

<script>
export default {
    name: "Article",
    components: {},
    data(){
        return {
            blog_id:'',
        };
    },
    mounted(){
        this.getBlogContent(this.$route.query.blogID)

    },
    methods:{

        // 获取博文详情
        getBlogContent(id){
            console.log(id);
            // this.$axios({

            // }).then((res)=>{
            //     console.log(res);
            // }).catch({

            // });
        }
    }

}
</script>

<style scoped>

#blog_details{
    padding: 10px;
    height: 94%;
}
#back_to{
    width: 100%;
    height: 25%;
    background-color: cadetblue;
}
</style>>

