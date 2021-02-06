<template>
	<view>
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	import { imgtextDesc } from '@/network/home'
	export default {
		data() {
			return {
				content: ''
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			this._getDetail(option.id)
		},
		methods: {
			_getDetail(id) {
				imgtextDesc(id).then(res => {
					uni.setNavigationBarTitle({
						title: res.title
					})
					this.content = res.content
					
					uni.hideLoading()
				}).catch(err => {
					uni.showToast({
						title: err,
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
			}
		}
	}
</script>

<style lang="scss">

</style>
