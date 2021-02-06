<template>
	<view class="container">
		<view class="app-box">
			<view class="app-video">
				<video :src="video" :autoplay="autoplay" @play="playVideo"></video>
			</view>
			<view class="app-image" v-if="video === ''">
				<u-image width="100%" height="422" :src="image"></u-image>
			</view>
		</view>
		<view class="app-text">
			<u-parse :html="content"></u-parse>
		</view>
	</view>
</template>

<script>
	import { brandInfo } from '@/network/home.js'
	export default {
		data() {
			return {
				content: '小竹子专业从事奢侈品回收、鉴定、售卖等服务，为客户提供一系列权威的奢侈品服务。',
				type: 1,
				image: '',
				video: '',
				autoplay: false
			}
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			this.type = option.type
			
			this._getBrandInfo()
		},
		onReady() {
			if(this.type == 1) {
				uni.hideLoading()
			} else {
				this.autoplay = true
			}
		},
		methods: {
			// 品牌介绍
			_getBrandInfo() {
				brandInfo().then(res => {
					this.video = res.video
					this.image = res.image
					this.content = res.introduction
					
				}).catch(err => {
					uni.showToast({
						title: e,
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							},1000)
						}
					})
				})
			},
			playVideo(e) {
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	.app-box {
		width: 750rpx;
		height: 422rpx;
		margin-top: 10rpx;

		.app-video {
			width: 100%;
			height: 100%;

			video {
				width: 100%;
				height: 100%;
			}
		}

		.app-image {
			width: 100%;
			height: 100%;
		}
	}

	.app-text {
		margin-top: 48rpx;
		@include box(0 40rpx);
	}
</style>
