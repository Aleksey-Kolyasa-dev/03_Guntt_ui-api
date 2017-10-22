/*START*/
/*USER AND RECOURCES APP CONTROLLER*/
	
angular.module('clhGunttApp').controller('gunttUsersObjCtrl', function($scope, $window, $document, $log){
	
////////////////*SAVE TO DB (LOCAL STORAGE)*////  
		$scope.saveToDataBase = function()
		{
			var save = angular.toJson(modelUserApp);

			$window.localStorage.setItem("clhGunttAppModela", save);

			$log.log('DB is Updated: ' + Date().toString() );
		}
////////////*END*/////

//*START*///////////////////*GLOBAL USER DATA*////
		//main User(GLOBAL) Data	
		$scope.user = modelUserApp.userMain; 

		//User Type Data
		$scope.userTypeCollection = $scope.user.userGunttCollection.userTypeCollection;

		//User Org Data
		$scope.userOrgCollection = $scope.user.userGunttCollection.userOrgCollection;

		//User Group Data
		$scope.userGroupCollection = $scope.user.userGunttCollection.userGroupCollection;

		//User Time Schedule data
		$scope.userTimeCollection = $scope.user.userGunttCollection.userTimeCollection;
			
		//User Resourses data
		$scope.userResourceCollection = $scope.user.userGunttCollection.userResourceCollection;
//*END*/////////////////GLOBAL USER DATA////


//*START*//////////////USER AND "RESOURCES INFO PANNELS-LEFT" DISPLAY HANDLERS//// 

		/*some  app-onload default data */
			// on load, "Organization displayed by Main User" is the 1st ORG in USER ORG COLLECTION
			$scope.userOrgCollection.userCurrentOrg.orgName = $scope.userOrgCollection.userOrgList[0].orgName;
			$scope.userOrgCollection.userCurrentOrg.orgRole = $scope.userOrgCollection.userOrgList[0].orgRole;
			$scope.userOrgCollection.userCurrentOrg.isMember = $scope.userOrgCollection.userOrgList[0].isMember;

		/*end*/
		
		/*show or hide "MAIN USER TIME LINE SECTION" in Guntt Time Table if USER is not assigned to displayed Org*/
		$scope.showUnassignegRoles = false; // default is hidden
		
		$scope.isUserAssignedToDisplayedOrg = function()
			{
				// show if is assigned 
				if($scope.userOrgCollection.userCurrentOrg.orgRole != 'not assigned'){ return true; }
				
				// show even not assigned, if the "SHOW UNASSIGNED OPTION" is active 
				if ($scope.showUnassignegRoles) { return true; }
			}
		/*end*/

		/*show or hide "RESOURCE TIME LINE SECTION" in Guntt Time Table if RESOURCE is not assigned to displayed Org*/
		$scope.isResourceAssignedToDisplayedOrg = function(role)
			{	
				if(role != 'not assigned'){ return true; }
				
				// show even not assigned, if the "SHOW UNASSIGNED OPTION" is active 	
				if($scope.showUnassignegRoles)  { return true; }
			}
		/*end*/

		/*Display Resource role in "Organization displayed by Main User" */
		function updateUserResourceCurrentOrg()
		{
			angular.forEach( $scope.userResourceCollection, function(resource)// (each RESOURCE )  
				{
					resource.resOwnerCurrentOrg.orgName = $scope.userOrgCollection.userCurrentOrg.orgName; // now the name of "Organization displayed by MAIN USER" is in the RESOURCE property 'orgName'
					
					resource.resOwnerCurrentOrg.orgRole = 'not assigned'; //now the role in "Organization displayed by MAIN USER" is in the RESOURCE property 'orgRole' and is a 'not assigned'

					resource.resOrg.forEach // but, if the RESOURCE is a member of the "Organization displayed by MAIN USER", change the RESOURCE role acc. to role assigned by MAIN USER.
					(
						function(resOrgCollectionUnit)
								{
							if(resOrgCollectionUnit.orgName == resource.resOwnerCurrentOrg.orgName)
							{
								resource.resOwnerCurrentOrg.orgRole = resOrgCollectionUnit.orgRole; 
							}
						}
					);
				}
			); 
		}
		/*end*/



		/*collapse button func's for MAIN USER*/
		$scope.collapseToggleUser = function()
		{
			$scope.user.isCollapsed = !$scope.user.isCollapsed; //toggle collapse
		}
		/*end*/	
//*END*////////////*USER AND "RESOURCES INFO PANNELS-LEFT" DISPLAY HANDLERS////



//*START*////////////*"DROPDOWN MENU IN HEADER" FUNC's//// 
		
		/*Organization header dropdown menu appearance handlers*/
		updateUserResourceCurrentOrg(); // update Resource role status acc. ot "Organization displayed by Main User"
	
		$scope.dropDownOrgListMenuHide = function(index) // hide() and update status
		{ 
			$scope.dropDownOrgListMenuToggle = false;
			
			$scope.userOrgCollection.userCurrentOrg.orgName = $scope.userOrgCollection.userOrgList[index].orgName;
			$scope.userOrgCollection.userCurrentOrg.orgRole = $scope.userOrgCollection.userOrgList[index].orgRole;
			$scope.userOrgCollection.userCurrentOrg.isMember = $scope.userOrgCollection.userOrgList[index].isMember;

			updateUserResourceCurrentOrg(); // update Resource role status acc. ot "Organization displayed by Main User"			
		}
		/*end*/
//*END*///////////*"DROPDOWN MENU IN HEADER" FUNC's//// 


//*START*///////// GROUP DISPLAY FILTER fn's////

	// display status for "resource-display-option" acc. to  applyed by MAIN USER Filter 
	$scope.updateDisplayGroups = function() 
	{
		angular.forEach( $scope.userResourceCollection, function(resource)	
			{	
						var check = 0; 

				angular.forEach( resource.resGroup, function(group, index)
					{
						if ( $scope.userGroupCollection.userGroupList[index].display == false )
						{
							if(group.isMember == true)
							{
								group.display = -1;
							}
							
							if(group.isMember == false)
							{
								group.display = 0;
							}
						} 
						else 
							{
								if(group.isMember == true)
								{
									group.display = 1;
								}
								else
									{
										group.display = 0;
									}
							}
													
							check = check + group.display;
					}
				);

				(check < 0) ? resource.display = false : resource.display = true;
			}
		);
	}

	$scope.updateDisplayGroups(); // default must be initiated
	//end

//*END*///////////GROUP DISPLAY FILTER fn's////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////*"MAIN MODAL MENUs"///////////////////////////////////////////////////

//*START*////////////*"RESOURCES MODAL MENU"//////
		
		/*CREATE NEW RESOURCE FUNC*/
		$scope.addNewResource = function(newResourseName)
		{
			if( angular.isDefined(newResourseName) )
			{	//create new resource
				$scope.userResourceCollection.push
				(
					{	
						resId : '' + $scope.userResourceCollection.length + 1, 
						resName : newResourseName, 
						resType : 'unknown', 
						resOrg : [],
						resOwnerCurrentOrg : {orgName:'not assigned', orgRole: 'not assigned'},
						resGroup : [], 
						resTimeCollection : 
						{
							recurringEvents : [],
							singleEvents : [],
						}
					}
				);
				
				// add a GROUP LIST COLLECTION to a New Resource and set membership in all groups as "not a member"(false)
				angular.forEach( $scope.userGroupCollection.userGroupList, function(group)
					{
						$scope.userResourceCollection[$scope.userResourceCollection.length - 1].resGroup.push
						(
							{
								groupName : group.groupName, 
								groupColor : group.groupColor, 
								isMember : false
							}

						);
					}
				);
				//end
				
				// add an ORG's LIST COLLECTION to a New Resource and set membership in all orgs as "not assigned"(false)
				angular.forEach( $scope.userOrgCollection.userOrgList, function(org)
					{
						$scope.userResourceCollection[$scope.userResourceCollection.length - 1].resOrg.push
						(
							{
								orgName : org.orgName, 
								orgRole : 'not assigned', 
								isMember : false
							}
						);
					}
				);
				//end

				// log event to console
				$log.debug("NEW RESOURCE CREATED, Name: " + newResourseName + ", Default Type: unknown"  );
				
				$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
			}

			updateUserResourceCurrentOrg();  //update Resource role status acc. to "Organization displayed by Main User"

			$scope.updateDisplayGroups(); //  group filter display status update

			$scope.newResourseName = ''; // after add New Resource is completed, clear the value
		}
		/*end*/

		
		/*REMOVE RESOURCE  FUNC*/
		$scope.removeResource = function(index)
		{
			var removed = $scope.userResourceCollection.splice(index, 1);

			$log.debug("RESOURCE REMOVED, Name: "+ removed[0].resName + ", Type:" + removed[0].resType );

			$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
		}
		/*end*/
//*END*//////////*"RESOURCES MODAL MENU"//////


///////////////////////////////////*"RESOURCES MODAL MENU's>Edit" *START*//////////////////////////////////////////////////	
		
		/* "Edit button" func in "RESOURCES MODAL MENU"*/
		$scope.currentResourceEditMenuOpen = {}; // "Current Editing Resource" Data mini-Obj  
		$scope.resourceEditMenuOpenStatus = false; // default "Resource Edit Menu" is closed 
		
//*START*///////////////// open "Resource Edit Menu" event /////
		$scope.resourceEditMenuOpen = function(resIndex, resName)
		{
			$scope.currentResourceEditMenuOpen.resIndex = resIndex; // add "Current Editing Resource" index to mini-Obj
			$scope.currentResourceEditMenuOpen.resName = resName;	// add "Current Editing Resource" name to mini-Obj
			$scope.resourceEditMenuOpenStatus = true; // hide EDIT/DEL/ADD Btn's

			//RESOURCE NAME EDIT (rename) SUB-MENU
			$scope.applyResEditNewName = function()
			{	
				if(angular.isDefined($scope.newResName))
				{
					$scope.userResourceCollection[resIndex].resName = $scope.newResName;
					
					$log.debug("RESOURCE RENAMED with new name: " + $scope.newResName + ".");

					$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
					
					$scope.newResName = '';			
				}
			}
			//end


			//RESOURCE TYPE EDIT SUB-MENU 
			$scope.applyResEditSelectedType = function(selectedType)
			{	
				if(angular.isDefined(selectedType))
				{
					$scope.userResourceCollection[resIndex].resType = selectedType;// apply selected resource type

					$log.debug("RESOURCE " + $scope.userResourceCollection[resIndex].resName + " TYPE changed for: " + selectedType + ".");

					$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
				}		
			}

			//RESOURCE GROUP EDIT SUB-MENU START
				$scope.applyResEditSelectedGroup = function(group)
				{
					$log.debug("RESOURCE " + $scope.userResourceCollection[resIndex].resName + " GROUPs changed." );

					$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
				}
			//RESOURCE GROUP EDIT SUB-MENU END


			//RESOURCE ORGANIZATION EDIT SUB-MENU
			$scope.resOrgMembershipCheck = function(index)  // check status and display in checkboxes		
			{
				if( $scope.userResourceCollection[resIndex].resOrg[index].orgRole != 'not assigned' )// if user is an org member, put flag true(for display option)
					return true;

				$scope.resOrgMembershipSetup = function()  // apply new changes	
				{
					angular.forEach( $scope.userResourceCollection[resIndex].resOrg, function(org)
						{	
							// if flag is true, but not a member, change to User
							if( org.isMember == true && org.orgRole == 'not assigned' ) { org.orgRole = 'User'; } 
							
							// if flag is false, but res is org member, change to 'not a member'(not assigned)
							if( org.isMember == false && org.orgRole != 'not assigned' ) { org.orgRole = 'not assigned'; } 
						}
					);
					
					updateUserResourceCurrentOrg();  //update Resource role status acc. to "Organization displayed by Main User"

					$log.debug(	"RESOURCE " + $scope.userResourceCollection[resIndex].resName + " ROLE changed.");
								
					$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
				}
			}//end
		}
//*END*///////////////// open "Resource Edit Menu" event /////
		
		//close "Resource Edit Menu" and EVENT
		$scope.resourceEditMenuClose = function()
		{
			$scope.resourceEditMenuOpenStatus = false;//close the "Resource Edit Menu"
			$scope.currentResourceEditMenuOpen = {}; // Erase Data in "Current Editing Resource" mini-Obj 
		}
		/*end*/


						//----- toDay
						$scope.day = "day";
						$scope.setdays = function(value){
							$scope.day = value;
						}
						//--- 

///////////////////////////////////*"RESOURCES MODAL MENU>Edit" *END*////////////////////////////////////////////////////	


///////////////////////////////////*"TYPE/GROUPS/ORGs MODAL MENU's *START*///////////////////////////////////////////////

//*START*//////////////////*"TYPES MODAL MENU" */////	
		
		/*CREATE NEW TYPE Fn*/
		$scope.addNewType = function(newTypeName)
		{
			if( angular.isDefined(newTypeName) )
			{	
				//create new type
				$scope.userTypeCollection.userTypesList.push(newTypeName);
				
				// log event to console
				$log.debug("NEW TYPE CREATED, Name: " + newTypeName );
				
				$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
			}

			$scope.newTypeName = ''; // after add New Type is completed, clear the value
		}
		/*end*/

		
		/*REMOVE TYPE  FUNC*/
		$scope.removeType = function(index)
		{
			var removed = $scope.userTypeCollection.userTypesList.splice(index,1);

			angular.forEach( $scope.userResourceCollection, function(resource)				
				{
					if( $scope.userTypeCollection.userTypesList.indexOf(resource.resType) == -1)
					{
						resource.resType = 'unknown';
					}
				}
			);

			$log.debug("TYPE REMOVED: "+ removed[0] );

			$scope.saveToDataBase(); //Save changes in DB (LOCAL STORAGE)

			$scope.typeRemovePannelShow = false; // CLOSE Type Remove-sub-menu when Type is removed 
		}
		/*end*/
//*END*///////////////////*"TYPES MODAL MENU" */////	


//*START*//////////////////*"GROUPS MODAL MENU" */////	
		
		/*CREATE NEW GROUP FUNC*/
		$scope.addNewGroup = function(newGroupName)
		{
			if( angular.isDefined(newGroupName) )
			{	
				// add new group to MAIN USER GROUPS collection
				$scope.userGroupCollection.userGroupList.push 
				(
					{
						groupName : newGroupName,
						groupColor : '#999999',
						isMember : false,
						display : true
					}
				);

				// add new group to each RESOURCE GROUPS collection
				angular.forEach( $scope.userResourceCollection, function(resource)  
					{
						resource.resGroup.push
						(
							{
								groupName : newGroupName,
								groupColor : '#999999',
								isMember : false,
								display : true
							}
						);
					}
				);
				
				$scope.updateDisplayGroups(); // update data for GROUP DISSPLAY FILTER
				
				// log event to console
				$log.debug("NEW GROUP CREATED: " + newGroupName );
				
				$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
			}
			
			$scope.newGroupName = ''; // after add New Group is completed, clear the value
		}
		/*end*/

		
		/*REMOVE GROUP  FUNC*/
		$scope.removeGroup = function(index)
		{
			var removed = $scope.userGroupCollection.userGroupList.splice(index,1); // remove group from MAIN USER GROUPS collection

			// remove group from each RESOURCE GROUPS collection
			angular.forEach( $scope.userResourceCollection, function(resource)
					{
						resource.resGroup.splice(index,1);
						
					}
				);

			$log.debug("GROUP REMOVED: " + removed[0].groupName );

			$scope.saveToDataBase(); //Save changes in DB (LOCAL STORAGE)

			$scope.groupRemovePannelShow = false; // CLOSE Resource Remove-sub-menu when resource is removed 
		}
		/*end*/
//*END*///////////////////*"GROUPS MODAL MENU" */////


//*START*//////////////////*"GROUPS MODAL MENU>Edit" */////
		
		/* "Edit button" func in "GROUPS MODAL MENU"*/		
		$scope.currentGroupEditMenuOpen = {}; // "Current Editing Group" Data mini-Obj  
		$scope.groupEditMenuOpenStatus = false; // default "Group Edit Menu" is closed 
		
		// open "Group Edit Menu" event *START*
		$scope.groupEditMenuOpen = function( grIndex, grName )
		{
			$scope.currentGroupEditMenuOpen.grIndex = grIndex; // add "Current Editing Group" index to mini-Obj
			$scope.currentGroupEditMenuOpen.grName = grName;	// add "Current Editing Group" name to mini-Obj
			$scope.groupEditMenuOpenStatus = true; // hide EDIT/DEL/ADD control BTN's 

			//GROUP NAME EDIT SUB-MENU
			$scope.applyGroupEditNewName = function()
			{	
				if( angular.isDefined($scope.newGroupRename) ) 
				{
				
					$scope.userGroupCollection.userGroupList[grIndex].groupName = $scope.newGroupRename;

					// change new group name in each RESOURCE GROUPS collection
					angular.forEach( $scope.userResourceCollection, function(resource)
						{
							resource.resGroup[grIndex].groupName = $scope.newGroupRename;
						}
					);

					$log.debug("GROUP RENAMED for: " + $scope.newGroupRename + ".");

					$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)

					$scope.newGroupRename = '';
				}
			}
			//end


			//GROUP COLOR EDIT SUB-MENU 
			$scope.applyGroupEditSelectedColor = function(selectedColor)
			{

				if( angular.isDefined(selectedColor) )
				{	
					// apply selected color in USER GROUP COLOR
					$scope.userGroupCollection.userGroupList[grIndex].groupColor = selectedColor;
					
					// change new group color in each RESOURCE GROUPS collection
					angular.forEach( $scope.userResourceCollection, function(resource)
						{
							resource.resGroup[grIndex].groupColor = selectedColor;
						}
					);

					$log.debug("GROUP '" + $scope.userGroupCollection.userGroupList[grIndex].groupName + "' COLOR CANGED for: " + selectedColor + ".");

					$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
				}
			}//end
		

		}//open "Group Edit Menu" event *END*

		
		//close "Group Edit Menu" EVENT
		$scope.groupEditMenuClose = function()
		{
			$scope.groupEditMenuOpenStatus = false;// show EDIT/DEL/ADD control BTN's 
			$scope.currentGroupEditMenuOpen = {}; // Erase Data in "Current Editing Group" mini-Obj 
		}
		/*end*/		
//*END*////////////////////*"GROUPS MODAL MENU>Edit" */////


//*START*//////////////////*"ORGANIZATIONS MODAL MENU" */////	
		
		/*CREATE NEW ORGANIZATION FUNC*/
		$scope.addNewOrganization = function(newOrgName)
		{
			if( angular.isDefined(newOrgName) )
			{	
				// add new organization to MAIN USER ORG's collection
				$scope.userOrgCollection.userOrgList.push 
				(
					{
						orgName : newOrgName,
						orgRole : 'Owner',
						isMember : true
					}
				);
				
				// add new organization to each RESOURCE ORG's collection
				angular.forEach( $scope.userResourceCollection, function(resource)
					{
						resource.resOrg.push
						(
							{
								orgName : newOrgName,
								orgRole : 'not assigned',
								isMember : false
							}
						);
					}
				);
				
				// log event to console
				$log.debug("NEW ORGANIZATION CREATED: " + newOrgName + ".");
				
				$scope.saveToDataBase();   //Save changes in DB (LOCAL STORAGE)
			}
		
			$scope.newOrgName = ''; // after add New organization is completed, clear the value
		}
		/*end*/

		
		/*REMOVE ORGANIZATION  FUNC*/
		$scope.removeOrganization = function(index)
		{	// remove organization from MAIN USER ORGANIZATIONS collection
			var removed = $scope.userOrgCollection.userOrgList.splice(index,1); 

			// remove organization from each RESOURCE ORGANIZATIONS collection
			angular.forEach( $scope.userResourceCollection, function(resource)
					{
						resource.resOrg.splice(index,1);
					}
				);

			// if removed ORG is currently displayed on MAIN SCREEN, then shift display to 1st org in USER ORGANIZATION COLLECTION
			if(removed[0].orgName == $scope.userOrgCollection.userCurrentOrg.orgName)
			{		
				$scope.userOrgCollection.userCurrentOrg.orgName = $scope.userOrgCollection.userOrgList[0].orgName;
				$scope.userOrgCollection.userCurrentOrg.orgRole = $scope.userOrgCollection.userOrgList[0].orgRole;
				$scope.userOrgCollection.userCurrentOrg.isMember = $scope.userOrgCollection.userOrgList[0].isMember;

				updateUserResourceCurrentOrg(); // update Resource role status acc. ot "Organization displayed by Main User"
				//$scope.dropDownOrgListMenuHide(0); // 		
			}

			$log.debug( "ORGANIZATION REMOVED: " + removed[0].orgName + "." );

			$scope.saveToDataBase(); //Save changes in DB (LOCAL STORAGE)

			$scope.orgRemovePannelShow = false; // CLOSE Organization Remove-sub-menu when Organization is removed 
		}
		/*end*/
//*END*////////////////////*"ORGANIZATIONS MODAL MENU" */////


//*START*//////////////////*"ORGANIZATIONS MODAL MENU>Edit" */////	
		
		/* "Edit button" func in "ORGANIZATIONS MODAL MENU"*/	
		$scope.currentOrganizationEditMenuOpen = {}; // "Current Editing Organization" Data mini-Obj  
		$scope.OrganizationEditMenuOpenStatus = false; // default "Organization Edit Menu" is closed 
		
		// open "Organization Edit Menu" event START
		$scope.organizationEditMenuOpen = function(orgIndex)
		{
			$scope.currentOrganizationEditMenuOpen.orgIndex = orgIndex; // add "Current Editing Organization" index to mini-Obj
				
			$scope.OrganizationEditMenuOpenStatus = true; // hide EDIT/DEL/ADD control BTN's 

			//ORGANIZATIONS NAME EDIT SUB-MENU
			$scope.applyOrgEditNewName = function()
			{	
				if( angular.isDefined($scope.groupRenameInput) )
				
				$scope.userOrgCollection.userOrgList[orgIndex].orgName = $scope.groupRenameInput;

				// change new organization name in each RESOURCE ORGANIZATIONS collection
				angular.forEach( $scope.userResourceCollection, function(resource)
					{
						resource.resOrg[orgIndex].orgName = $scope.groupRenameInput;
					}
				);
				//end
				
				$log.debug("ORGANIZATION RENAMED for: " + $scope.groupRenameInput + ".");

				$scope.saveToDataBase();  //Save changes in DB (LOCAL STORAGE)

				// Update NEW ORG NAME in CURRENT ORGANIZATION DISPLAYED BY MAIN USER 
				$scope.dropDownOrgListMenuHide(orgIndex); 
				
				$scope.groupRenameInput = ''; // clear value
			}
			//end


			//ORGANIZATIONS ROLES EDIT SUB-MENU 
				// FOR USER
			$scope.userOrgEditRoleChange = function(userSelectedRole)
			{	// apply user selected role in organization
				if( angular.isDefined(userSelectedRole) )
				
					$scope.userOrgCollection.userOrgList[orgIndex].orgRole = userSelectedRole;
				
				// apply user selected role in CURRENT ORGANIZATION DISPLAYED BY MAIN USER
				if($scope.userOrgCollection.userCurrentOrg.orgName == $scope.userOrgCollection.userOrgList[orgIndex].orgName)
				{
					$scope.userOrgCollection.userCurrentOrg.orgRole = userSelectedRole;
				}

				// change membership flag in case of 'not assigned'
				if( userSelectedRole == 'not assigned' )
				{
					$scope.userOrgCollection.userOrgList[orgIndex].isMember = false;
				}
				//end

				$scope.roleBtnTrigger = false; // close organization-role-edit sub-menu

				$scope.saveToDataBase(); //Save changes in DB (LOCAL STORAGE)

			
			}//end

				//FOR RESOURCE
			$scope.resOrgEditRoleChange = function(resSelectedRole, resIndex)
			{	// apply resource selected role in organization
				if( angular.isDefined(resSelectedRole) ) 
				{	
					$scope.userResourceCollection[resIndex].resOrg[orgIndex].orgRole = resSelectedRole;
				}
				
				// change membership flag in case of 'not assigned'
				if( resSelectedRole == 'not assigned')
				{
					$scope.userResourceCollection[resIndex].resOrg[orgIndex].isMember = false;
				}
				//end

				updateUserResourceCurrentOrg();// update role status on display

				$scope.saveToDataBase(); //Save changes in DB (LOCAL STORAGE)

				$scope.resRoleBtnTrigger = false; // close organization-role-edit sub-menu
			
			}//end
		
		}
		//open "Organization Edit Menu" event END

		
		//close "Organization Edit Menu" EVENT
		$scope.organizationEditMenuClose = function()
		{
			$scope.OrganizationEditMenuOpenStatus = false;//close the "Organization Edit Menu"
			$scope.currentOrganizationEditMenuOpen = {}; // Erase Data in "Current Editing Organization" mini-Obj 
		}
		/*end*/		
//*END*////////////////////*"ORGANIZATIONS MODAL MENU>Edit" */////


///////////////////////////////////*"TYPE/GROUPS/ORGs MODAL MENU's *END*///////////////////////////////////////////////



		var timerEndgunttUsersObjCtrl = Date.now();
		
		var totalTimegunttUsersObjCtrl = timerEndgunttUsersObjCtrl - timerStart;

		$log.info('2)  gunttUsersObjCtrl loaded in ' + totalTimegunttUsersObjCtrl + 'ms');

});
/*USER AND RECOURCES APP CONTROLLER*/
/*END*/