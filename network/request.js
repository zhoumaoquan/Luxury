const BASE_URL = 'https://api.xzzsmp.com/index.php/';

export default (option, header = {
	"Content-Type": "application/x-www-form-urlencoded"
}) => {
	uni.showNavigationBarLoading()
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + option.url,
			method: option.method || 'POST',
			header: header,
			data: option.data || {},
			success: (res) => {
				if (res.data.flag === 'success') {
					resolve(res.data.data);
				} else {
					reject(res.data.message);
				}
			},
			fail: (err) => {
				reject(err);
			},
			complete: () => {
				uni.hideNavigationBarLoading();
			}
		})
	})
}
