<template>
    <div class="cate-body">
        <CateLeft></CateLeft>
        <CateRight></CateRight>
    </div>
</template>

<script>
import CateLeft from "@/components/Categories/CateLeft.vue";
import CateRight from "@/components/Categories/CateRight.vue";
export default {
    name: "Categories",
    components: { CateLeft, CateRight },
};
</script>

<style>
.cate-body{
    display: flex;
    justify-content: space-around;
}
</style>