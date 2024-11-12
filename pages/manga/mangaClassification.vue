<template>
	<view class="classification">
		<view class="left">
			<view :style="home_index === index ? 'background-color:#2a7aec;color:white':''" @click="selectItem"
				class="item" :data-id="item.id" v-for="(item,index) in home_type" :key="index" :data-index="index">
				{{item.name}}
			</view>
		</view>
		<view class="right">
			<div class="container"></div>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import { get, post } from '@/api/request';

	const home_type = ref([]) // 首页分类类别
	const home_index = ref(0) // 首页分类默认索引

	onMounted(() => {
		get('manga', 'GetClassPageAllTabs')
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				home_type.value = obj.data.home_type
			})
			.catch((err) => {
				console.log("获取分类信息失败", err)
			})
	})

	function selectItem(event : any) {
		const target = event.currentTarget as HTMLElement;
		const index = target.dataset.index; // 获取 data-index 值
		home_index.value = Number(index)
	}
</script>

<style lang="less" scoped>
	@import url('../../static/public.less');

	.classification {
		width: 100dvw;
		height: calc(100dvh - 90rpx);
		background-color: white;
		display: flex;
		flex-direction: row;

		.left {
			width: 30%;
			height: 100%;
			background-color: @bgColor;
			display: flex;
			flex-direction: column;

			.item {
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 1px solid #ccc;
			}
		}

		.right {
			width: 70%;
			height: 100%;
			box-sizing: border-box;
			padding: 20rpx;

			.container {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>