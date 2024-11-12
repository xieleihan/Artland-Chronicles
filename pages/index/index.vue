<template>
	<view class="startPages">
		<view class="top">
			<span @click="goToHomePages">Skip</span>
		</view>

		<view class="logo">
			<img class="img" src="/static/images/logo.png" alt="" />
			<span class="title">画境华章</span>
		</view>

		<view class="bottom">
			<view class="login">
				登录
			</view>
			<view class="register">
				注册
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	function goToHomePages() {
		uni.switchTab({
			url: '/pages/manga/manga'
		})
	}
</script>

<style scoped lang="less">
	@import url("../../static/public.less");

	.startPages {
		width: 100dvw;
		height: 100dvh;
		background: url('../../static/images/page-bg.jpg') no-repeat;
		background-size: cover;
		position: relative;
		padding-top: 20rpx;
		box-sizing: border-box;

		.top {
			width: 100%;
			height: 100rpx;
			box-sizing: border-box;
			padding: 0 60rpx;
			text-align: end;
			color: #ccc;
			line-height: 100rpx;
		}

		.logo {
			width: 100%;
			height: 500rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.img {
				width: 300rpx;
				height: 300rpx;
				margin-bottom: 20rpx;
				border-radius: @radius;
			}

			.title {
				font-size: 60rpx;
				color: #b3b3b3;
				letter-spacing: 10rpx;
				font-family: 'zk';
			}
		}

		.bottom {
			position: absolute;
			bottom: 20%;
			left: 50%;
			width: 80%;
			transform: translateX(-50%);


			.login {
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: @themeColor;
				border-radius: @radius;
				margin-bottom: 20rpx;
				color: white;
			}

			.register {
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid @themeColor;
				background-color: white;
				border-radius: @radius;
			}
		}
	}
</style>