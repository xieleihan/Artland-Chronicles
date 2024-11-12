<template>
	<view class="mangaInfo">
		<!-- 顶部图片 -->
		<view class="top">
			<img :src="`${mangaInfo.horizontal_cover}`" alt="" />
			<view class="collect">
				<img src="/static/icon/collect.png" alt="" />
				<span>收藏</span>
			</view>
		</view>

		<!-- 内容层 -->
		<view class="container">
			<view class="title">{{mangaTitle}}</view>
			<view class="smallBox">
				<view class="author">
					{{mangaAuthor[0]}}
				</view>|
				<view class="styles">
					<span v-for="(item,index) in mangaStyles" :key="index">{{item}}</span>
				</view>
			</view>
			<view class="evaluate">
				{{mangaEvaluate}}
			</view>

			<!-- 评论 -->
			<view class="review">
				<view class="reviewTop">
					<span>精选评论</span>
					<view class="">
						<span class="more">查看更多</span>
						<img src="/static/icon/left.png" alt="" />
					</view>
				</view>
				<view class="reviewContainer">
					<view class="item" v-for="(item,index) in mangaComment_short" :key="index">
						<view class="left">
							<img class="avater" :src="`${item.face}`" alt="" />
						</view>
						<view class="right">
							<view class="username">
								{{item.nick_name}}
							</view>
							<view class="content">
								{{item.content}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部目录区域 -->
		<view class="directoryBox">
			<view class="left" @click="openDirectory">
				<img src="/static/icon/directory.png" alt="" />
				<span>目录</span>
			</view>
			<!-- v-for="(item,index) in ep_list" :key="index" -->
			<view class="center">
				<view class="page" v-for="(item,index) in ep_list" :key="index">
					{{index}}
				</view>

			</view>
			<view class="right">
				<view class="readManga" @click="lookManga">
					立即阅读
				</view>
			</view>
		</view>

		<!-- 弹出目录层 -->
		<view class="directory" :style="isDirectory === false? 'height:0%':'height:80%'">
			<view class="box">
				<view class="directoryTop">
					<span>目录</span>
					<img @click="openDirectory" src="/static/icon/close.png" alt="" />
				</view>
				<view class="directoryContainer">
					<view class="item" v-for="(item,index) in ep_list" :key="index">
						<view class="left">
							<img :src="`${item.cover}`" alt="" />
						</view>
						<div class="right">
							<div class="number">第{{item.ord}}话</div>
							<div class="title">{{item.title}}</div>
						</div>

						<img class="ico" src="/static/icon/left.png" alt="" />
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	interface mangainfoItem {
		horizontal_cover : string
	}

	import { onMounted, ref, getCurrentInstance } from 'vue';
	import { get, post } from '@/api/request';
	import { onLoad } from '@dcloudio/uni-app'
	import url from '@/api/index'

	const comic_id = ref(''); // 这是漫画id
	const mangaInfo = ref({} as mangainfoItem); // 漫画对象
	const mangaTitle = ref('') // 漫画标题
	const mangaAuthor = ref([]) // 漫画作者
	const mangaEvaluate = ref('') // 漫画介绍
	const mangaStyles = ref([]) // 漫画类型
	const is_finish = ref('') // 漫画是否完结
	const last_short_title_msg = ref('') // 漫画最后一话信息
	const ep_list = ref([]) // 漫画章节列表
	const isDirectory = ref(false) // 控制目录开关
	const mangaComment = ref([]) // 漫画所有评论
	const mangaComment_short = ref([]) // 短评

	const host : string = "https://manga.hdslb.com" // 漫画代理地址
	const suffix : string = "@660w.webp" // 拼接的后缀(可以更换成@600w.jpg,@1000w.webp,@1000w.jpg)


	onLoad((options) => {
		console.log('漫画ID:', options.comic_id);
		comic_id.value = options.comic_id

		// 获取漫画信息
		get('manga', `ComicDetail?comicId=${comic_id.value}`)
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				mangaInfo.value = obj.data
				mangaTitle.value = obj.data.title
				mangaAuthor.value = obj.data.author_name
				mangaStyles.value = obj.data.styles
				mangaEvaluate.value = obj.data.evaluate
				ep_list.value = obj.data.ep_list
			})
			.catch((err) => {
				console.log("获取漫画详情出错", err)
			})

		// 获取漫画评论
		get('manga', `GetReviewDetailByComicID?comicId=${comic_id.value}`)
			.then((res) => {
				console.log(res)
				const str = JSON.stringify(res)
				const obj = JSON.parse(str)
				mangaComment.value = obj.data.short_reviews
				// const mangaCommentLength = mangaComment.value.length
				for (let i = 0; i < 6; i++) {
					mangaComment_short.value.push(mangaComment.value[i])
				}
			})
			.catch((err) => {
				console.log("获取精选漫画点评出错", err)
			})


	});

	function openDirectory() {
		isDirectory.value = !isDirectory.value
	}

	async function lookManga() {
		let ep_idList = []; // 先拿到id数组
		let ep_idListUrl = []; // 拼接一下要请求的数组
		let ep_hostListUrl = []; // 代理地址
		let ep_tokenUrl = []; // 请求真实地址和token的图片信息
		let ep_imageUrl = []; // 真实图片

		const ep_listLength = ep_list.value.length;
		for (let i = ep_listLength - 1; i >= 0; i--) {
			ep_idList.push(ep_list.value[i].id)
		}
		for (let i = 0; i < ep_listLength; i++) {
			ep_idListUrl.push(url + '/GetImageIndex?epId=' + ep_idList[i])
		}
		for (let i = 0; i < ep_listLength; i++) {
			await uni.request({
				url: ep_idListUrl[i],
				method: 'GET'
			}).then(async (res) => {
				console.log(res)
				const str = JSON.stringify(res);
				const obj = JSON.parse(str);
				console.log(obj.data.data.images)
				for (let j = 0; j < obj.data.data.images.length - 1; j++) {
					ep_hostListUrl.push(host + obj.data.data.images[j].path + suffix)
				}
			}).catch((err) => {
				console.log("host代理网络请求错误", err)
			})
		}
		// console.log("代理地址:", ep_hostListUrl) // 全部拿到了
		for (let i = 0; i < ep_hostListUrl.length; i++) {
			await get('manga', '/ImageToken?urls=["' + ep_hostListUrl[i] + '"]')
				.then((res) => {
					console.log(res)
					const str = JSON.stringify(res)
					const obj = JSON.parse(str)
					ep_imageUrl.push(obj.data[0].complete_url);
				})
				.catch((err) => {
					console.log("请求含有真实地址错误", err)
				})
		}
		console.log("真实图片的数组", ep_imageUrl)
		uni.setStorage({
			key: 'mangaList',
			data: ep_imageUrl,
			success: function () {
				uni.navigateTo({
					url: '/pages/manga/mangaPages'
				})
			},
			fail: function () {
				console.log("写入存储失败")
			}
		})
	}
