<script type="text/javascript">
 
 // array of possible countries in the same order as they appear in the country selection list 
 var breedLists = new Array(2) 
 breedLists["empty"] = ["Select a Country"]; 
 breedLists["Dog"] = ["Shepherd", "Pitbull Terrier"]; 
 breedLists["Cat"] = ["Domestic Shorthair", "American Curl", "American Bobtail", "Balinese"]; 
 /* CountryChange() is called from the onchange event of a select element. 
 * param selectObj - the select object which fired the on change event. 
 */ 
 function petTypeChange(selectObj) { 
 // get the index of the selected option 
 var idx = selectObj.selectedIndex; 
 // get the value of the selected option 
 var which = selectObj.options[idx].value; 
 // use the selected option value to retrieve the list of items from the countryLists array 
 bList = breedLists[which]; 
 // get the country select element via its known id 
 var cSelect = document.getElementById("breed"); 
 // remove the current options from the country select 
 var len = cSelect.options.length; 
 while (cSelect.options.length > 0) { 
 cSelect.remove(0); 
 } 
 var newOption; 
 // create new options 
 for (var i=0; i < bList.length; i++) { 
 newOption = document.createElement("option"); 
 newOption.value = bList[i];  // assumes option string and value are the same 
 newOption.text=cList[i]; 
 // add the new option 
 try { 
 cSelect.add(newOption);  // this will fail in DOM browsers but is needed for IE 
 } 
 catch (e) { 
 cSelect.appendChild(newOption); 
 } 
 } 
 } 

</script>