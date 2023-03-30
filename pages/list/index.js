// pages/list/index.js
// import Toast from "@vant/weapp/toast/toast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    value: "",
    radio: "1",
  },
  // 打开弹出层
  showPopup() {
    this.setData({ show: true });
  },
  // 关闭弹出层
  onClose() {
    this.setData({ show: false });
  },
  // 获取输入TODO名称
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  // 切换周期
  checkCycle(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
    console.log("点击", event.currentTarget.dataset);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
