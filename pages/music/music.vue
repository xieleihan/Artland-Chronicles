<template>
	<view class="music">
		<view class="search">
			<input class="inputMusic" type="text" placeholder="请输入歌曲名信息" />
			<view class="searchBtn">
				全站搜索
			</view>
		</view>

		<view class="banner">
			<swiper class="swiper" circular autoplay indicator-dots="true" indicator-active-color="#2a7aed">
				<swiper-item class="swiper-item" v-for="(item,index) in musicBannerList" :key="index">
					<img :src="`${item}`" alt="" />
				</swiper-item>
			</swiper>
		</view>
		<MusicRecommend></MusicRecommend>
		<NewMusicList></NewMusicList>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import { get, post } from '@/api/request'
	import MusicRecommend from '@/commponents/MusicRecommend.vue'
	import NewMusicList from '@/commponents/NewMusicList.vue'

	const musicBannerList = ref([]) // 音乐页面banner图列表

	onMounted(() => {
		get('music', 'banner')
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				for (let i = 0; i < obj.banners.length; i++) {
					musicBannerList.value.push(obj.banners[i].imageUrl)
				}
			})
			.catch((err) => {
				console.log("获取音乐banner列表失败", err)
			})
	})
</script>

<style lang="less" scoped>
	@import url('../../static/public.less');

	.music {
		width: 100dvw;
		height: @startHeight;
		overflow-y: scroll;
		box-sizing: border-box;
		padding: 20rpx 0;

		.search {
			width: 100%;
			padding: 0 30rpx;
			height: 100rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;

			.inputMusic {
				width: 100%;
				border: 1px solid #ccc;
				height: 90%;
				padding-left: 15rpx;
				padding-right: 150rpx;
			}

			.searchBtn {
				color: @googleblue;
				position: absolute;
				top: 50%;
				right: 50rpx;
				transform: translateY(-50%);
			}
		}

		.banner {
			width: 100%;
			height: 350rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			margin-top: 20rpx;

			.swiper {
				width: 100%;
				height: 100%;
				border-radius: @radius;
				overflow: hidden;

				.swiper-item {
					width: 100%;
					height: 100%;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>