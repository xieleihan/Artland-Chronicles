<template>
	<view class="HomemangaList">
		<view class="top">
			<span class="left">首页推荐</span>
			<img class="right" src="/static/icon/left.png" alt="" />
		</view>
		<view class="container">
			<view @click="goToMangainfo" class="item" v-for="(item,index) in HomeRecommendList" :key="index"
				:data-index="index" :data-comic-id="item.comic_id">
				<img class="mangaImg" :src="`${item.vertical_cover}`" alt="" />
				<view class="title">{{item.title}}</view>
				<view class="introduction">
					{{item.introduction}}
				</view>
				<!-- <view class="authors" v-for="(authorsItem,authorsIndex) in item.authors" :key="index">
					<span>{{authorsItem}}</span>
				</view> -->
				<view class="authors">
					<span>{{item.authors[0]}}</span>
				</view>
			</view>
		</view>
		<view class="other" @click="goToClassificationPages">
			<img src="/static/icon/more.png" alt="" />
			<span>查看更多</span>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';
	import { get, post } from '@/api/request'

	const HomeRecommendList = ref([])

	onMounted(() => {
		get('manga', '/HomeRecommend')
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				HomeRecommendList.value = obj.data.list
			})
			.catch((err) => {
				console.log("漫画推荐列表加载错误:", err)
			})
	})

	function goToMangainfo(event : any) {
		const target = event.currentTarget as HTMLElement;
		const comic_id = target.dataset.comicId;
		console.log(comic_id)
		uni.navigateTo({
			url: '/pages/manga/mangaInfo?comic_id=' + comic_id
		})
	}

	function goToClassificationPages() {
		uni.navigateTo({
			url: '/pages/manga/mangaClassification'
		})
	}
</script>

<style lang="less" scoped>
	@import url('../static/public.less');

	.HomemangaList {
		width: 100%;

		.top {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.right {
				width: 32rpx;
				height: 32rpx;
				transform: rotate(-180deg);
			}
		}

		.container {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;

			.item {
				background-color: white;
				box-sizing: border-box;
				padding: 20rpx;
				width: 48%;
				display: flex;
				flex-direction: column;
				border: 1px solid #ccc;
				border-radius: @radius;
				overflow: hidden;
				margin: 12rpx 0;

				.mangaImg {
					width: 100%;
					height: 400rpx;
				}

				.title {
					font-weight: bold;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.introduction {
					color: #ccc;
					font-size: 28rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}

		.other {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			img {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
</style>