<template>
	<view class="classification">
		<view class="left">
			<view :style="home_index === index ? 'background-color:#2a7aec;color:white':''" @click="selectItem"
				class="item" :data-id="item.id" v-for="(item,index) in home_type" :key="index" :data-index="index">
				{{item.name}}
			</view>
		</view>
		<view class="right">
			<view class="container">
				<view class="title">{{titleName}}</view>
				<view class="smallBox">
					<view v-if="contentList.length === 0" class="noContent">
						<img src="/static/icon/noContent.png" alt="" />
						<span>暂无对应分类漫画</span>
					</view>
					<view v-if="contentList.length !== 0" class="content">
						<view @click="getComicid" class="item" v-for="(item,index) in contentList" :key="index"
							:data-comicid="item.comic_id">
							<img :src="`${item.square_cover}`" alt="" />
							<view class="title">
								{{item.title}}
							</view>
							<view class="desc">
								{{item.recommendation}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import { get, post } from '@/api/request';

	const home_type = ref([]) // 首页分类类别
	const home_index = ref(0) // 首页分类默认索引
	const titleName = ref('热门') // 标题名
	const tabId = ref(0) // tabId获取
	const contentList = ref([]) // 分类漫画内容列表

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
		contentList.value = []
		const target = event.currentTarget as HTMLElement;
		const index = target.dataset.index; // 获取 data-index 值
		home_index.value = Number(index)
		titleName.value = home_type.value[Number(index)].name
		tabId.value = home_type.value[Number(index)].tab_type
		switch (tabId.value) {
			case 6:
				get('manga', 'GetClassPageSixComics?tabId=6')
					.then((res) => {
						console.log("这是6", res)
						const str = JSON.stringify(res)
						const obj = JSON.parse(str)
						contentList.value = obj.data.roll_six_comics;
					})
					.catch((err) => {
						console.log("获取分类里的信息错误", err)
					})
				break;
			case 9:
				get('manga', 'GetClassPageSixComics?tabId=9')
					.then((res) => {
						console.log("这是9", res)
						const str = JSON.stringify(res)
						const obj = JSON.parse(str)
						contentList.value = obj.data.roll_six_comics;
					})
					.catch((err) => {
						console.log("获取分类里的信息错误", err)
					})
				break;
		}
	}

	function getComicid(event : any) {
		const target = event.currentTarget as HTMLElement;
		const comicid = target.dataset.comicid; // 获取 data-comicid 值
		// console.log(comicid)
		uni.navigateTo({
			url: '/pages/manga/mangaInfo?comic_id=' + comicid
		})
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

				.title {
					width: 100%;
					height: 50rpx;
					font-weight: bold;
				}

				.smallBox {
					width: 100%;
					height: calc(100% - 50rpx);
					border: 1px solid #ccc;
					// border-radius: @radius;
					box-sizing: border-box;
					padding: 20rpx;

					.content {
						width: 100%;
						height: 100%;
						overflow-y: scroll;
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						justify-content: space-between;

						.item {
							background-color: white;
							width: 48%;
							border: 1px solid #ccc;
							border-radius: @radius;
							box-sizing: border-box;
							padding: 10rpx;
							margin-bottom: 10rpx;

							img {
								width: 100%;
								height: 200rpx;
								border-radius: @radius;
							}

							.title {
								font-weight: 500;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}

							.desc {
								display: -webkit-box;
								-webkit-box-orient: vertical;
								overflow: hidden;
								text-overflow: ellipsis;
								-webkit-line-clamp: 2;
								color: #ccc;
							}
						}
					}

					.noContent {
						width: 100%;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;

						img {
							width: 90%;
							aspect-ratio: 1/1;
						}
					}
				}
			}
		}
	}
</style>