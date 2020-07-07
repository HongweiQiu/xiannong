
const g = typeof global !== 'undefined' ? global : self;
g.appXAppJson = {
  "app": {
    "$homepage": "pages/tabar/index",
    "subPackages": [
      {
        "root": "pages/index",
        "pages": [
          "shopdetail",
          "collect",
          "recommed",
          "newback",
          "search",
          "flashsale"
        ]
      },
      {
        "root": "pages/account",
        "pages": [
          "login",
          "selectway",
          "forget",
          "register",
          "service",
          "treaty",
          "bind",
          "404"
        ]
      },
      {
        "root": "pages/order",
        "pages": [
          "orderdetail",
          "address",
          "pay"
        ]
      },
      {
        "root": "pages/shopcart",
        "pages": [
          "delivery",
          "pay",
          "address",
          "shoplist"
        ]
      },
      {
        "root": "pages/user",
        "pages": [
          "accountmange",
          "accountadd",
          "accountedit",
          "modifypwd",
          "receipt",
          "invest",
          "investlist",
          "investrecord",
          "bill",
          "billdetail",
          "cash",
          "cashdetail",
          "myinfo",
          "bindphone",
          "userAddress",
          "address",
          "purchase_detail",
          "purchase_record"
        ]
      }
    ]
  }
};
