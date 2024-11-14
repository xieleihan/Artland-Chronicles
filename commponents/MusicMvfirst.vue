<template>
	<view class="Musicmv">
		<view class="topTitle">
			<span>最新mv</span>
			<img src="/static/icon/left.png" alt="" />
		</view>
		<view class="content">
			<view class="item" v-for="(item,index) in newmv" :key="index">
				<img :src="`${item.cover}`" alt="" />
				<view class="right">
					<view class="title">
						<span>{{item.name}}</span>-<span>{{item.artistName}}</span>
					</view>
					<view class="alias">
						{{item.alias[0]}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref, computed } from 'vue';
	import { get, post } from '@/api/request';

	const newmv = ref([]); // 最新mv

	onMounted(() => {
		get('music', 'mv/first?limit=10')
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				newmv.value = obj.data
			})
			.catch((err) => {
				console.log("获取最新mv数据失败", err)
			})
	})
</script>

<style lang="less" scoped>
	.Musicmv {
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

		.content {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;

			.item {
				width: calc(100% / 2 - 15rpx);
				height: 150rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				box-sizing: border-box;
				padding: 20rpx;
				margin-bottom: 10rpx;

				img {
					width: 50%;
					aspect-ratio: 1/1;
				}

				.right {
					height: 100%;
					font-size: 24rpx;
					white-space: nowrap;
					display: flex;
					flex-direction: column;
					width: 50%;
					overflow: hidden;
					text-overflow: ellipsis;

					.title {
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.alias {
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
</style>