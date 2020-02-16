//Variables
var rice = false;
var veggie = false;
var soup = false;
var meat = false;
var canteen = "";
var store = "";
var maxRice = 0;
var maxVegetable = 0;
var maxSoup = 0;
var maxMeat = 0;

//Organization Page
becomeOrganizerPage = function () {
    //Page Effects
    hideAllPages();
    document.getElementById("buttonOrganization").style.backgroundColor = "rgb(0, 255, 0)";
    //Display available locations eg.NTU
    document.getElementById("maintext").innerHTML = "Choose Location: <br>" +
        "<div class='selectLocation' id='locationNTU' onclick='displayLocation(\"NTU\")'><u>NTU</u></div>" +
        "Will be updated soon...<br><br>";
}

//Display the location of the selected Campus
displayLocation = function (location) {
    document.getElementById("subtext1").innerHTML = "";
    switch (location) {
        //NTU Selected
        case "NTU":
            //North Spine
            displayCanteens("NorthSpine", "North S​​pine Food Court<br>Stalls: 3<br>Seating capacity: 838<br>");
            //South Spine
            displayCanteens("SouthSpine", "South Spine Food Court<br>Stalls: 2<br>Seating capacity: 830<br>");

            break;
        default:
            document.getElementById("subtext1").innerHTML = "There is no food court here!!";
            break;

    }
}

//Display Canteens in boxes
displayCanteens = function (name, txt) {
    //Note that name refers store name and txt is the store's flavor text
    document.getElementById("subtext1").innerHTML += "<div class='store'><div class='storeImg'>" +
        "<img src='img/" + name + ".jpg' alt='" + name + "' onclick=\"displayStores('" + name + "')\"></div>" + txt + "</div>";
}

//Display Stores in boxes
displayStores = function (canteenName) {
    //Save Selected Canteen Name
    canteen = canteenName;
    //Check boxes for Halal, Veg and Allergies
    document.getElementById("subtext1").innerHTML =
        "<form>" +
        "<input type='checkbox' id='halalCheck' name='Halal'>" +
        "<label for='halalCheck'> Halal</label> " +
        "<input type='checkbox' id='vegCheck' name='Vegetarian'>" +
        "<label for='vegCheck'> Vegetarian</label> " +
        "<input type='checkbox' id='allergyCheck' name='Allergies'>" +
        "<label for='allergyCheck'> Allergies</label> " +
        "<input type='submit' value='Search'></form>";

    var noOfStores = 0; //Number of stores in a canteen

    //Check which Canteen it is
    switch (canteen) {
        //Display Stores in North Spine
        case "NorthSpine":
            noOfStores = 3;
            displayIndividualStore("ChickenRice");
            displayIndividualStore("MixedVegetableRice");
            displayIndividualStore("Vegetarian");
            break;
        //By Default display South Spine
        default:
            noOfStores = 2;
            displayIndividualStore("DuckRice");
            displayIndividualStore("NasiBriyani");
            break;
    }
}

//Display each store in boxes
displayIndividualStore = function (stallName) {
    //Default txt
    var txt = "<div id='storeDescription" + stallName + "'>No Description</div>" +
        "Food Type: <div id='foodType" + stallName + "'>None</div>" +
        "Availability: <div id='foodAvailability" + stallName + "'>Yes</div>";
    document.getElementById("subtext1").innerHTML += "<div class='store'><div class='storeImg'>" +
        "<img src='img/" + stallName + ".jpg' alt='Stall Img' width='290' height='200' onclick=\"displayFood('" + stallName + "')\"></div>" + txt + "</div>";
    //Check stallName and print accordingly
    switch (stallName) {
        case "ChickenRice":
            document.getElementById("storeDescription" + stallName).innerHTML = "Chicken Rice";
            document.getElementById("foodType" + stallName).innerHTML = "Halal";
            document.getElementById("foodAvailability" + stallName).innerHTML = "Yes";
            break;
        case "MixedVegetableRice":
            document.getElementById("storeDescription" + stallName).innerHTML = "Mixed Vegetable Rice";
            document.getElementById("foodType" + stallName).innerHTML = "Non-Halal";
            document.getElementById("foodAvailability" + stallName).innerHTML = "Yes";
            break;
        case "Vegetarian":
            document.getElementById("storeDescription" + stallName).innerHTML = "Vegetarian";
            document.getElementById("foodType" + stallName).innerHTML = "Vegetarian";
            document.getElementById("foodAvailability" + stallName).innerHTML = "Yes";
            break;
        case "DuckRice":
            document.getElementById("storeDescription" + stallName).innerHTML = "Duck Rice";
            document.getElementById("foodType" + stallName).innerHTML = "Non-Halal";
            document.getElementById("foodAvailability" + stallName).innerHTML = "Yes";
            break;
        case "NasiBriyani":
            document.getElementById("storeDescription" + stallName).innerHTML = "Nasi Briyani";
            document.getElementById("foodType" + stallName).innerHTML = "Halal";
            document.getElementById("foodAvailability" + stallName).innerHTML = "Yes";
            break;
    }
}

