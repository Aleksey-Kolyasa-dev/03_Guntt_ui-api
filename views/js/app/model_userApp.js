var modelUserApp = {};
if(window.localStorage['clhGunttAppModela']){
    modelUserApp = JSON.parse(window.localStorage['clhGunttAppModela']);
} else {
	  modelUserApp =
	 {
	 userMain :
	 {
	 userName: "Mickle",
	 isUserAdmin : true,
	 isHidden : false,
	 isCollapsed: false,

	 userGunttCollection :
	 {
	 userTypeCollection:
	 {
	 userCurrentType : "Person",
	 userTypesList : ["Person","Item", "Tool", "Room", "Vehicle"]
	 },

	 userOrgCollection :
	 {
	 userCurrentOrg : {orgName:"BDN-Group", orgRole: "Owner", isMember: true},

	 userOrgList :
	 [
	 {orgName:"BDN-Group", orgRole: "Owner", isMember: true},
	 {orgName:"Test-Group", orgRole:"Administrator", isMember: true},
	 {orgName:"CLH-Group", orgRole:"Owner", isMember: true},
	 {orgName:"Google", orgRole: "not assigned", isMember: false}

	 ],

	 userOrgRolesCollection: ['Owner', 'Chief Admin', 'Admin','Party Chief','User', 'Visitor', 'not assigned']
	 },

	 userGroupCollection :
	 {
	 userCurrentGroup :
	 [
	 {groupName:"Web", groupColor:"#ffa500"},
	 ],

	 userGroupList :
	 [
	 {groupName:"Web", groupColor:"#ffa500", isMember: true, display: true},
	 {groupName:"Design", groupColor:"#9400d3", isMember: false, display: true}
	 ],

	 userGroupColorsCollection :
	 [
	 '#E0E0E0',
	 '#000000',
	 '#FF0000',
	 '#ffa500',
	 '#FFE047',
	 '#B6FF00',
	 '#00E221',
	 '#0094FF',
	 '#4800FF',
	 '#9400d3',
	 ]

	 },

	 userTimeCollection:
	 {
	 weekDays :
	 [
	 {day : "Sun", checked : false},
	 {day : "Mon", checked : false},
	 {day : "Tue", checked : false},
	 {day : "Wed", checked : false},
	 {day : "Thu", checked : false},
	 {day : "Fri", checked : false},
	 {day : "Sat", checked : false},
	 ],

	 recurringEvents :
	 [

	 ],

	 singleEvents:
	 [

	 ]

	 },

	 //RECOURCES COLLECTION
	 userResourceCollection : //resource
	 [
	 {// first res
	 resId:"1",
	 resName : "Andrew",
	 resType : "Person",
	 isCollapsed: false,

	 resOrg :
	 [
	 {orgName:"BDN-Group", orgRole: "Administrator", isMember: true},
	 {orgName:"Test-Group", orgRole:"Owner", isMember: true},
	 {orgName:"CLH-Group", orgRole:"User", isMember: true},
	 {orgName:"Google", orgRole: "not assigned", isMember: false}
	 ],
	 resOwnerCurrentOrg: {orgName:"BDN-Group", orgRole: "Administrator", isMember: true},

	 resGroup:
	 [
	 {groupName:"Web", groupColor:"#ffa500", isMember: true, display: true},
	 {groupName:"Design", groupColor:"#9400d3", isMember: false, display: true}
	 ],

	 resTimeCollection:
	 {

	 recurringEvents :
	 [
	 ],

	 singleEvents :
	 [

	 ],
	 },
	 },

	 {//second res
	 resId:"2",
	 resName : "Jane",
	 resType : "Person",
	 isCollapsed: false,

	 resOrg :
	 [
	 {orgName:"BDN-Group", orgRole: "User", isMember: true},
	 {orgName:"Test-Group", orgRole:"not assigned", isMember: false},
	 {orgName:"CLH-Group", orgRole:"Owner", isMember: true},
	 {orgName:"Google", orgRole: "not assigned", isMember: false}
	 ],
	 resOwnerCurrentOrg:{orgName:"BDN-Group", orgRole: "User", isMember: true},

	 resGroup:
	 [
	 {groupName:"Web", groupColor:"#ffa500", isMember: true, display: true},
	 {groupName:"Design", groupColor:"#9400d3", isMember: false, display: true}
	 ],

	 resTimeCollection:
	 {
	 singleEvents :[],
	 recurringEvents :[],

	 }
	 },

	 {//third res
	 resId:"3",
	 resName : "Sandra",
	 resType : "Person",
	 isCollapsed: false,

	 resOrg :
	 [
	 {orgName:"BDN-Group", orgRole: "User", isMember: true},
	 {orgName:"Test-Group", orgRole:"not assigned", isMember: false},
	 {orgName:"CLH-Group", orgRole:"Administrator", isMember: true},
	 {orgName:"Google", orgRole: "not assigned", isMember: false}
	 ],
	 resOwnerCurrentOrg: {orgName:"BDN-Group", orgRole: "User", isMember: true},

	 resGroup:
	 [
	 {groupName:"Web", groupColor:"#ffa500", isMember: false, display: true},
	 {groupName:"Design", groupColor:"#9400d3", isMember: true, display: true}
	 ],

	 resTimeCollection:
	 {
	 singleEvents :[],
	 recurringEvents :[],
	 }
	 },

	 {//forth res
	 resId:"4",
	 resName : "Alex",
	 resType : "Person",
	 isCollapsed: false,

	 resOrg :
	 [
	 {orgName:"BDN-Group", orgRole: "User", isMember: true},
	 {orgName:"Test-Group", orgRole:"not assigned", isMember: false},
	 {orgName:"CLH-Group", orgRole:"not assigned", isMember: false},
	 {orgName:"Google", orgRole: "Administrator", isMember: true}

	 ],
	 resOwnerCurrentOrg: {orgName:"BDN-Group", orgRole: "User", isMember: true},

	 resGroup:
	 [
	 {groupName:"Web", groupColor:"#ffa500", isMember: true, display: true},
	 {groupName:"Design", groupColor:"#9400d3", isMember: true, display: true}
	 ],

	 resTimeCollection:
	 {
	 singleEvents :[],
	 recurringEvents :[],
	 }
	 },

	 {//fifth res
	 resId:"5",
	 resName : "PC1",
	 resType : "Item",
	 isCollapsed: false,

	 resOrg :
	 [
	 {orgName:"BDN-Group", orgRole: "User", isMember: true},
	 {orgName:"Test-Group", orgRole:"User", isMember: true},
	 {orgName:"CLH-Group", orgRole:"not assigned", isMember: false},
	 {orgName:"Google", orgRole: "User", isMember: true}

	 ],
	 resOwnerCurrentOrg: {orgName:"BDN-Group", orgRole: "User", isMember: true},

	 resGroup:
	 [
	 {groupName:"Web", groupColor:"#ffa500", isMember: true, display: true},
	 {groupName:"Design", groupColor:"#9400d3", isMember: true, display: true}
	 ],

	 resTimeCollection:
	 {
	 singleEvents :[],
	 recurringEvents :[],
	 }
	 },


	 ]
	 }


	 }
	 }

}




		