<template>
	<view class="container">
		<view class="app-box">
			<textarea v-model="feedback" placeholder="请输入您的反馈意见，感谢您帮助我们改进产品和服务！(240个字内)" maxlength="240" placeholder-class="inputTip"></textarea>
		</view>

		<view class="app-input">
			<input v-model="contact" placeholder="请留下你的邮箱、QQ号或手机号" placeholder-class="inputTip" />
		</view>

		<view class="default-btn" @click="submit">
			<text>确定</text>
		</view>
	</view>
</template>

<script>
	import {
		memberOpinion
	} from '@/network/profile'
	export default {
		data() {
			return {
				feedback: '',
				contact: ''
			};
		},
		onLoad(option) {
			this.m_id = option.m_id
		},
		watch: {
			feedback(e) {
				if (e.length >= 240) {
					uni.showToast({
						title: '不能超过240个字！',
						icon: 'none'
					})
				}
			}
		},
		methods: {
			submit() {
				if (this.feedback === '') {
					return uni.showToast({
						title: '请输入您要反馈的意思',
						icon: 'none'
					})
				}
				if(this.contact === '') {
					return uni.showToast({
						title: '请输入您的联系方式',
						icon: 'none'
					})
				}
				
				uni.showLoading({
					title: '提交中...',
					mask: true
				})
				
				
				memberOpinion({
					m_id: this.m_id,
					content: this.feedback,
					contact: this.contact
				}).then(res => {
					uni.showToast({
						title: '提交成功，感谢您的反馈',
						icon: 'none',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
					})
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	.container {
		@include box(20rpx 30rpx);
	}

	.app-box {
		background-color: #FFFFFF;
		width: 100%;
		height: 350rpx;
		@include box(30rpx);
		overflow: hidden;

		textarea {
			width: 100%;
			height: 100%;
			font-size: 28rpx;
			color: #333333;
			line-height: 44rpx;
		}
	}

	.app-input {
		margin-top: 20rpx;
		width: 100%;
		height: 98rpx;
		@include box(0 30rpx);
		background-color: #FFFFFF;

		input {
			width: 100%;
			height: 100%;
			font-size: 28rpx;
			color: #333333;
		}
	}

	.inputTip {
		font-size: 28rpx;
		color: #9E9E9E;
		line-height: 44rpx;
	}

	.default-btn {
		margin-top: 80rpx;
	}
</style>
