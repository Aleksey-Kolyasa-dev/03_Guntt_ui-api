// Require : jQuery, jQuery UI
angular.module('clhGunttApp').directive('directiveResizable', function() 
{
   return 	{
	                         
		        link: function (scope, element, attrs) 
		        {                                                                                                                  
			        jQuery(element).resizable();
			        
		  		}
 			}	
});  
