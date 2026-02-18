const firstNameDisplay = document.getElementById('firstNameDisplay');
const okbtn = document.getElementById("okbtn");
const resetbtn = document.getElementById("resetbtn");
if (firstNameDisplay) {
	// const lastNameDisplay = document.getElementById("lastNameDisplay");
	const dateOfBirthDisplay = document.getElementById('dateOfBirthDisplay');
	const userVoteIDNumberDisplay = document.getElementById('userVoteIDNumberDisplay');
	// const dateOfRegistrationDisplay = document.getElementById('dateofRegistrationDisplay');
	const constituencyDisplay = document.getElementById('constituencyDisplay');
	// const regionRegistrationDisplay = document.getElementById('regionRegistrationDisplay');
	const GPSAddressDisplay = document.getElementById('GPSAddressDisplay');
	const userGenderDisplay = document.getElementById('userGenderDisplay');
	const pictureDisplay = document.getElementById('pictureDisplay');

	let userDetails = JSON.parse(localStorage.getItem('userDetails'));
	if (userDetails) {
		firstNameDisplay.innerText = userDetails.firstName + ' ' + userDetails.lastName;
			userGenderDisplay.innerText = userDetails.userGender;
			dateOfBirthDisplay.innerText = userDetails.dateOfBirth;
			// dateOfRegistrationDisplay.innerText = new Date().toLocaleDateString();
			// regionRegistrationDisplay.innerText = userDetails.regionRegistration;
			constituencyDisplay.innerText = userDetails.constituency;
			GPSAddressDisplay.innerText = userDetails.GPSAddress;
			pictureDisplay.src = userDetails.picture || 'Images/paaPix.png';
			pictureDisplay.alt = userDetails.firstName + ' ' + userDetails.lastName + ' Photo';
			// pictureDisplay.width = 150;
			// pictureDisplay.height = 150;
			// pictureDisplay.style.borderRadius = '50%';
			// pictureDisplay.style.objectFit = 'cover';
			// pictureDisplay.style.border = '2px solid #000';

			//Generate Unique Voter ID
			// Only generate a unique Voter ID if the user does not already have one
			function generateUniqueVoterID() {
				let voterIDs = JSON.parse(localStorage.getItem('voterIDs')) || [];
				let newID;
				do {
					newID = Math.floor(100000 + Math.random() * 900000);
				} while (voterIDs.includes(newID));
				voterIDs.push(newID);
				localStorage.setItem('voterIDs', JSON.stringify(voterIDs));
				return newID;
			}
			if (!userDetails.voterIDNumber) {
				userDetails.voterIDNumber = generateUniqueVoterID();
				localStorage.setItem('userDetails', JSON.stringify(userDetails));
			}
			userVoteIDNumberDisplay.innerText = userDetails.voterIDNumber;
	}
}

//button handle
resetbtn.addEventListener("click",()=>{
	localStorage.removeItem("userDetails");
	window.location = "register.html"
})

okbtn.addEventListener("click",()=>{
	successMsg.innerText = "SUCCESSFUL REGISTRATION";

	setInterval(()=>{
		window.location = "userDashboard.html";
	},1500);
})

