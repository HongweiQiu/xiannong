function success(){
require('../../../../components/uni-status-bar/uni-status-bar?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../../../components/uni-icons/uni-icons?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../../../components/uni-nav-bar/uni-nav-bar?hash=e131c6705ecd6504274661106fc380014f3123b8');
require('../../../../components/stepper/index?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../../../components/uni-transition/uni-transition?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../../../components/uni-popup/uni-popup?hash=63f3d097e78ac04213190ce4a92c81860617f7b4');
require('../../../../components/keyboard/index?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../../../pages/shopcart/delivery?hash=f0d7a58cb04cc482c81bea1feee610d1e562034d');
require('../../../../pages/shopcart/pay?hash=57f163bfc0512e187bc203ae92656c7a1ba9e313');
require('../../../../pages/shopcart/address?hash=57f163bfc0512e187bc203ae92656c7a1ba9e313');
require('../../../../pages/shopcart/shoplist?hash=f831ca20dae71cc4448ce6b15865bd18e3edbd9c');
}
self.bootstrapSubPackage('pages/shopcart', {success});