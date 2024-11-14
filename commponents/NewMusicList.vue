<template>
	<view class="newmusicList">
		<view class="topTitle">
			<span>推荐新音乐</span>
			<img src="/static/icon/left.png" alt="" />
		</view>
		<view class="newmusic">
			<view class="content">
				<view class="left">
					<view class="item" v-for="(item, index) in leftMusicList" :key="index">
						<img :src="item.picUrl" alt="" />
						<view class="info">
							<view class="songname">{{ item.song.name }}</view>
							<view class="artists">
								<span v-for="(artist, artistIndex) in leftMusicList[index].song.artists"
									:key="artistIndex">
									{{ artist.name }}
								</span>
							</view>
						</view>
					</view>
				</view>
				<view class="right">
					<view class="item" v-for="(item, index) in rightMusicList" :key="index">
						<img :src="item.picUrl" alt="" />
						<view class="info">
							<view class="songname">{{ item.song.name }}</view>
							<view class="artists">
								<span v-for="(artist, artistIndex) in rightMusicList[index].song.artists"
									:key="artistIndex">
									{{ artist.name }}
								</span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, ref, computed } from 'vue';
	import { get, post } from '@/api/request';

	const newMusicList = ref([]);// 推荐新歌的列表

	const leftMusicList = computed(() => newMusicList.value.slice(0, 5));
	const rightMusicList = computed(() => newMusicList.value.slice(5));

	onMounted(() => {
		get('music', 'personalized/newsong')
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				newMusicList.value = obj.result
			})
			.catch((err) => {
				console.log("获取推荐新歌榜错误", err)
			})
	})
</script>

<style lang="less" scoped>
	.newmusicList {
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

		.newmusic {
			width: 100%;
			height: 400rpx;
			overflow-x: scroll;
			overflow-y: hidden;


			.content {
				width: 162%;
				height: 100%;
				display: flex;
				flex-direction: row;

				.left {
					margin-right: 20rpx;
				}

				.left,
				.right {
					width: 80%;
					height: 100%;
					overflow-y: scroll;

					.item {
						width: 100%;
						height: 200rpx;
						display: flex;
						flex-direction: row;
						margin-bottom: 20rpx;
						border: 1px solid #ccc;
						box-sizing: border-box;
						padding: 10rpx;

						img {
							width: 190rpx;
							height: 100%;
							margin-right: 20rpx;
						}

						.info {
							height: 100%;
							box-sizing: border-box;
							padding: 20rpx 0;

							.songname {
								font-weight: bold;
								margin-bottom: 5rpx;
							}

							.artists {
								display: flex;

								span {
									display: block;
									margin-right: 5rpx;
									border: 1px solid #ccc;
									padding: 5rpx 10rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>