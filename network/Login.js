const BASE_URL = 'https://api.xzzsmp.com/index.php/';

export default (option = {}, header = {
	"Content-Type": "application/x-www-form-urlencoded"
}) => {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: "weixin",
			success: function(loginRes) {
				var params = {
					code: loginRes.code,
				};
				// 调用后台接口换取 ID
				uni.request({
					url: BASE_URL + option.url,
					method: option.methods || 'POST',
					data: params,
					header: header,
					success: function(res) {
						resolve(res.data);
					},
					fail: function(err) {
						reject(err);
					}
				})
			}
		})
	})
}