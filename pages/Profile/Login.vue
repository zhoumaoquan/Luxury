<template>
	<view class="container">
		<view class="app-logo">
			<u-image width="202" height="200" src="@/static/image/logo.png" mode="aspectFit"></u-image>
			<view class="app-logo-text">
				<text>小竹子</text>
			</view>
		</view>

		<button open-type="getUserInfo" @getuserinfo="userLogin" class="default-btn">
			<u-icon name="weixin-fill" size="46" top="0" color="#fff"></u-icon>
			<text>微信用户快捷登录</text>
		</button>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		openLogin,
		addMembers,
		uploadHead,
		downloadFile
	} from './init/LoginInit'
	export default {
		data() {
			return {

			};
		},
		methods: {
			async userLogin(e) {
				uni.showLoading({
					title: '登陆中...'
				})
				try {
					var {
						tempFilePath: avatarUrl
					} = await downloadFile(e.detail.userInfo.avatarUrl)
					var {
						data: imgInfo
					} = await uploadHead({
						url: 'Personal/upload',
						imgUrl: avatarUrl
					})
				} catch (e) {
					uni.hideLoading()
					uni.showToast({
						title: '头像上传失败，请稍后再试',
						icon: 'none'
					})
				}

				var params = {
					nickname: e.detail.userInfo.nickName,
					avatar: imgInfo.list[0].id,
					sex: e.detail.userInfo.gender,
					openid: '',
				}

				try {
					var resCode = await openLogin({
						url: 'Login/get_openids'
					})
					params.openid = resCode.data.openid

					var result = await addMembers(params)
					uni.setStorageSync('m_id', result)
					uni.setStorageSync('session_key', resCode.data.session_key)
					
					console.log(uni.getStorageSync('m_id'), 'm_id缓存')
					
					uni.hideLoading()

					this.$refs.uToast.show({
						title: '登录成功',
						back: true
					})


				} catch (e) {
					uni.hideLoading()
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.app-logo {
		width: 100%;
		height: 580rpx;
		@include flex-center();
		flex-direction: column;

		&-text {
			font-size: 34rpx;
			font-weight: bold;
			color: #333333;
			margin-top: 18rpx;
		}
	}

	.default-btn {
		font-size: 32rpx;
		font-weight: bold;

		text {
			margin-left: 14rpx;
		}
	}
</style>
