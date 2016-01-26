/**
 * Project
 * 
 * Version  Date            Author           					Remarks
 * 1.00          		
 */



function main(request, response)	// initial function called as default function in script
{	
	if(request.getMethod() == 'GET')	// as script is run
	{
		function1();
	}
}

function function1() {

	var columns = new Array();
	columns[0]   = new nlobjSearchColumn('internalid').setSort(); // Internal ID
	columns[1]   = new nlobjSearchColumn('datecreated'); // Date Created
	columns[2]   = new nlobjSearchColumn('legalname'); // Name
	columns[3]   = new nlobjSearchColumn('custentity5'); // Company Type
	columns[4]   = new nlobjSearchColumn('custentity6'); // Supplier Type
	columns[5]   = new nlobjSearchColumn('custentity7'); // Supplier Notes
	columns[6]   = new nlobjSearchColumn('custentity8'); // Main Store Departments
	columns[7]   = new nlobjSearchColumn('custentity9'); // Products Description
	columns[8]  = new nlobjSearchColumn('custentity10'); // Products Comments
	columns[9]  = new nlobjSearchColumn('custentity11'); // Owner
	columns[10]  = new nlobjSearchColumn('custentity12'); // Account Rep
	columns[11]  = new nlobjSearchColumn('custentity13'); // Credit and AR
	columns[12]  = new nlobjSearchColumn('custentity14'); // Primary Contact
	columns[13]  = new nlobjSearchColumn('email'); // Email
	columns[14]  = new nlobjSearchColumn('fax'); // Fax
	columns[15]  = new nlobjSearchColumn('phone'); // Office Phone
	columns[16]  = new nlobjSearchColumn('custentity16'); // Billing Address
	columns[17]  = new nlobjSearchColumn('custentity17'); // FedEx Address or Physical Address
	columns[18]  = new nlobjSearchColumn('url'); // Web Address
	columns[19]  = new nlobjSearchColumn('comments'); // Comments
	columns[20]  = new nlobjSearchColumn('custentity_comments2'); // Dated History
	columns[21]  = new nlobjSearchColumn('accountnumber'); // ACCOUNT # 
	columns[22]  = new nlobjSearchColumn('terms'); // Terms	
	columns[23]  = new nlobjSearchColumn('homephone'); // Phone
	columns[24]  = new nlobjSearchColumn('lastmodifieddate'); // Last Modified
	columns[25]  = new nlobjSearchColumn('creditlimit'); // Credit Limit
	columns[26]  = new nlobjSearchColumn('balance'); // Balance
	columns[27]  = new nlobjSearchColumn('giveaccess'); // Login Access
	columns[28]  = new nlobjSearchColumn('custentity19'); // Minimum Order Information
	columns[29]  = new nlobjSearchColumn('custentity20'); // Discount % minimum
	columns[30]  = new nlobjSearchColumn('custentity21'); // Discount % Maximum (or only discount)
	columns[31]  = new nlobjSearchColumn('custentity22'); // Discount Notes
	columns[32]  = new nlobjSearchColumn('custentity24'); // CUSTOMER ACCOUNT # 

	var results = nlapiSearchRecord('vendor', null, null, columns);

	var allResults 	= new Array();
	allResults 		= allResults.concat(results);
	
	while(results.length == 1000){
		
		var lastId 	= results[999].getValue('internalid');
		filters[0]	= new nlobjSearchFilter('internalidNumber', null, 'greaterthanorequalto', lastId);
		var results = nlapiSearchRecord('vendor', null, null, columns);
		allResults 	= allResults.concat(results);
	}
	
	
	var filters2 = new Array();
	filters2[0] = new nlobjSearchFilter('type', 'transaction', 'is', 'VendBill');
	
	var columns2 = new Array();
	columns2[0] = new nlobjSearchColumn('legalname', null, 'group');
	columns2[1] = new nlobjSearchColumn('amount', 'transaction', 'sum');
	columns2[2] = new nlobjSearchColumn('trandate', 'transaction', 'max');
	columns2[3] = new nlobjSearchColumn('internalid', null, 'group');

	var results2 = nlapiSearchRecord('vendor', null, filters2, columns2);

	var allResults2 	= new Array();
	allResults2 		= allResults2.concat(results2);
	
	while(results2.length == 1000){
		
		var lastId 	= results2[999].getValue('internalid', null, 'group');
		filters2[1]	= new nlobjSearchFilter('internalidNumber', null, 'greaterthanorequalto', lastId);
		
		var results2 = nlapiSearchRecord('vendor', null, filters2, columns2);
		
		allResults2 	= allResults2.concat(results2);
	}
	
	w = window;
	for(var i = 0; i < allResults2.length; i++){
		
		w["vendor" + allResults2[i].getValue('internalid', null, 'group')] = {amount: allResults2[i].getValue('amount', 'transaction', 'sum'), date: allResults2[i].getValue('trandate', 'transaction', 'max')}; 

	}
	
	//sku count all
	var filters3 = new Array();
	filters3[0] = new nlobjSearchFilter('othervendor', null, 'noneof', '@NONE@');
	
	var columns3 = new Array();
	columns3[0] = new nlobjSearchColumn('othervendor', null, 'group');
	columns3[1] = new nlobjSearchColumn('internalid', null, 'count');

	var results3 = nlapiSearchRecord('item', null, filters3, columns3);

	var allResults3 	= new Array();
	allResults3 		= allResults3.concat(results3);
	
	for(var i = 0; i < allResults3.length; i++){
		
		print(allResults3[i].getValue('othervendor', null, 'group'), allResults3[i].getText('othervendor', null, 'group'))
		
		w["skuAll" + allResults3[i].getValue('othervendor', null, 'group')] = {sku: allResults3[i].getValue('internalid', null, 'count')}; 

	}
	
	//sku count
	var filters4 = new Array();
	filters4[0] = new nlobjSearchFilter('othervendor', null, 'noneof', '@NONE@');
	filters4[1] = new nlobjSearchFilter('isonline', null, 'is', 'T');
	
	var columns4 = new Array();
	columns4[0] = new nlobjSearchColumn('othervendor', null, 'group');
	columns4[1] = new nlobjSearchColumn('internalid', null, 'count');

	var results4 = nlapiSearchRecord('item', null, filters4, columns4);

	var allResults4 	= new Array();
	allResults4 		= allResults4.concat(results4);
	
	for(var i = 0; i < allResults4.length; i++){
		
		print(allResults4[i].getValue('othervendor', null, 'group'), allResults4[i].getText('othervendor', null, 'group'))
		
		w["skuInStore" + allResults4[i].getValue('othervendor', null, 'group')] = {sku: allResults4[i].getValue('internalid', null, 'count')}; 

	}
	
	

	html  = '<html>';
	html += '<head>';
	html += '<script src="https://system.netsuite.com/core/media/media.nl?id=359359&c=811217&h=65afe36a877be122622c&_xt=.js"></script>';  // table sort
	html += '<link rel="stylesheet" type="text/css" href="https://system.netsuite.com/core/media/media.nl?id=479526&c=811217&h=7271faad9dd8857ba631&_xt=.css">'; 
	//html += '<script src="http://code.jquery.com/jquery-1.5.1.min.js" type="text/javascript"></script>';
	//html += '<script src="https://system.netsuite.com/core/media/media.nl?id=420986&c=811217&h=4117b836519d6a473b55&_xt=.js" type="text/javascript"></script>';
	html += '</head>';
	html += '<body>';
	
	html += 	'<table id = "myTable">';
	html += 		'<tr id="myTRBlue">' +
						'<td id="myTDBlueData" colspan="7">SUPPLIER OVERVIEW</td>' +
						'<td id="myTDBlueData" colspan="4">PRODUCT OVERVIEW</td>' +
						'<td id="myTDBlueData" colspan="4">PRODUCT OVERVIEW</td>' +
						'<td id="myTDBlueData" colspan="13">GENERAL CONTACT INFORMATION</td>' +
						'<td id="myTDBlueData" colspan="14">ACCOUNT TERMS & STATUS</td>' +
						'<td id="myTDBlueData" colspan="5">PURCHASING</td>' +
						'<td id="myTDBlueData" colspan="8">SHIPPING</td>' +
					'</tr>';

	html += 		'<tr id="myTRBlue">' +
						'<td id="myTDBlueData">Internal ID</td>' +
						'<td id="myTDBlueData">Date Created</td>' +
						'<td id="myTDBlueData">Last Modified</td>' +
						'<td id="myTDBlueData">Name</td>' +
						'<td id="myTDBlueData">Company Type</td>' +
						'<td id="myTDBlueData">Supplier Type</td>' +
						'<td id="myTDBlueData">Supplier Notes</td>' +
						'<td id="myTDBlueData">Main Store Departments</td>' +
						'<td id="myTDBlueData">Products Description</td>' +
						'<td id="myTDBlueData">Product Comments</td>' +
						'<td id="myTDBlueData">Number of Products (SKUs) Active in Store</td>' +
						'<td id="myTDBlueData">Owner: Name, Phone, Email</td>' +
						'<td id="myTDBlueData">Account Rep: Name, Phone, Email, Address</td>' +
						'<td id="myTDBlueData">Credit and AR: Name, Phone and Email</td>' +
						'<td id="myTDBlueData">Primary Contact</td>' +
						'<td id="myTDBlueData">Phone</td>' +
						'<td id="myTDBlueData">Email</td>' +
						'<td id="myTDBlueData">Fax</td>' +
						'<td id="myTDBlueData">Office Phone</td>' +
						'<td id="myTDBlueData">Billing Address</td>' +
						'<td id="myTDBlueData">FedEx Address or Physical Address</td>' +
						'<td id="myTDBlueData">Web Address</td>' +
						'<td id="myTDBlueData">Comments</td>' +
						'<td id="myTDBlueData">Dated History</td>' +
						'<td id="myTDBlueData">Account</td>' +
						'<td id="myTDBlueData">Customer Account Number</td>' +
						'<td id="myTDBlueData">Date Created</td>' +
						'<td id="myTDBlueData">Last Modified</td>' +
						'<td id="myTDBlueData">Terms</td>' +
						'<td id="myTDBlueData">Credit Limit</td>' +
						'<td id="myTDBlueData">Balance</td>' +
						'<td id="myTDBlueData">Credit Available</td>' +
						'<td id="myTDBlueData">Date of Last Purchase</td>' +
						'<td id="myTDBlueData">Total Purchase History in Dollars</td>' +
						'<td id="myTDBlueData">Number of Active SKUs from this Supplier</td>' +
						'<td id="myTDBlueData">Minimum Order Information</td>' +
						'<td id="myTDBlueData">Discount % Minimum</td>' +
						'<td id="myTDBlueData">Discount % Maximum (or only discount)</td>' +
						'<td id="myTDBlueData">Discount Notes</td>' +
						'<td id="myTDBlueData">Login Access</td>' +
						'<td id="myTDBlueData">Login Link and User Name</td>' +
						'<td id="myTDBlueData">CSR and Orders: Name, Phone, Email</td>' +
						'<td id="myTDBlueData">Purchasing Methods Available</td>' +
						'<td id="myTDBlueData">Payment Method Available</td>' +
						'<td id="myTDBlueData">Drop-Ship Available?</td>' +
						'<td id="myTDBlueData">Drop-ship Fee</td>' +
						'<td id="myTDBlueData">Shipping Paid by Supplier? *</td>' +
						'<td id="myTDBlueData">Warehouse State and Zip</td>' +
						'<td id="myTDBlueData">Miles from REKO</td>' +
						'<td id="myTDBlueData">Suppliers Shipping / Freight Method(s) or Carriers</td>' +
						'<td id="myTDBlueData">Standard Fulfillment Time</td>' +
						'<td id="myTDBlueData">Standard Shipping Time</td>' +
						'<td id="myTDBlueData">Tracking Information</td>' +
					'</tr>';
	
	for(var x = 0; x < allResults.length; x++){
		
		var result = allResults[x];
		
		var url = nlapiResolveURL('record', 'vendor', result.getValue('internalid'));
		
		html += 	'<tr id="myTRWhite">' +
						'<td id="myTDWhiteData"><a href="' + url + '" target="_blank">' + result.getValue('internalid') + '</a></td>' + // Internal ID
						'<td id="myTDWhiteData">' + result.getValue('datecreated') + '</td>' + // Date Created
						'<td id="myTDWhiteData">' + result.getValue('lastmodifieddate') + '</td>' + //Last Modified
						'<td id="myTDWhiteData">' + result.getValue('legalname') + '</td>' + //Name
						'<td id="myTDWhiteData">' + result.getValue('custentity5') + '</td>' + //Company Type
						'<td id="myTDWhiteData">' + result.getValue('custentity6') + '</td>' + //Supplier Type
						'<td id="myTDWhiteData">' + result.getValue('custentity7') + '</td>' + //Supplier Notes
						'<td id="myTDWhiteData">' + result.getValue('custentity8') + '</td>' + //Main Store Departments
						'<td id="myTDWhiteData">' + result.getValue('custentity9') + '</td>' + //Products Description
						'<td id="myTDWhiteData">' + result.getValue('custentity10') + '</td>'; //Product Comments
		try{
			
			html += '<td id="myTDWhiteData">' + w["skuInStore" + result.getValue('internalid')].sku + '</td>'; //Number of Products (SKUs) Active in Store

		}catch(err){
			
			html += '<td id="myTDWhiteData">-</td>'; //Number of Products (SKUs) Active in Store

		}
		
		html +=			'<td id="myTDWhiteData">' + result.getValue('custentity11') + '</td>' + //Owner: Name, Phone, Email
						'<td id="myTDWhiteData">' + result.getValue('custentity12') + '</td>' + //Account Rep: Name, Phone, Email, Address
						'<td id="myTDWhiteData">' + result.getValue('custentity13') + '</td>' + //Credit and AR: Name, Phone and Email
						'<td id="myTDWhiteData">' + result.getValue('custentity14') + '</td>' + //Primary Contact
						'<td id="myTDWhiteData">' + result.getValue('homephone') + '</td>' + //Phone
						'<td id="myTDWhiteData">' + result.getValue('email') + '</td>' + //Email
						'<td id="myTDWhiteData">' + result.getValue('fax') + '</td>' + //Fax
						'<td id="myTDWhiteData">' + result.getValue('phone') + '</td>' + //Office Phone
						'<td id="myTDWhiteData">' + result.getValue('custentity16') + '</td>' + //Billing Address
						'<td id="myTDWhiteData">' + result.getValue('custentity17') + '</td>' + //FedEx Address or Physical Address
						'<td id="myTDWhiteData">' + result.getValue('url') + '</td>' + //Web Address
						'<td id="myTDWhiteData">' + result.getValue('comments') + '</td>' + //Comments
						'<td id="myTDWhiteData">' + result.getValue('custentity_comments2') + '</td>' + //Dated History
						'<td id="myTDWhiteData">' + result.getValue('accountnumber') + '</td>' + //Account
						'<td id="myTDWhiteData">' + result.getValue('custentity24') + '</td>' + //Customer Account Number
						'<td id="myTDWhiteData">' + result.getValue('datecreated') + '</td>' + //Date Created
						'<td id="myTDWhiteData">' + result.getValue('lastmodifieddate') + '</td>' + //Last Modified
						'<td id="myTDWhiteData">' + result.getValue('terms') + '</td>' + //Terms
						'<td id="myTDWhiteData">' + result.getValue('creditlimit') + '</td>' + //Credit Limit
						'<td id="myTDWhiteData">' + result.getValue('balance') + '</td>'; //Balance
		
		var creditavail = Number(result.getValue('creditlimit')) - Number(result.getValue('balance'));
		
		html +=			'<td id="myTDWhiteData">' + creditavail + '</td>'; //Credit Available
						
		try{
			
			html += '<td id="myTDWhiteData">' + w["vendor" + result.getValue('internalid')].date + '</td>'; //Date of Last Purchase

		}catch(err){
			
			html += '<td id="myTDWhiteData">-</td>'; //Date of Last Purchase

		}
		
		try{
			
			html += '<td id="myTDWhiteData">' + w["vendor" + result.getValue('internalid')].amount + '</td>'; //Total Purchase History in Dollars

		}catch(err){
			
			html += '<td id="myTDWhiteData">-</td>'; //Total Purchase History in Dollars

		}
		try{
			
			html += '<td id="myTDWhiteData">' + w["skuAll" + result.getValue('internalid')].sku + '</td>'; //Number of Active SKUs from this Supplier

		}catch(err){
			
			html += '<td id="myTDWhiteData">-</td>'; //Number of Active SKUs from this Supplier

		}						
		
		html +=			'<td id="myTDWhiteData">' + result.getValue('custentity19') + '</td>' + //Minimum Order Information
						'<td id="myTDWhiteData">' + result.getValue('custentity20') + '</td>' + //Discount % Minimum
						'<td id="myTDWhiteData">' + result.getValue('custentity21') + '</td>' + //Discount % Maximum (or only discount)
						'<td id="myTDWhiteData">' + result.getValue('custentity22') + '</td>' + //Discount Notes
						'<td id="myTDWhiteData">' + result.getValue('giveaccess') + '</td>' + //Login Access
						'<td id="myTDWhiteData">-</td>' + //Login Link and User Name
						'<td id="myTDWhiteData">-</td>' + //CSR and Orders: Name, Phone, Email
						'<td id="myTDWhiteData">-</td>' + //Purchasing Methods Available
						'<td id="myTDWhiteData">-</td>' + //Payment Method Available
						'<td id="myTDWhiteData">-</td>' + //Drop-Ship Available?
						'<td id="myTDWhiteData">-</td>' + //Drop-ship Fee
						'<td id="myTDWhiteData">-</td>' + //Shipping Paid by Supplier? *
						'<td id="myTDWhiteData">-</td>' + //Warehouse State and Zip
						'<td id="myTDWhiteData">-</td>' + //Miles from REKO
						'<td id="myTDWhiteData">-</td>' + //Suppliers Shipping / Freight Method(s) or Carriers
						'<td id="myTDWhiteData">-</td>' + //Standard Fulfillment Time
						'<td id="myTDWhiteData">-</td>' + //Standard Shipping Time
						'<td id="myTDWhiteData">-</td>' + //Tracking Information

					'</tr>';
	}
				

	html += 	'</table>';
	html +=	'</body>' +
	'</html>';
	
	/*
    //create file
    var xlsFile = nlapiCreateFile('Vendor Report.xls', 'EXCEL', nlapiEncrypt(xmlString, 'base64'));

    xlsFile.setFolder(374373);
    //save file 
    var fileID = nlapiSubmitFile(xlsFile);
	*/
	
	var form2 = nlapiCreateForm('Vendor Report Report');
	var myInlineHtml = form2.addField('custpage_btn', 'inlinehtml');
	myInlineHtml.setDefaultValue(html);
	
	response.writePage(form2);
}
function function2() 
{

	
}
/*-------------------------------------------------------------------------------------------------
	Function: print()
	Purpose:  Execution logs
-------------------------------------------------------------------------------------------------*/
function print(name, value)
{	
	var context        = nlapiGetContext();
	var usageRemaining = context.getRemainingUsage();
	nlapiLogExecution ('DEBUG', name + ' | ' + usageRemaining, value);
}