</script>

<style lang="less" scoped>
	@import url('../../static/public.less');

	.mangaInfo {
		width: 100dvw;
		height: calc(100dvh - 90rpx);
		background-color: @bgColor;
		position: relative;
		box-sizing: border-box;
		overflow: hidden;

		.directory {
			width: 100%;
			background-color: white;
			border-radius: @radius @radius 0 0;
			position: absolute;
			bottom: 0;
			transition: all 1s;

			.box {
				width: 100%;
				height: 100%;
				position: relative;
				padding: 20rpx 30rpx;
				box-sizing: border-box;

				.directoryTop {
					width: 100%;
					height: 100rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 0 30rpx;
					border-bottom: 1px solid #ccc;

					img {
						width: 50rpx;
						height: 50rpx;
					}
				}

				.directoryContainer {
					width: 100%;
					padding: 20rpx 30rpx;
					box-sizing: border-box;
					height: calc(100% - 120rpx);
					overflow-y: scroll;
					display: flex;
					flex-direction: column-reverse;

					.item {
						width: 100%;
						min-height: 200rpx;
						margin-bottom: 20rpx;
						padding: 20rpx 30rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						box-sizing: border-box;
						border: 1px solid #ccc;
						border-radius: @radius;
						position: relative;

						.ico {
							width: 32rpx;
							height: 32rpx;
							position: absolute;
							top: 50%;
							right: 20rpx;
							transform: translateY(-50%) rotate(-180deg);
						}

						.left {
							width: 30%;
							height: 90%;
							margin-right: 20rpx;

							img {
								width: 100%;
								height: 100%;
							}
						}

						.right {
							width: 60%;
							height: 90%;

							.number {
								font-weight: bold;
								margin-bottom: 20rpx;
							}
						}

					}
				}
			}
		}

		.top {
			width: 100%;
			height: 400rpx;
			position: relative;

			img {
				width: 100%;
				height: 100%;
			}

			.collect {
				position: absolute;
				width: 150rpx;
				height: 70rpx;
				bottom: -50rpx;
				right: 10%;
				background-color: @googleyellow;
				padding: 15rpx 20rpx;
				border-radius: @radius;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				color: white;

				img {
					margin-right: 20rpx;
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

		.container {
			width: 100%;
			padding: 20rpx 30rpx;
			height: calc(100dvh - 450rpx);
			overflow-y: scroll;
			box-sizing: border-box;
			padding-bottom: 150rpx;

			.title {
				font-weight: bold;
				font-size: 40rpx;
				margin-bottom: 20rpx;
			}

			.smallBox {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 20rpx;

				.author {
					margin-right: 10rpx;
				}

				.styles {
					margin-left: 10rpx;

					span {
						display: block;
						border: 1px solid #ccc;
						color: #ccc;
						padding: 5rpx;
						box-sizing: border-box;
						text-align: center;
						border-radius: 5rpx;
					}
				}
			}

			.review {
				width: 100%;
				height: 500rpx;

				.reviewTop {
					width: 100%;
					height: 100rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-weight: bold;
					font-size: 40rpx;

					img {
						width: 40rpx;
						height: 40rpx;
						transform: rotate(-180deg);
						margin-left: 15rpx;
						vertical-align: middle;
					}

					.more {
						font-size: 24rpx;
						color: #ccc;
						font-weight: 500;
						line-height: 100rpx;
					}
				}

				.reviewContainer {
					width: 100%;
					height: 400rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					flex-wrap: wrap;

					.item {
						width: 48%;
						height: 120rpx;
						display: flex;
						background-color: white;
						border: 1px solid #ccc;
						border-radius: @radius;
						padding: 20rpx;
						box-sizing: border-box;

						.left {
							margin-right: 15rpx;

							.avater {
								width: 50rpx;
								height: 50rpx;
								border-radius: 50%;

							}
						}

						.right {
							display: flex;
							flex-direction: column;
							width: 70%;

							.username,
							.content {
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.username {
								font-weight: bold;
							}
						}
					}
				}
			}
		}

		.directoryBox {
			width: 100%;
			height: 100rpx;
			border-top: 1px solid #ccc;
			position: absolute;
			bottom: 0rpx;
			left: 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: white;

			.left {
				width: 20%;
				height: 90%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-right: 1px solid #ccc;

				img {
					width: 30rpx;
					height: 30rpx;
					margin-bottom: 15rpx;
				}

				span {
					font-size: 24rpx;
				}
			}

			.center {
				width: calc(100% - 200rpx - 20%);
				height: 100%;
				box-sizing: border-box;
				padding: 0 10rpx;
				overflow-x: scroll;
				display: flex;
				flex-direction: row;
				align-items: center;

				.page {
					min-width: 100rpx;
					height: 80%;
					border-radius: 10rpx;
					background-color: #ccc;
					border: 1px solid #ccc;
					color: white;
					margin-right: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					&:last-child {
						margin-right: 0;
					}
				}
			}

			.right {
				width: 200rpx;
				height: 100%;
				background-color: @googleblue;
				color: white;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>