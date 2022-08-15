<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
       
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import {iuInfo} from '../utils/data.js'
export default {
  data(){
    return{iu:{}}
  },
  mounted:function(){
    // const iuData = iuInfo
    console.log(iuInfo)
  }
}
</script>
<style>
  
</style>