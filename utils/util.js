function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {

  n = n.toString()
  return n[1] ? n : '0' + n
}

function request(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://lwdgit.github.io/blog' + url,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    });
  })
}

module.exports = {
  formatTime,
  request
}
