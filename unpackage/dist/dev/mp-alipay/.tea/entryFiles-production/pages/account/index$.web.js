function success(){
require('../../../../components/uni-status-bar/uni-status-bar?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../../../components/uni-icons/uni-icons?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../../../components/uni-nav-bar/uni-nav-bar?hash=e131c6705ecd6504274661106fc380014f3123b8');
require('../../../../components/identifyingcode/index?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../../../components/helang-moveVerify/helang-moveVerify?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../../../pages/account/login?hash=57f163bfc0512e187bc203ae92656c7a1ba9e313');
require('../../../../pages/account/selectway?hash=57f163bfc0512e187bc203ae92656c7a1ba9e313');
require('../../../../pages/account/forget?hash=0cce962104fde57ac47ff85077293c14c4b7f935');
require('../../../../pages/account/register?hash=0cce962104fde57ac47ff85077293c14c4b7f935');
require('../../../../pages/account/service?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../../../pages/account/treaty?hash=57f163bfc0512e187bc203ae92656c7a1ba9e313');
require('../../../../pages/account/bind?hash=0cce962104fde57ac47ff85077293c14c4b7f935');
require('../../../../pages/account/404?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapSubPackage('pages/account', {success});