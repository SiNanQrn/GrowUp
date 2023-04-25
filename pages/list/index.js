// pages/list/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //
    currentIndex: -1,
    // 当前弹窗标题
    currentTitle: "",
    // 弹出层显隐
    isDetailShow: false,
    // todo名称
    listName: "",
    // 校验提示
    errorMsg: "TODO名称未填写1",
    // todo周期
    times: "1",
    // todo打卡类型
    type: "0",
    // 健康管理List
    healthList: [],
    // 职业成长List
    jobList: [],
    // 财务目标List
    financeList: [],
    // 兴趣发展List
    hobbyList: [],
    // 计划list
    planList: [],
  },
  // 点击效果
  onRowTap(e) {
    // 获取被点击的元素索引
    const index = e.currentTarget.dataset.index;
    this.setData({ currentIndex: index });

    // 等待 200 毫秒后，恢复行元素的原始样式
    setTimeout(() => {
      this.setData({ currentIndex: -1 });
    }, 200);
  },
  // 打开弹出层
  showPopup(e) {
    console.log("名称", e.currentTarget.dataset.name);
    this.setData({
      currentTitle: e.currentTarget.dataset.name,
      isDetailShow: true,
      listName: "",
      times: "1",
      type: "0",
    });
  },

  // 关闭弹出层
  onClose() {
    this.setData({ isDetailShow: false });
  },

  // 获取输入TODO名称
  onInputChange(e) {
    if (e.detail) {
      this.setData({ listName: e.detail, errorMsg: "" });
    }
  },

  // 切换周期
  changeCycle(e) {
    this.setData({
      times: e.detail,
    });
  },

  // 选择周期
  clickCycle(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      times: name,
    });
  },
  // 选择打卡方式
  changeType(e) {
    console.log("打卡打卡", e);
    this.setData({
      type: e.detail,
    });
  },
  // 提交弹窗内容
  clickSubmit(data) {
    let classCode = 0;
    switch (data.currentTarget.dataset.value) {
      case "健康管理":
        classCode = 1;
        break;
      case "职业成长":
        classCode = 2;
        break;
      case "财务目标":
        classCode = 3;
        break;
      case "兴趣发展":
        classCode = 4;
    }
    console.log("classCode", classCode);
    // 周期名称映射
    let timesName = "";
    switch (this.data.times) {
      case "1":
        timesName = "每日一次";
        break;
      case "2":
        timesName = "每周一次";
        break;
      case "3":
        timesName = "每月一次";
        break;
    }
    // 如果项目名称为空，则不做任何操作
    if (!this.data.listName) {
      return;
    }
    // 新增项目
    let item = {
      listName: this.data.listName,
      times: this.data.times,
      timesName: timesName,
      type: this.data.type,
      typeName: this.data.type === "0" ? "勾选" : "进度条",
      classificationCode: classCode,
      classificationName: data.currentTarget.dataset.value,
    };
    console.log("SN 新增接口入参:", item);
    this.insertTodoList(item);
  },

  // 删除
  deleteItem(e) {
    let id = Number(e.currentTarget.dataset.item.id);
    console.log("删除接口入参", id);
    this.deleteTodoList(id);
  },

  // 选择打卡类型
  clickType(e) {
    console.log("打卡打卡", e.detail);
    this.setData({
      type: e.detail,
    });
  },

  // 获取 TODO list 接口
  getTodoList() {
    wx.request({
      url: "http://192.168.1.104:3007/api/getTodo",
      method: "get",
      success: (res) => {
        console.log("SN 获取TODO list数据", res);
        if (res.data.status === 200) {
          this.setData({
            healthList: res.data.data.filter((o) => o.classificationCode === 1),
            jobList: res.data.data.filter((o) => o.classificationCode === 2),
            financeList: res.data.data.filter(
              (o) => o.classificationCode === 3
            ),
            hobbyList: res.data.data.filter((o) => o.classificationCode === 4),
          });
        }
      },
    });
  },

  // 新增 TODO list 接口
  insertTodoList(data) {
    wx.request({
      url: "http://192.168.1.104:3007/api/insertTodo",
      method: "POST",
      data: data,
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        console.log("SN 新增TODO list 接口", res);
        if (res.data.status === 200) {
          this.setData({
            isDetailShow: false,
          });
          // 刷新Plan list
          this.getTodoList();
        }
      },
    });
  },

  // 删除 TODO list 接口
  deleteTodoList(id) {
    wx.request({
      url: `http://192.168.1.104:3007/api/deleteTodo/${id}`,
      method: "Get",
      success: (res) => {
        console.log("SN 删除TODO list 接口", res);
        if (res.data.status === 200) {
          // 刷新Plan list
          this.getTodoList();
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTodoList();
  },
});
