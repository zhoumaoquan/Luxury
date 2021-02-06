<template>
	<view class="container">
		<u-parse :html="content.info"></u-parse>
		<!-- <view class="default-btn" @click="isShow = true" v-if="type == 1">
			<text>已看完协议同意签约</text>
		</view>
		<view class="_img" v-if="type == 2">
			<u-image @click="preview(content.qi_image[0].abs_url)" width="230" height="180" border-radius="5" :src="content.qi_image[0].abs_url"></u-image>
		</view> -->
		<u-popup v-model="isShow" z-index="99" mode="center" border-radius="10" >
			<view class="popup-box">
				<view class="popup-box-title">
					<text>我要签约</text>
				</view>
				<view class="popup-box-content">
					<view class="popup-box-text" v-if="image === ''" @click="isSigna = true">
						<text>请手写输入姓名...</text>
					</view>
					<view class="popup-box-img" v-else @click="preview(image)">
						<u-image :src="image" border-radius="20" width="534" height="280"></u-image>
					</view>
				</view>
				
				<view class="popup-box-buttom">
					<view class="popup-box-btns" @click="isSigna = true">
						<text>签名</text>
					</view>
					<view class="popup-box-btns active" @click="saveSigna">
						<text>确定</text>
					</view>
				</view>
				
			</view>
		</u-popup>
		
		<!-- <signature canvasId="canvas" @close="this.isSigna = false" @save="save" :visible="isSigna" /> -->
	</view>
</template>

<script>
	import { agreement } from '@/network/main'
	// import signature from "@/component/signature.vue"
	import { uploadHead } from '@/libs/upload/single.js'
	export default {
		data() {
			return {
				isShow: false,
				image: '',
				content: {},
				isSigna: false,
				id: '',
				type: '',
				types: ''
			};
		},
		// components: {
		// 	signature
		// },
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			this._getAgreement()
			// this.type = option.type
			// if(option.type == 1) {
			// 	uni.setNavigationBarTitle({
			// 		title: '寄卖协议'
			// 	})
				
			// 	this._getAgreement()
			// } else {
			// 	uni.setNavigationBarTitle({
			// 		title: '签约合同'
			// 	})
			// 	this.id = option.id
				
			// 	this.types = option.types
			// 	this._getContract()
				
			// }
			
			
		},
		methods: {
			_getAgreement() {
				agreement().then(res => {
					this.content = res
					
					uni.hideLoading()
				}).catch(err => {
					uni.showToast({
						title: '获取协议失败,请重试',
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				})
			},
			_getContract() {
				agreement({
					id: this.id,
					type: this.types
				}).then(res => {
					this.content = res
					
					uni.hideLoading()
				}).catch(err => {
					uni.showToast({
						title: '获取协议失败,请重试',
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				})
			},
			save(val) {
				
				this.isSigna = false;
				this.image = val
			},
			saveSigna() {
				if(this.image === '') {
					return uni.showToast({
						title: '请先签名后保存',
						icon: 'none'
					})
				}
				uploadHead({
					url: 'Personal/upload',
					imgUrl: this.image
				}).then(res => {
					
					let id = res.data.list[0].id
					
					uni.setStorageSync('signID', id)
					
					this.isShow = false
					
					uni.showToast({
						title: '已签约',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							},1000)
						}
					})
					
				}).catch(err => {
					uni.showToast({
						title: '签名失败，请重试',
						icon: 'none'
					})
				})
			},
			preview(img) {
				let res = [img]
				uni.previewImage({
					urls: res
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		@include box(0 40rpx);
	}
	.default-btn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 30rpx;
		
		z-index: 999;
	}
	._img {
		display: flex;
		margin-top: 30rpx;
		justify-content: flex-end;
	}
	.popup-box {
		width: 630rpx;
		height: 604rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		&-title {
			width: 100%;
			height: 142rpx;
			@include flex-center();
			font-size: 36rpx;
			color: #333333;
			font-weight: bold;
		}
		&-content {
			width: 534rpx;
			height: 280rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			border: 2rpx solid #D4D4D4;
			overflow: hidden;
			
			.popup-box-text {
				width: 100%;
				height: 100%;
				@include box(39rpx 25rpx);
				font-size: 28rpx;
				color: #999999;
				font-weight: 400;
			}
			.popup-box-img {
				width: 100%;
				height: 100%;
			}
		}
		&-buttom {
			width: 100%;
			margin-top: 60rpx;
			@include flex-al();
			justify-content: space-evenly;
		}
		&-btns {
			width: 200rpx;
			height: 80rpx;
			background-color: #FFFFFF;
			border: 3rpx solid #39425A;
			border-radius: 10rpx;
			font-size: 30rpx;
			color: #39425A;
			font-weight: bold;
			@include flex-center();
		}
		.popup-box-btns.active {
			background-color: #39425A;
			color: #FFFFFF;
		}
	}
</style>
