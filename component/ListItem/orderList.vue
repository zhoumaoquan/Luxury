<template>
	<view class="app-boxs" @click="jumpDetail(Data.id, Data.type)">
		<view class="app__header bottom-line">
			<view class="app__header-icon">
				<!-- 卖 -->
				<image v-if="Data.type == 1" src="@/static/icon/mai.png"></image>
				<!-- 收 -->
				<image v-else src="@/static/icon/shou.png"></image>
			</view>
			<view class="app__header-text">
				<text>订单编号：{{Data.sn}}</text>
			</view>
			<view class="app__header-status">
				<!-- 卖类型订单 -->
				<block v-if="Data.type == 1">
					<text v-if="Data.state == 1">待寄出</text>
					<text v-if="Data.state == 2">待预约</text>
					<text v-if="Data.state == 3">待取件</text>
					<text v-if="Data.state == 4">待收货</text>
					<text v-if="Data.state == 5">已收货</text>
					<text v-if="Data.state == 6">售卖中</text>
					<text v-if="Data.state == 7">已售出</text>
					<text v-if="Data.state == 8">未收到货品</text>
					<text v-if="Data.state == 9">退货货品</text>
				</block>
				<!-- 收类型订单 -->
				<block v-else>
					<text  v-if="Data.state == 1">待寄出</text>
					<text  v-if="Data.state == 2">待预约</text>
					<text  v-if="Data.state == 3">待取件</text>
					<text  v-if="Data.state == 4">待收货</text>
					<text  v-if="Data.state == 5">已收货</text>
					<text  v-if="Data.state == 8">未收到商品</text>
					<text  v-if="Data.state == 9">退货商品</text>
				</block>
			</view>
		</view>
		<view class="app__body">
			<u-image mode="scaleToFill" :src="Data.positive_image[0].abs_url" width="165" height="165"></u-image>
			<view class="app__body-info">
				<view class="app__body-info-title">{{Data.category_name}}/{{Data.brand_name}}</view>
				<view class="app__body-info-timer">时间：{{Data.add_time}}</view>
			</view>
		</view>
		<view class="app__footer top-line">
			<block v-if="Data.state == 1">
				<view class="app__footer-btn" @click.stop="modify(Data.id, Data.address_id, Data.address_type)">
					<text>修改邮寄</text>
				</view>
				<view class="app__footer-btn active" @click.stop="sendOut(Data.id, 1)">
					<text>确认寄出</text>
				</view>
			</block>
			
			<block v-if="Data.state == 2">
				<view class="app__footer-btn active" @click.stop="modify(Data.id, Data.address_id, Data.address_type)">
					<text>修改邮寄</text>
				</view>
			</block>
			
			<block v-if="Data.state == 3">
				<view class="app__footer-btn active" @click.stop="pickup(Data.id, 2)">
					<text>确认取件</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'OrderList',
		props: {
			Data: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		methods: {
			jumpDetail(id, type) {
				uni.navigateTo({
					url: '/pages/Profile/order/orderDetail?id=' + id + '&type=' + type
				})
			},
			modify(oid, aid,type) {
				this.$emit('modify', { oid, aid, type })
			},
			sendOut(id, status) {
				this.$emit('send', {id, status})
			},
			pickup(id, status) {
				this.$emit('pickup', {id, status})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-line::after {
		height: 2px;
	}
	.top-line::before {
		height: 2px;
	}
	.app-boxs {
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}
	.app__header {
		width: 100%;
		height: 86rpx;
		@include flex-al();
		@include box(0 30rpx);
		&-icon {
			width: 37rpx;
			height: 37rpx;
			margin-right: 12rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		&-text {
			flex: 1;
			@include ellipsis();
			font-size: 28rpx;
			color: #666666;
			font-weight: bold;
		}
		&-status {
			margin-left: 20rpx;
			font-size: 28rpx;
			color: #D9261C;
			font-weight: bold;
		}
	}
	.app__body {
		width: 100%;
		height: 225rpx;
		@include flex-al();
		@include box(0 30rpx);
		&-info {
			flex: 1;
			height: 200rpx;
			margin-left: 35rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			&-title {
				font-size: 30rpx;
				color: #333333;
				font-weight: 600;
				@include ellipsis();
			}
			&-timer {
				font-size: 24rpx;
				color: #999999;
				font-weight: 400;
			}
		}
	}
	.app__footer {
		width: 100%;
		height: 110rpx;
		@include box(0 30rpx);
		@include flex-al();
		justify-content: flex-end;
		&-btn {
			box-sizing: border-box;
			width: 140rpx;
			height: 50rpx;
			border-radius: 10rpx;
			border: 1rpx solid #EAEAEA;
			@include flex-center();
			font-size: 24rpx;
			color: #666666;
			font-weight: bold;
			background-color: #FFFFFF;
			margin-left: 18rpx;
		}
	}
	.app__footer-btn.active {
		background-color: #39425A;
		color: #FFFFFF;
		
	}
</style>
