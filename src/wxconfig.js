const axios = require("axios");
import wx from "weixin-js-sdk"; // 注意版本号，部分接口可能会删掉 官网 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
/**
 * 页面调用微信分享方法
 *
 * @param  {Object} obj      分享的标题，描述，图片等
 * @param  {type} callback
 * @return {type}
 */
function wxShare(obj, callback) {
  // const href = Base64.encode(location.href);
  //base64当前页面地址传给后端生成签名
  axios.get(`wx?url=${encodeURIComponent(window.location.href)}&timestamp=${(new Date().valueOf())}`).then(r => {
    const data = r.data
    if (data.code !== 200) {
      return false
    }
    wx.config({
      debug: false, // 开启调试模式,
      appId: '',
      timestamp: data.result.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.result.nonceStr, // 必填，生成签名的随机串
      signature: data.result.signature, // 必填，签名，见附录1
      jsApiList: [
        'onMenuShareAppMessage', // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        'onMenuShareTimeline' //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
      ] // 必填，需要使用的JS接口列表
    });
    shareConfig(obj, callback);
  }).catch((err) => {
    console.log(err)
    shareConfig({}, callback);
  });
}

function shareConfig(obj, callback) {
  wx.ready(() => {
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: obj.timelinetitle ? obj.timelinetitle : obj.title, // 分享标题
      link: obj.link, // 分享链接
      imgUrl: obj.imgUrl ? obj.imgUrl : "", // 分享图标
      success: () => {
        typeof callback === "function" && callback();
      },
      cancel: () => {
        // 用户取消分享后执行的回调函数
      }
    });

    // 分享给微信好友
    wx.onMenuShareAppMessage({
      title: obj.title, // 分享标题
      desc: obj.desc, // 分享描述
      link: obj.link, // 分享链接
      imgUrl: obj.imgUrl ? obj.imgUrl : "",
      success: () => {
        typeof callback === "function" && callback();
      },
      cancel: () => {
        // 用户取消分享后执行的回调函数
      }
    });
  });
}

export default wxShare;