<template>
	<view class="privatecontent">
		<view class="topTitle">
			<span>独家放送</span>
			<img src="/static/icon/left.png" alt="" />
		</view>
		<view class="musicPrivatecontent">
			<view class="item" v-for="(item,index) in privatecontent" :key="index">
				<img :src="`${item.sPicUrl}`" alt="" />
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref, computed } from 'vue';
	import { get, post } from '@/api/request';

	const privatecontent = ref([]); // 独家放送

	onMounted(() => {
		get('music', 'personalized/privatecontent')
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				privatecontent.value = obj.result
			})
			.catch((err) => {
				console.log("获取独家放送信息失败", err)
			})
	})
</script>

<style lang="less" scoped>
	.privatecontent {
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

		.musicPrivatecontent {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.item {
				width: calc(100% / 3 - 20rpx);
				display: flex;
				flex-direction: column;

				&:last-child {
					margin-right: 0;
				}

				img {
					width: 100%;
					aspect-ratio: 1/1;
				}

				.name {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
			}
		}
	}
</style>