<template>

<div class="login-box">
	<div class="login-logo">
		<img src="~@/assets/images/logo.png" width="45"/>
		<h1 class="mb-0 ml-2 text-3xl font-bold">Antd Admin</h1>
	</div>
	<!-- :是v-bind的缩写，用于绑定数据；
	@是v-on的缩写，用于绑定方法 
.prevent: 阻止冒泡-->
   <a-form layout="horizontal" :model="state.formInline" @submit.prevent="handleSubmit">
		<a-form-item>
			<!-- v-model:双向绑定
			TODO：表单输入绑定，不只应用于表单。 v-model="value1"它取代的是 :value=“value” ,有了v-model就不用绑定value了。 -->
			<a-input v-model:value="state.formInline.username" size="large" placeholder="rootadmin">
			<template #prefix> <user-outlined type="user" /></template></a-input>
		</a-form-item>
		<a-form-item>
        <a-input
          v-model:value="state.formInline.password"
          size="large"
          type="password"
          placeholder="123456"
          autocomplete="new-password"
        >
          <template #prefix><lock-outlined type="user" /></template>
        </a-input>
      </a-form-item>
			<a-form-item>
        <a-input
          v-model:value="state.formInline.verifyCode"
          placeholder="验证码"
          :maxlength="4"
          size="large"
        >
          <template #prefix><SafetyOutlined /></template>
          <template #suffix>
            <img
              :src="state.captcha"
              class="absolute right-0 h-full cursor-pointer"
              @click="setCaptcha"
            />
          </template>
        </a-input>
      </a-form-item>
		<a-form-item>
        <a-button type="primary" html-type="submit" size="large" :loading="state.loading" block>
          登录
        </a-button>
      </a-form-item>
	</a-form>
</div>
</template>


<script setup lang='ts'>
  import { reactive } from 'vue';
  import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue';
	import { message, Modal } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';

/** ref和reactive都是用来定义响应式数据的，reactive更适合用于定义复杂的数据类型，ref更适合定义基本类型
 * ref和reactive本质：ref是对reactive的二次包装，ref定义的数据，我们在访问的时候要多一个.value
 * 使用ref定义基本数据类型，ref也可以定义数组和对象
 */
const state = reactive({
	loading:false,
	captcha:'',
	formInline:{
		username:'',
		password:'',
		verifyCode:'',
		captchaId:''
	}
});

const route =useRoute();
const router=useRouter();
const userStore=useUserStore();

const setCaptcha=()=>{
	//
}

const handleSubmit=()=>{
//
};
</script>


<style lang='less' scoped>

.login-box {
    display: flex;
    width: 100vw;
    height: 100vh;
    padding-top: 240px;
    background: url('~@/assets/login.svg');
    background-size: 100%;
    flex-direction: column;
    align-items: center;

    .login-logo {
      display: flex;
      margin-bottom: 30px;
      align-items: center;

      .svg-icon {
        font-size: 48px;
      }
    }

    :deep(.ant-form) {
      width: 400px;

      .ant-col {
        width: 100%;
      }

      .ant-form-item-label {
        padding-right: 6px;
      }
    }
  }

</style>