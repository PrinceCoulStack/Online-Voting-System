const cardIDDisplay = document.getElementById('cardIDDisplay');
const firsNameDisplay = document.getElementById('firsNameDisplay');
const lastNameDisplay = document.getElementById('lastNameDisplay');
// const partyNameDisplay = document.getElementById('partyNameDisplay');
// const partyColorDisplay = document.getElementById('partyColorDisplay');
// const partySymbolDisplay = document.getElementById('partySymbolDisplay');
// const secreataryNameDisplay = document.getElementById('secreataryNameDisplay');
// const secreataryEmailDisplay = document.getElementById('secreataryEmailDisplay');
// const secrataryPhoneNumberDisplay = document.getElementById('secrataryPhoneNumberDisplay');
// const chairmanNameDisplay = document.getElementById('chairmanNameDisplay');
// const chairmanEmailDisplay = document.getElementById('chairmanEmailDisplay');
// const chairmanPhoneNumberDisplay = document.getElementById('chairmanPhoneNumberDisplay');
const dateOfRegistrationDisplay = document.getElementById('dateOfRegistrationDisplay');
const submitbtn = document.getElementById('submitbtn');
const resetbtn = document.getElementById('resetbtn');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');
const CandidateIDDisplay = document.getElementById("CandidateIDDisplay");
const btn = document.getElementsByClassName("btn");

candidatureDetails = JSON.parse(localStorage.getItem('candidatureDetails'));
if (candidatureDetails) {
	cardIDDisplay.innerText = candidatureDetails.cardID;
	firsNameDisplay.innerText = candidatureDetails.firstName;
	lastNameDisplay.innerText = candidatureDetails.lastName;
	// partyNameDisplay.innerText = candidatureDetails.partyName;
	// partyColorDisplay.innerText = candidatureDetails.partyColor;
	// partySymbolDisplay.innerHTML = `<img src="${candidatureDetails.partySymbol}" alt="Party Symbol" width="100" height="100">`;
	// secreataryNameDisplay.innerText = candidatureDetails.secrataryName;
	// secreataryEmailDisplay.innerText = candidatureDetails.secrataryEmail;
	// secrataryPhoneNumberDisplay.innerText = candidatureDetails.secrataryPhoneNumber;
	// chairmanNameDisplay.innerText = candidatureDetails.chairmanName;
	// chairmanEmailDisplay.innerText = candidatureDetails.chairmanEmail;
	// chairmanPhoneNumberDisplay.innerText = candidatureDetails.chairmanPhoneNumber;
	// dateOfRegistrationDisplay.innerText = candidatureDetails.dateOfRegistration;
    if (candidatureDetails.dateOfRegistration) {
    let date = new Date(candidatureDetails.dateOfRegistration);
    if (!isNaN(date.getTime())) {
        dateOfRegistrationDisplay.innerText = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } else {
        dateOfRegistrationDisplay.innerText = candidatureDetails.dateOfRegistration;
    }
}
	if (successMsg) successMsg.innerText = 'Success: Candidate Data Found...';
}

// Event Listener for Submit Button




// const candidateIDDisplay = document.getElementById('candidateIDDisplay');
// candidateIDDisplay.textContent = 'Your Unique Candidature ID: ' + newID;

submitbtn.addEventListener('click', (e) => {
	e.preventDefault();
	successMsg.style.color = 'green';
	errorMsg.innerText = '';

	// Generate a unique candidate ID
	function generateUniqueCandidateID() {
		// Get last used candidate ID from localStorage, or start from 1000
		let lastID = localStorage.getItem("lastCandidateID");
		let newNum = 1000;
		if (lastID && /^CAND-\d+$/.test(lastID)) {
			newNum = parseInt(lastID.split('-')[1], 10) + 1;
		}
		let newID = `CAND-${newNum}`;
		// Save new last used ID
		localStorage.setItem("lastCandidateID", newID);
		return newID;
	}

	// Only generate if not already present
	if (!candidatureDetails.CandidateID) {
		candidatureDetails.CandidateID = generateUniqueCandidateID();
		localStorage.setItem("candidatureDetails", JSON.stringify(candidatureDetails));
	}
	CandidateIDDisplay.innerText = candidatureDetails.CandidateID;

	// Redirect to user dashboard after short delay
	setTimeout(() => {
		window.location.href = 'userDashboard.html';
	}, 800);
});

// Event Listener for Reset Button when click delete from the localstore
resetbtn.addEventListener('click', (e) => {
	e.preventDefault();
    localStorage.removeItem("candidatureDetails")
	window.location.href = 'applyCandidature.html';
});

// If no candidature details found, redirect to application page
if (!candidatureDetails) {
	window.location.href = 'userDashboard.html';
}
