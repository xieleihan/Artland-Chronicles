<template>
	<view class="musicRecommend">
		<view class="topTitle">
			<span>推荐歌单</span>
			<img src="/static/icon/left.png" alt="" />
		</view>
		<view class="musicRecommendList">
			<view class="content">
				<view class="item" v-for="(item,index) in recommendList" :key="index" data-id="item.id">
					<img :src="`${item.picUrl}`" alt="" />
					<span>{{item.name}}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import { get, post } from '@/api/request';

	const recommendList = ref([])

	onMounted(() => {
		get('music', 'music/personalized?limit=10')
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				recommendList.value = obj.result
			})
			.catch((err) => {
				console.log("获取推荐歌单(10个)失败", err)
			})
	})
</script>

<style lang="less" scoped>
	.musicRecommend {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;

		.topTitle {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			img {
				width: 32rpx;
				height: 32rpx;
				transform: rotate(-180deg);
			}

			span {
				font-weight: bold;
			}
		}

		.musicRecommendList {
			width: 100%;
			height: 440rpx;
			overflow-x: scroll;
			overflow-y: hidden;

			.content {
				width: 160%;
				height: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;

				.item {
					width: 200rpx;
					height: 200rpx;
					position: relative;
					margin-right: 20rpx;
					margin-bottom: 20rpx;

					img {
						width: 100%;
						height: 100%;
					}

					span {
						position: absolute;
						bottom: 0;
						left: 0;
						display: block;
						width: 100%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						background-color: rgba(0, 0, 0, .7);
						color: white;
						box-sizing: border-box;
						padding-left: 5rpx;
					}
				}
			}
		}
	}
</style>