<template>
	<!-- @  v-on,:  v-bind -->
<Button v-bind="props" :danger="['danger'].includes(type)" :type="buttonType" :class="[`ant-btn-${type}`]">
	<!-- v-slot的缩写是# -->
<template v-for="(_,key) in $slots" #[key]>
<slot :name="key"></slot>
</template>
</Button>
</template>

<script setup lang='ts'>
import {Button} from 'ant-design-vue';
import { PropType, ComputedRef, computed } from 'vue';
import type { ButtonType as AButtonType } from 'ant-design-vue/es/button';
import { buttonProps, type ButtonType } from './button';

// eslint-disable-next-line no-undef
const props =defineProps({
	...buttonProps(),
	type:{
		type: String as PropType<ButtonType>,
			default:'default',
	},
});
const buttonTypes = ['default', 'primary', 'ghost', 'dashed', 'link', 'text'];
const buttonType=computed(()=>{
	const type =props.type;
	return buttonTypes.includes(type)?(type as ButtonType) :['danger'].includes(type)?'primary':'default';
}) as ComputedRef<AButtonType>;
</script>


<style lang='less' scoped>
 @import 'styles/success';
</style>
<style lang="less" scoped>
  @import 'styles/warning';
</style>