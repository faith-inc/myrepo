var expectPromo = "Firecams";
//var expectPromo = "Streamate";
//var expectPromo = "VisitXCam";
//var expectPromo = "CamsPower";
//var expectPromo = "ImLive";
//var expectPromo = "Stripchat";





module.exports = {
	expectedValuesSearch1 : {
  "1_1" :{
    placementId: 1,
    actionId: 1,
    promo: expectPromo,
    promocode:"hp",
    count: 1
    },
  "27_1":{
    placementId: 27,
    actionId: 1,
    promo: expectPromo,
    promocode:"empty",
    count: 5
    },
   "3_1":{
    placementId: 3,
    actionId: 1,
    promo: expectPromo,
    promocode:"profile_search",
    count: 5
    },
   
  "18_1" :{
    placementId: 18,
    actionId: 1,
    promo: expectPromo,
    promocode:"empty",
    count: 1
    }

  },

  expectedValuesSearch2 : {
  "1_2" :{
    placementId: 1,
    actionId: 2,
    promo: expectPromo,
    promocode:"hp",
    count: 1
    },
   "3_2":{
    placementId: 3,
    actionId: 2,
    promo: expectPromo,
    promocode:"profile_search",
    count: 1
    },
    "27_2":{
    placementId: 27,
    actionId: 2,
    promo: expectPromo,
    promocode:"empty",
    count: 1
    },
   "18_2" :{
    placementId: 18,
    actionId: 2,
    promo: expectPromo,
    promocode:"empty",
    count: 1
    }

  },

  expectedValuesLivecam1 : {
  	"4_1" :{
    placementId: 4,
    actionId: 1,
    promo: expectPromo,
    promocode:"profile_woc",
    count: 48
    },
    "18_1" :{
    placementId: 18,
    actionId: 1,
    promo: expectPromo,
    promocode:"empty",
    count: 1
    }
  },

   expectedValuesLivecam2 : {
  	"4_2" :{
    placementId: 4,
    actionId: 2,
    promo: expectPromo,
    promocode:"profile_woc",
    count: 1
    }
  },

  expectedValuesUserId1 : {
	"7_1" :{
    placementId: 7,
    actionId: 1,
    promo: expectPromo,
    promocode:"wc_modelprofile_profile_search",
    count: 2
    }
  }, 

  expectedValuesUserId2 : {
	"7_2" :{
    placementId: 7,
    actionId: 2,
    promo: expectPromo,
    promocode:"wc_modelprofile_profile_search",
    count: 1
    }
    
 },

 expectedValuesRooms1 : {
	"23_1" :{
    placementId: 23,
    actionId: 1,
    promo: expectPromo,
    promocode:"empty",
    count: 1
    }
    
 },
 expectedValuesRooms2 : {
	"23_2" :{
    placementId: 23,
    actionId: 2,
    promo: expectPromo,
    promocode:"empty",
    count: 1
    }
    
 },

 expectedValuesLivechat1 : {
	"15_1" :{
    placementId: 15,
    actionId: 1,
    promo: expectPromo,
    promocode:"profile_chatroom",
    count: 72
    }
    
 },
  expectedValuesLivechat2 : {
	"15_2" :{
    placementId: 15,
    actionId: 2,
    promo: expectPromo,
    promocode:"profile_chatroom",
    count: 1
    }
 },

 expectedValuesUserMenu1 : {
	"2_1" :{
    placementId: 2,
    actionId: 1,
    promo: expectPromo,
    promocode:"sidebar",
    count: 1
    }
 },

 expectedValuesUserMenu2 : {
	"2_2" :{
    placementId: 2,
    actionId: 2,
    promo: expectPromo,
    promocode:"sidebar",
    count: 1
    }
 }




}