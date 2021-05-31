$(document).ready(function(){
	//Open Database
	var request = indexedDB.open('customermanager',1);
	
	request.onupgradeneeded = function(e){
		var db = e.target.result;
		
		if(!db.objectStoreNames.contains('customers')){
			var os = db.createObjectStore('customers',{keyPath: "id", autoIncrement:true});
			//Create Index for Name
			os.createIndex('name','name',{unique:false});
		}
	}
	
	//Success
	request.onsuccess = function(e){
		console.log('Success: Opened Database...');
		db = e.target.result;
		//Show Customers
		showCustomersInDrop();
	}
	
	//Error
	request.onerror = function(e){
		console.log('Error: Could Not Open Database...');
	}
});

function calculatePrice(productID) {
  var x = document.getElementById(productID).value;
  if(productID == 'IPhone'){
	document.getElementById("IPhonePrice").innerHTML = x;
  } else if(productID == 'bear'){
	document.getElementById("bearPrice").innerHTML = x;
  } else if(productID == 'mouse'){
	document.getElementById("mousePrice").innerHTML = x;
  } else if(productID == 'jordan'){
	document.getElementById("jordanPrice").innerHTML = x;
  }
  
  totalPriceCalculator();
  
}

function totalPriceCalculator() {
	 var x = parseFloat(document.getElementById("IPhonePrice").innerHTML)+parseFloat(document.getElementById("bearPrice").innerHTML)+parseFloat(document.getElementById("mousePrice").innerHTML)+parseFloat(document.getElementById("jordanPrice").innerHTML);
	 document.getElementById("priceTotal").innerHTML = "$"+(x).toFixed(2);
 }
 
 function showCustomersInDrop(e){
	var transaction = db.transaction(["customers"],"readonly");
	//Ask for ObjectStore
	var store = transaction.objectStore("customers");
	var index = store.index('name');
	
	var output = '';
	index.openCursor().onsuccess = function(e){
		var cursor = e.target.result;
		if(cursor){
			output += "<option id='customer_"+cursor.value.id+"'>";
			output += "<optionclass='cursor customer' data-field='name' data-id='"+cursor.value.id+"'>"+cursor.value.name+" "+cursor.value.email+"</option>";
			cursor.continue();
		}
		$('#customers').html(output);
	}
}

function invoice(){

  var win = window.open("", "Invoice");
  win.document.body.innerHTML = "<h4>Client data</h4>";

  win.document.body.innerHTML += "<p>" + key + ": " + cursor.value.name + "</p>";
  win.document.body
  win.document.body.innerHTML += "<h4>Bought items</h4>";


  clearForm();
}
function dataCustomer(){
	var x = document.getElementById("customers").value;
    document.getElementById("demo").innerHTML = x;
}