//Display Food available in each store
displayFood = function (stallName) {
    //save the visited store
    store = stallName;
    document.getElementById("subtext1").innerHTML = "";
    //Display Food Store Name
    document.getElementById("maintext").innerHTML = store + "<br>";
    console.log('canteen/' + canteen + '/' + store);
    firebase.database().ref('canteen/' + canteen + '/' + store).once('value').then(function (snapshot) {
        //descriptionData= snapshot.val().description;
        meatData = snapshot.val().meat;
        console.log(meatData);
        riceData = snapshot.val().rice;
        soupData = snapshot.val().soup;
        vegetableData = snapshot.val().vegetable;
        timeToCollect = snapshot.val().timeToCollect;

        //Display Left Over Food Available in check boxes
        document.getElementById("subtext1").innerHTML = "Expected Food Left: <br>";
        document.getElementById("subtext1").innerHTML +=
            //Display Rice

            "<input type='checkbox' id='riceCheck' name='Rice'>" +
            "Rice <br>Estimated Amount: <label id = 'rice1' for='riceCheck'>" + riceData + "</label> kg<br><br>" +
            //Display Vegetables
            "<input type='checkbox' id='vegCheck' name='Vegetables'>" +
            "Vegetables <br>Estimated Amount:<label id = 'vege1' for='vegeCheck'>" + vegetableData + "</label> kg<br><br>" +
            //Display Meat
            "<input type='checkbox' id='meatCheck' name='Meat'>" +
            "Meat <br>Estimated Amount:<label id = 'meat1' for='meatCheck'>" + meatData + "</label> kg<br><br>" +
            //Display Soup
            "<input type='checkbox' id='soupCheck' name='Soup'>" +
            "Soup <br>Estimated Amount: <label id = 'soup1' for='soupCheck'>" + soupData + "</label> kg<br><br>" +
            //The ones that are checked will be available for input later
            "<input type='submit' value='Search' onclick='organizationVerificationPage()'>";

        maxRice = document.getElementById("rice1").innerText;
        maxVegetable = document.getElementById("vege1").innerHTML;
        maxMeat = document.getElementById("meat1").innerHTML;
        maxSoup = document.getElementById("soup1").innerHTML;
        console.log([maxRice,maxVegetable,maxMeat,maxSoup]);


    });
    
}

organizationVerificationPage = function () {
    //Initialization
    //Check which variables are checked
    rice = document.getElementById("riceCheck").checked;
    veggie = document.getElementById("vegCheck").checked;
    meat = document.getElementById("meatCheck").checked;
    soup = document.getElementById("soupCheck").checked;

    //Display Checkout
    document.getElementById("subtext1").innerHTML = "<form action='/action_page.php'>";
    //Display organization input box and verification Passcode
    document.getElementById("subtext1").innerHTML += "<b>Organization:</b> <input type='text' id='organizationName' value='Anson and Friends'></input><br>" +
        "<b>Verification Passcode:</b> <input type='text' id='verifyCode' value='Black Lightning is back'></input><br>";
    //Display food selected
    if (rice)
        document.getElementById("subtext1").innerHTML += "<b>Rice:</b> <input type='text' id='rice'></input>/"+maxRice+"kg<br>";
    if (veggie)
        document.getElementById("subtext1").innerHTML += "<b>Vegetables:</b> <input type='text' id='veg'></input>/"+maxVegetable+"kg<br>";
    if (meat)
        document.getElementById("subtext1").innerHTML += "<b>Meat:</b> <input type='text' id='meat'></input>/"+maxMeat+"kg<br>";
    if (soup)
        document.getElementById("subtext1").innerHTML += "<b>Soup:</b> <input type='text' id='soup'></input>/"+maxSoup+"kg<br>";
    //Display Time to collect and remarks
    document.getElementById("subtext1").innerHTML += "<b>Collection Time:</b> <input type='text' id='collectionTime' value='Input time to collect'></input><br>" +
        "<b>Remarks:</b> <input type='text' id='remarks' value='Input remarks'></input><br>";
    document.getElementById("subtext1").innerHTML += "<input type='submit' value='Next' onclick='checkCorrectAmount()' '></form>";
}

