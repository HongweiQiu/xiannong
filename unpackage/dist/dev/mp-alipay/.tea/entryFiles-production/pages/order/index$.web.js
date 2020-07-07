function success(){
require('../../../../components/uni-status-bar/uni-status-bar?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../../../components/uni-icons/uni-icons?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../../../components/uni-nav-bar/uni-nav-bar?hash=e131c6705ecd6504274661106fc380014f3123b8');
require('../../../../pages/order/orderdetail?hash=57f163bfc0512e187bc203ae92656c7a1ba9e313');
require('../../../../pages/order/address?hash=57f163bfc0512e187bc203ae92656c7a1ba9e313');
require('../../../../pages/order/pay?hash=57f163bfc0512e187bc203ae92656c7a1ba9e313');
}
self.bootstrapSubPackage('pages/order', {success});