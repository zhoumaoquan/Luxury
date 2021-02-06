<template>
	<view class="container">
		<view class="app-parting">
			
		</view>
		<view class="app-box">
			<view class="app-box-title">
				<text>{{title}}</text>
			</view>
			<u-parse :html="content"></u-parse>
		</view>
	</view>
</template>

<script>
	import { helpDesc } from '@/network/profile.js'
	export default {
		data() {
			return {
				title: '',
				content: ''
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '数据加载中...'
			})
			
			this._getHelpDesc(option.id)
		},
		methods: {
			async _getHelpDesc(id) {
				try{
					let res = await helpDesc(id)
					
					this.title = res.title
					this.content = res.content
					
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.app-parting {
		width: 100%;
		height: 20rpx;
		background-color: #f5f5f5;
	}
	.app-box {
		width: 100%;
		@include box(40rpx);
		&-title {
			font-size: 30rpx;
			color: #333333;
			font-weight: 400;
			margin-bottom: 30rpx;
		}
	}
</style>
