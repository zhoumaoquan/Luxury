<template>
	<view class="container">
		<view class="app-bg">
			<image src="@/static/image/bg1.png"></image>
		</view>

		<view class="app-box">
			<view class="app-box-img">
				<image src="@/static/image/bg2.png"></image>
			</view>

			<view class="app-box-title">
				<text>提交成功!</text>
			</view>

			<block v-if="type == 1">
				<view class="app-box-text">
					<text>小竹子已接受您的寄卖申请</text>
					<text>请尽快寄出商品</text>
				</view>

				<view class="app-box-btn">
					<view class="app-box-btn-item active" @click="carryOn">
						<text>继续寄卖</text>
					</view>
					<view class="app-box-btn-item" @click="order">
						<text>我的寄卖</text>
					</view>
				</view>
			</block>
			<block v-if="type == 2">
				<view class="app-box-text">
					<text>小竹子已接受您的回收申请</text>
					<text>请尽快寄出商品</text>
				</view>

				<view class="app-box-btn">
					<view class="app-box-btn-item active" @click="carryOn">
						<text>继续回收</text>
					</view>
					<view class="app-box-btn-item" @click="order">
						<text>我的回收</text>
					</view>
				</view>
			</block>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: ''
			};
		},
		onLoad(option) {
			this.type = option.type
		},
		methods: {
			carryOn() {
				if (this.type == 1) {
					uni.redirectTo({
						url: '/pages/Main/consignment?type=0'
					})
				} else {
					uni.redirectTo({
						url: '/pages/Main/consignment?type=1'
					})
				}
			},
			order() {
				const m_id = uni.getStorageSync('m_id')
				uni.redirectTo({
					url: '/pages/Profile/order/orderList?type=' + this.type + '&m_id=' + m_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.app-bg {
		width: 100%;
		height: 296rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.app-box {
		position: relative;
		z-index: 999;
		margin: -150rpx auto 0 auto;
		width: 486rpx;
		height: 622rpx;
		border-radius: 30rpx;
		background-color: #FFFFFF;
		box-shadow: 0rpx 3rpx 20rpx 0rpx rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;

		&-img {
			width: 206rpx;
			height: 214rpx;
			margin-top: 62rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		&-title {
			font-size: 36rpx;
			color: #333333;
			font-weight: 400;
			margin-top: 55rpx;
		}

		&-text {
			margin-top: 35rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			line-height: 36rpx;
			font-size: 26rpx;
			color: #999999;
			font-weight: 400;
		}

		&-btn {
			@include flex-al();
			justify-content: space-around;
			margin-top: 35rpx;

			&-item {
				width: 178rpx;
				height: 56rpx;
				border-radius: 10rpx;
				box-sizing: border-box;
				border: 2rpx solid #39425A;
				background-color: #FFFFFF;
				font-size: 26rpx;
				color: #39425A;
				@include flex-center();
			}

			.app-box-btn-item.active {
				background-color: #39425A;
				color: #FFFFFF;
				margin-right: 42rpx;
			}
		}
	}
</style>