//Check if Success
checkCorrectAmount = function(){
    document.getElementById("subtext2").innerHTML = "";
    //Convert Strings of Max Values to Float
    maxMeat = parseFloat(maxMeat);
    maxVegetable = parseFloat(maxVegetable);
    maxRice = parseFloat(maxRice);
    maxSoup = parseFloat(maxSoup);
    //Check Rice
    if(rice){
        var riceInput = document.getElementById("rice").value;
        if (riceInput<0) {
            document.getElementById("subtext2").innerHTML = "INVALID RICE INPUT!<br>";
            return;
        }
        else if(riceInput>maxRice){
            document.getElementById("subtext2").innerHTML = "RICE INPUT EXCEEDED MAX RICE!<br>";
            return;
        }
    }
    
    if(veggie){
        var vegInput = document.getElementById("veg").value;
        if (vegInput<0) {
            document.getElementById("subtext2").innerHTML = "INVALID VEG INPUT!<br>";
            return;
        }
        else if(vegInput>maxVegetable){
            document.getElementById("subtext2").innerHTML = "VEG INPUT EXCEEDED MAX VEG!<br>";
            return;
        }
    }

    if(soup){
        var soupInput = document.getElementById("soup").value;
        if (soupInput<0) {
            document.getElementById("subtext2").innerHTML = "INVALID SOUP INPUT!<br>";
            return;
        }
        else if(soupInput>maxSoup){
            document.getElementById("subtext2").innerHTML = "SOUP INPUT EXCEEDED MAX SOUP!<br>";
            return;
        }
    }

    if(meat){
        var meatInput = document.getElementById("meat").value;
        if (meatInput<0) {
            document.getElementById("subtext2").innerHTML = "INVALID MEAT INPUT!<br>";
            return;
        }
        else if(meatInput>maxMeat){
            document.getElementById("subtext2").innerHTML = "MEAT INPUT EXCEEDED MAX MEATs!<br>";
            return;
        }
    }

    //For Debug Purposes
    /*console.log("Input values: "+ [riceInput,vegInput,meatInput,soupInput]);
    console.log("Max values: "+ [maxRice,maxVegetable,maxMeat,maxSoup]);*/

    //Success
    subtractFromDatabase();
    viewConfirmPage();

}

subtractFromDatabase = function(){
    //Get float value of Inputs
    if (rice)
        var newRice = maxRice - parseFloat(document.getElementById("rice").value);
    if (veggie)
        var newVeg = maxVegetable - parseFloat(document.getElementById("veg").value);
    if (soup)
        var newSoup = maxSoup - parseFloat(document.getElementById("soup").value);
    if (veggie)
        var newMeat = maxMeat - parseFloat(document.getElementById("meat").value);
}

//Display confirmation page
viewConfirmPage = function () {
    //Remember Organization Name
    var organizationName = document.getElementById("organizationName").value;
    //Create list of food submitted
    var foodOrdered = "";
    if (rice)
        foodOrdered += "<b>Rice:</b> " + document.getElementById("rice").value + " kg<br>";
    if (veggie)
        foodOrdered += "<b>Vegetables:</b> " + document.getElementById("veg").value + " kg<br>";
    if (meat)
        foodOrdered += "<b>Meat:</b> " + document.getElementById("meat").value + " kg<br>";
    if (soup)
        foodOrdered += "<b>Soup:</b> " + document.getElementById("soup").value + " kg<br>";

    //Print Confirmations Page
    document.getElementById("subtext1").innerHTML = "";
    document.getElementById("maintext").innerHTML = "<div class = 'centralizeText'>" +
        "<h1><u><b>Confirmation Page</u></b></h1>" +
        "Successfully ordered!<br>" +
        "ref# " + Math.random() * 100000 + "<br>" +
        "Organization: " + organizationName + "<br>" +
        "Food Ordered: <br>" + foodOrdered +
        "At " + canteen + ", " + store + "<br>" +
        "<h1>THANK YOU!</h1>";


}
