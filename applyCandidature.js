const cardID = document.getElementById('cardID');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
// const partyName = document.getElementById('partyName');
// const partyColor = document.getElementById('partyColor');
// const partySymbol = document.getElementById('partySymbol');
const passportPicture = document.getElementById('passportPicture');
const duesRecords = document.getElementById('duesRecords');
const feeReceipt = document.getElementById('feeReceipt');
// const passportPicture = document.getElementById("passportPicture");
// const secreataryName = document.getElementById('secreataryName');
// const secreataryEmail = document.getElementById('secreataryEmail');
// const secrataryPhoneNumber = document.getElementById('secrataryPhoneNumber');
// const chairmanName = document.getElementById('chairmanName');
// const chairmanEmail = document.getElementById('chairmanEmail');
// const chairmanPhoneNumber = document.getElementById('chairmanPhoneNumber');
const submitbtn = document.getElementById('submitbtn');
const resetbtn = document.getElementById('resetbtn');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');

//Get Current Date
const currentRegistration = new Date();
const dateOfRegistration = currentRegistration.getDate();

// Regular Expressions for Validation
const alphaRegEx100 = '^[a-zA-Z]{2,100}$'; //Only Alphabet min 2 max-lenght = 100
const alphaRegEx150 = '^[a-zA-Z]{2,150}$'; //Only Alphabet min 2 max-lenght = 150
const emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'; //Email must contain @ and .
const phoneRegEx = '^[+][0-9]{12}$'; // only number and lenght = 12
const fileRegEx = '([^\\s]+(\\.(?i)(jpg|jpeg|png|gif|bmp))$)'; // only image file
const numberRegEx = '^[0-9]{8,13}$'; // only number and lenght = 11
const colorRegEx = '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'; // only hex color code
const partyNameRegEx = "^[a-zA-Z0-9 .'-]{2,100}$"; // allows letters, numbers, spaces, dot, apostrophe, hyphen

// Retrieve userDetails from local storage
let userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};

// Event Listener for Submit Button

// if (submitbtn) {

if (submitbtn) {
	submitbtn.addEventListener('click', (e) => {
		e.preventDefault();
		// Validate Card ID
		if (!cardID.value.trim().match(numberRegEx)) {
			errorMsg.style.color = 'red';
			errorMsg.innerText =
				'Invalid Card ID. Only numbers allowed, length 8-13.';
			successMsg.innerText = '';
			cardID.focus();
			return;
		}
		// Validate First Name
		if (!firstName.value.trim().match(alphaRegEx100)) {
			errorMsg.style.color = 'red';
			errorMsg.innerText =
				'Invalid First Name. Only alphabets allowed, min 2, max 100.';
			successMsg.innerText = '';
			firstName.focus();
			return;
		}
		// Validate Last Name
		if (!lastName.value.trim().match(alphaRegEx100)) {
			errorMsg.style.color = 'red';
			errorMsg.innerText =
				'Invalid Last Name. Only alphabets allowed, min 2, max 100.';
			successMsg.innerText = '';
			lastName.focus();
			return;
		}
		// Validate Passport Picture
		if (!(passportPicture.files && passportPicture.files.length > 0)) {
			errorMsg.style.color = 'red';
			errorMsg.innerText =
				'Please select a Passport Picture image file (jpg, jpeg, png, gif, bmp).';
			successMsg.innerText = '';
			passportPicture.focus();
			return;
		}
		const passportFile = passportPicture.files[0];
		if (!passportFile.type.startsWith('image/')) {
			errorMsg.style.color = 'red';
			errorMsg.innerText =
				'Invalid Passport Picture. Please select a valid image file.';
			successMsg.innerText = '';
			passportPicture.focus();
			return;
		}
		// Validate Dues Records
		if (!(duesRecords.files && duesRecords.files.length > 0)) {
			errorMsg.style.color = 'red';
			errorMsg.innerText =
				'Please select a Dues Records image file (jpg, jpeg, png, gif, bmp).';
			successMsg.innerText = '';
			duesRecords.focus();
			return;
		}
		const duesFile = duesRecords.files[0];
		if (!duesFile.type.startsWith('image/')) {
			errorMsg.style.color = 'red';
			errorMsg.innerText =
				'Invalid Dues Records. Please select a valid image file.';
			successMsg.innerText = '';
			duesRecords.focus();
			return;
		}
		// Validate Fee Receipt
		if (!(feeReceipt.files && feeReceipt.files.length > 0)) {
			errorMsg.style.color = 'red';
			errorMsg.innerText =
				'Please select a Fee Receipt image file (jpg, jpeg, png, gif, bmp).';
			successMsg.innerText = '';
			feeReceipt.focus();
			return;
		}
		const feeFile = feeReceipt.files[0];
		if (!feeFile.type.startsWith('image/')) {
			errorMsg.style.color = 'red';
			errorMsg.innerText =
				'Invalid Fee Receipt. Please select a valid image file.';
			successMsg.innerText = '';
			feeReceipt.focus();
			return;
		}
		// Read all images as Base64 and store
		const readerPassport = new FileReader();
		const readerDues = new FileReader();
		const readerFee = new FileReader();
		let imagesLoaded = 0;
		let candidatureDetails = {
			cardID: cardID.value.trim(),
			firstName: firstName.value.trim(),
			lastName: lastName.value.trim(),
			dateOfRegistration: dateOfRegistration,
		};
		readerPassport.onload = function (e1) {
			candidatureDetails.passportPicture = e1.target.result;
			imagesLoaded++;
			if (imagesLoaded === 3) finalizeSubmission();
		};
		readerDues.onload = function (e2) {
			candidatureDetails.duesRecords = e2.target.result;
			imagesLoaded++;
			if (imagesLoaded === 3) finalizeSubmission();
		};
		readerFee.onload = function (e3) {
			candidatureDetails.feeReceipt = e3.target.result;
			imagesLoaded++;
			if (imagesLoaded === 3) finalizeSubmission();
		};
		readerPassport.readAsDataURL(passportFile);
		readerDues.readAsDataURL(duesFile);
		readerFee.readAsDataURL(feeFile);
		function finalizeSubmission() {
			successMsg.style.color = 'green';
			successMsg.innerText =
				'Candidature Application Submitted Successfully! Redirecting for Verification...';
			errorMsg.innerText = '';
			localStorage.setItem(
				'candidatureDetails',
				JSON.stringify(candidatureDetails)
			);
			setTimeout(() => {
				window.location.href = 'candidatureVerification.html';
			}, 1500);
			// Clear the form
			cardID.value = '';
			firstName.value = '';
			lastName.value = '';
			passportPicture.value = '';
			duesRecords.value = '';
			feeReceipt.value = '';
		}
	});
}
if (resetbtn) {
	resetbtn.addEventListener('click', (e) => {
		e.preventDefault();
		window.location.href = 'userDashboard.html';
	});
}
