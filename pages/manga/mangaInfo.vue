<template>
	<view class="mangaInfo">
		<div class="top">
			<img :src="`${mangaInfo.horizontal_cover}`" alt="" />
		</div>
	</view>
</template>

<script lang="ts" setup>
	interface mangainfoItem {
		horizontal_cover : string
	}

	import { onMounted, ref, getCurrentInstance } from 'vue';
	import { get, post } from '@/api/request';
	import { onLoad } from '@dcloudio/uni-app'

	const comic_id = ref('')
	const mangaInfo = ref({} as mangainfoItem)

	onLoad((options) => {
		console.log('漫画ID:', options.comic_id);
		comic_id.value = options.comic_id

		get('manga', `ComicDetail?comicId=${comic_id.value}`)
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				mangaInfo.value = obj.data
			})
			.catch((err) => {
				console.log("获取漫画详情出错", err)
			})
	});
</script>

<style lang="less" scoped>
	@import url('../../static/public.less');

	.mangaInfo {
		width: 100dvw;
		height: 100dvh;
		background-color: @bgColor;

		.top {
			width: 100%;
			height: 400rpx;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>