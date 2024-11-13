<template>
	<view class="user">
		<view class="topBanner">
			<img class="img" src="/static/images/bg7.jpg" alt="" />
			<img class="avater" src="/static/images/avater.jpg" alt="" />
			<view class="triangle"></view>
			<img class="revise" src="/static/icon/pen.png" alt="" />
		</view>
		<view class="title">
			<div class="topTitle">
				<view class="username">这是用户名</view>
				<view class="editBtn">
					编辑资料
				</view>
			</div>
			<view class="info">
				你还没有填写简介信息
			</view>
		</view>

		<view class="function">

		</view>
	</view>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
	@import url('../../static/public.less');

	.user {
		width: 100dvw;
		height: @startHeight;
		overflow-y: scroll;

		.topBanner {
			width: 100%;
			height: 400rpx;
			position: relative;

			.img {
				width: 100%;
				height: 100%;
			}

			.avater {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				border: 1px solid #ccc;
				position: absolute;
				bottom: -75rpx;
				left: 10%;
			}

			.triangle {
				position: absolute;
				transform: rotate(-270deg) translateX(-50rpx) translateY(50rpx);
				top: 0;
				z-index: 992;
				right: 0;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 100rpx 100rpx 100rpx 0;
				/* 设置边框宽度 */
				border-color: rgba(0, 0, 0, .7) transparent transparent transparent;
				/* 设置边框颜色 */
			}

			.revise {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				top: 0;
				right: 0;
				z-index: 996;
			}
		}

		.title {
			width: 100%;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			height: 100rpx;
			margin-top: 75rpx;
			display: flex;
			flex-direction: column;

			.topTitle {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				height: 50rpx;
				padding-left: 40rpx;
				box-sizing: border-box;

				.username {
					font-weight: bold;
				}

				.editBtn {

					border-radius: @radius;
					padding: 20rpx 30rpx;
					background-color: @googleblue;
					color: white;
				}
			}

			.info {
				color: #ccc;
				font-size: 24rpx;
				margin-top: 10rpx;
				border-bottom: 1px solid #ccc;
				padding-bottom: 10rpx;
			}
		}
	}
</style>