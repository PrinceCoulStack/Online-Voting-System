// Checking Details Page (only run if on details page)
const firstNameDisplay = document.getElementById('firstNameDisplay');
if (firstNameDisplay) {
	const lastNameDisplay = document.getElementById('lastNameDisplay');
	const emailDisplay = document.getElementById('emailDisplay');
	const userGenderDisplay = document.getElementById('userGenderDisplay');
	const dateOfBirthDisplay = document.getElementById('dateOfBirthDisplay');
	const phoneNumberDisplay = document.getElementById('phoneNumberDisplay');
	// const homeTownDisplay = document.getElementById('homeTownDisplay');
	const regionRegistrationDisplay = document.getElementById('regionRegistrationDisplay');
	const districtRegistrationDisplay = document.getElementById('districtRegistrationDisplay');
	const constituencyDisplay = document.getElementById('constituencyDisplay');
	// const disabilityStatusDisplay = document.getElementById('disabilityStatusDisplay');
	const GPSAddressDisplay = document.getElementById('GPSAddressDisplay');
	const successMsg = document.getElementById('successMsg');
	const errorMsg = document.getElementById('errorMsg');
    const resetbtn = document.getElementById('resetbtn');
    const submitbtn = document.getElementById('submitbtn');

	userDetails = JSON.parse(localStorage.getItem('userDetails'));
	if (userDetails) {
		firstNameDisplay.innerText = userDetails.firstName;
		lastNameDisplay.innerText = userDetails.lastName;
		emailDisplay.innerText = userDetails.email;
		userGenderDisplay.innerText = userDetails.userGender;
		dateOfBirthDisplay.innerText = userDetails.age + ' Years';
		phoneNumberDisplay.innerText = userDetails.phoneNumber;
		// homeTownDisplay.innerText = userDetails.homeTown;
		regionRegistrationDisplay.innerText = userDetails.regionRegistration;
		districtRegistrationDisplay.innerText = userDetails.districtRegistration;
		constituencyDisplay.innerText = userDetails.constituency;
		// disabilityStatusDisplay.innerText = userDetails.disabilityStatus;
		GPSAddressDisplay.innerText = userDetails.GPSAddress;
		if (successMsg) successMsg.innerText = 'Success: User Data Found...';
	// } else {
		// if (errorMsg) errorMsg.innerText = 'Error: No User Data Found...';
	}
}

//Reset and Submit Button Event Listeners
    if(resetbtn){
        resetbtn.addEventListener('click',()=>{
            localStorage.removeItem('userDetails');
            window.location.href = 'register.html';
        })
    }
    if(submitbtn){
        submitbtn.addEventListener('click',()=>{
            //Submit btn Event
            successMsg.innerText = 'Success: Details Submitted, Voter\'s Card Loading...';
            setTimeout(() => {
                // window.location.href = 'voterID.html';
				
				//Redirect to the Voter Page
				window.location.href = 'voterID.html';
            }, 1500);
        })
    }


