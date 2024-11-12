<template>
	<view class="manga">
		<view class="top">
			<swiper @change="onSwiperChange" class="swiper" circular autoplay>
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<img :src="item.img" class="swiper-image" />
				</swiper-item>
			</swiper>
			<view class="bannerTitle">
				{{bannerTitle}}
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import { get, post } from '@/api/request'

	const bannerList = ref([])
	const bannerTitle = ref('')
	const currentIndex = ref(0);

	onMounted(() => {
		get('manga', '/Banner')
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				bannerList.value = obj.data
				bannerTitle.value = obj.data[0].title
			})
			.catch((err) => {
				console.log(err)
			})
	})

	// 监听 swiper 的滑动事件
	const onSwiperChange = (event : any) => {
		currentIndex.value = event.detail.current;
		bannerTitle.value = bannerList.value[currentIndex.value]?.title || '';
	};
</script>

<style lang="less" scoped>
	@import url('../../static/public.less');

	.manga {
		width: 100dvw;
		height: calc(100dvh - 100px);
		background-color: @bgColor;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		overflow-y: scroll;

		.top {
			width: 100%;
			height: 300rpx;
			position: relative;
			border-radius: @radius;
			overflow: hidden;

			.bannerTitle {
				position: absolute;
				bottom: 0;
				box-sizing: border-box;
				padding: 10rpx 30rpx;
				width: 100%;
				height: 50rpx;
				color: white;
				display: flex;
				align-items: center;
				background-color: rgba(0, 0, 0, .6);
			}

			.swiper {
				width: 100%;
				height: 100%;

				.swiper-image {
					width: 100%;
					height: 100%;
					border-radius: 15rpx;
				}
			}
		}
	}
</style>