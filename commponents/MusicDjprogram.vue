<template>
	<view class="djprogram">
		<view class="topTitle">
			<span>推荐电台</span>
			<img src="/static/icon/left.png" alt="" />
		</view>
		<view class="musicDjprogram">
			<view class="item" v-for="(item,index) in djprogram" :key="index">
				<img :src="`${item.picUrl}`" alt="" />
				<view>{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref, computed } from 'vue';
	import { get, post } from '@/api/request';

	const djprogram = ref([]); // 推荐电台

	onMounted(() => {
		get('music', 'personalized/djprogram')
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				djprogram.value = obj.result
			})
			.catch((err) => {
				console.log("推荐的电台加载错误", err)
			})
	})
</script>

<style lang="less" scoped>
	.djprogram {
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

		.musicDjprogram {
			width: 100%;
			height: 455rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;

			.item {
				width: 220rpx;
				height: 220rpx;
				position: relative;
				margin-bottom: 10rpx;

				&:nth-child(4) {
					margin-bottom: 0;
				}

				&:nth-child(5) {
					margin-bottom: 0;
				}

				&:nth-child(6) {
					margin-bottom: 0;
				}

				img {
					width: 100%;
					height: 100%;
				}

				view {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					position: absolute;
					bottom: 0;
					width: 100%;
					color: white;
					background-color: rgba(0, 0, 0, .7);
					padding-left: 10rpx;
					box-sizing: border-box;
				}
			}
		}
	}
</style>