module.exports = {
	selectorsOnSearch : {
		//"+1" : "#headerContent>div>div>div>button:nth-child(3)" ,
		//"+1" : "#headerContent>div>div>div~div>button:nth-child(2)",
		"+1" : " i.icon__webcam",

		"+3": "#searchUserList >div:nth-child(6)>div ._userButtons a",
		"+27": "#searchUserList >div:nth-child(6)>div>div>a",
		"+18": "#searchSortTabs> div [data-tab='livecam']"
		
	},
	selectorsOnLivecam : {
		"+4": "#searchUserList >div:nth-child(2)>div ._userButtons a"
	},
	selectorsOnUserId : {
		"+7": "div._statusBadge ~div>div>a"

	},
	selectorsOnRooms : {
		//"+23" : "div.tabs>div>div:nth-child(3)"
		"+23" : "div [data-inv-plc='linkInChatRooms']"
	},
	selectorsOnLivechat : {
		"+15" : "div._content>div>div>div>a"
	},
	selectorsOnUserMenu : {
		"+2" : "div[data-test='userMenuButton']",
		"+2_2": "div[data-test='userMenu']>div>a[target=_blank]"
	}

}