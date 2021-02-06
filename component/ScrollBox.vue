<template>
	<scroll-view :refresher-enabled="enabled" :refresher-triggered="triggered" :refresher-threshold="60" enable-flex class="scroll-bar"
	 :class="{isEnabled: enabled}" scroll-y @refresherpulling="onPulling" @refresherrefresh="onRefresh"
	 refresher-default-style="none" @refresherrestore="onRestore" @scrolltolower="pullloading" lower-threshold="10">
		<!-- 上拉刷新 -->

		<view class="refresh" v-if="enabled">
			<u-loadmore :bg-color="loadBg" :status="status" :load-text="loadText" />
		</view>
		<view :style="{ paddingBottom:  bottomfrom + 'rpx'}" v-if="!isEmpt">
			<slot></slot>
			<u-loadmore v-if="isPulls" margin-bottom="10" :bg-color="loadBg" margin-top="30" :status="status2" :load-text="loadText2" />
		</view>
		<view v-else>
			<u-empty margin-top="100" icon-size="160" font-size="28" color="#999" :text="emptytext" :mode="emptytype"></u-empty>
		</view>


	</scroll-view>
</template>

<script>
	export default {
		name: 'ScrollBox',
		props: {
			enabled: {
				type: Boolean,
				default: false
			},
			isLogin: {
				type: String,
				default: ''
			},
			emptytext: {
				type: String,
				default: '暂无数据~'
			},
			emptytype: {
				type: String,
				default: 'list'
			},
			bottomfrom: {
				type: Number,
				default: 150
			},
			isRefresh: {
				type: Boolean
			},
			// 内容是否为空 ， 默认为false
			isEmpt: {
				type: Boolean,
				default: false
			},
			loadBg: {
				type: String,
				default: '#F5F5F5'
			},
			isPull: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				triggered: false,
				status: 'loadmore',
				loadText: {
					loadmore: '下拉刷新',
					loading: '努力加载中...'
				},
				status2: 'loading',
				loadText2: {
					loadmore: '上拉加载更多',
					loading: '努力加载中...',
					nomore: '没有更多了~'
				},
				freshing: false,
				isPulls: false
			};
		},
		watch: {
			isRefresh(e) {
				this.onComplete()
			},
			isPull(e, o) {
				if(e) {
					this.pullComplete()
				} else {
					this.pullError()
				}
			}
		},
		methods: {
			onPulling(e) {
				this.triggered = true
			},
			onRefresh(e) {
				if (this.freshing) return
				this.freshing = true;
				this.status = 'loading'
				this.$emit('refresh')
			},
			onTopshow() {
				this.$emit('topShow')
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				this.isLogin !== '' && this.onTopshow()
			},
			onComplete() {
				this.triggered = false;
				this.freshing = false;
				this.status = 'loadmore';
			},
			pullloading() {
				this.isPulls = true
				this.$emit('pullload')
			},
			pullComplete() {
				this.isPulls = false
			},
			pullError() {
				this.status2 = 'nomore'
			}
		},
		created() {

		}
	}
</script>

<style lang="scss" scoped>
	.scroll-bar {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.isEnabled {
		padding-top: 100rpx;
		transform: translateY(-150rpx);
	}


	.refresh {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding-bottom: 50rpx;
	}
</style>
