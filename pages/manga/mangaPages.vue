<template>
	<view class="mangaPages">
		<img loading="lazy" v-for="(item,index) in mangaList" :key="index" :src="`${item}`" alt="" />
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue';

	const mangaList = ref([])

	onMounted(() => {
		uni.getStorage({
			"key": 'mangaList',
			"success": function (res) {
				mangaList.value = res.data
			}
		})
	})
</script>

<style lang="less" scoped>
	.mangaPages {
		width: 100dvw;
		height: 100dvh;
		overflow-y: scroll;

		img {
			width: 100%;
			height: 100%;
		}
	}
</style>