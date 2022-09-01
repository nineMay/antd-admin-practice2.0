<template>
<div class="page-container">
	<div>
		<h1>404</h1>
		<h1>OOPS!你好像迷路了。。。</h1>
		<RouterLink :to="{path:'/',replace:true}" class="">回到首页</RouterLink>
	</div>
	<img src="~@/assets/404.gif" alt=""/>
</div>

</template>


<script  lang='ts'>
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'NotFound',
  });
</script>


<style lang='less' scoped>


.page-container{
	display: flex;
	width:100vw;
	height:100vh;
	background-color: white;

	// /* 对齐方式 */
// justify-content: center;     /* 居中排列 */
// justify-content: start;      /* 从行首开始排列 */
// justify-content: end;        /* 从行尾开始排列 */
// justify-content: flex-start; /* 从行首起始位置开始排列 */
// justify-content: flex-end;   /* 从行尾位置开始排列 */
// justify-content: left;       /* 一个挨一个在对齐容器得左边缘 */
// justify-content: right;      /* 元素以容器右边缘为基准，一个挨着一个对齐, */

// /* 基线对齐 */
// justify-content: baseline;
// justify-content: first baseline;
// justify-content: last baseline;

// /* 分配弹性元素方式 */
// justify-content: space-between;  /* 均匀排列每个元素
//                                    首个元素放置于起点，末尾元素放置于终点 */
// justify-content: space-around;  /* 均匀排列每个元素
//                                    每个元素周围分配相同的空间 */
// justify-content: space-evenly;  /* 均匀排列每个元素
//                                    每个元素之间的间隔相等 */
// justify-content: stretch;       /* 均匀排列每个元素
//                                    'auto'-sized 的元素会被拉伸以适应容器的大小 */

// /* 溢出对齐方式 */
// justify-content: safe center;
// justify-content: unsafe center;

// /* 全局值 */
// justify-content: inherit;
// justify-content: initial;
// justify-content: unset;
	justify-content: center;

// 	align-items基础
// 和 justify-content 类似，align-items 属性用来设置项目在交叉轴方向上的对齐方式。语法格式如下：

// .container {
//     align-items: flex-start | flex-end | center | baseline | stretch (默认值);
// }
// 其中：

// 1. flex-start 沿着交叉轴方向 起点 对齐（默认值）。
// 2. flex-end 沿着交叉轴方向 结尾 对齐。
// 3. center 沿着交叉轴方向 居中 对齐。
// 4. baseline 沿着交叉轴方向，按照项目内的文字对齐。
// 5. stretch 沿着交叉轴方向自动进行拉升到最大。

	align-items: center;
}
</style>