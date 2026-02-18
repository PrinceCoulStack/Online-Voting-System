const cardID = document.getElementById('cardId');
const picture = document.getElementById('picture');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
// const userGender = document.getElementsByClassName('userGender');
const male = document.getElementById('male');
const female = document.getElementById('female');
const email = document.getElementById('email');
const dateOfBirth = document.getElementById('dateOfBirth');
const phoneNumber = document.getElementById('phoneNumber');
const homeTown = document.getElementById('homeTown');
const regionRegistration = document.getElementById('regionRegistration');
const constituency = document.getElementById('constituency');
const districtRegistration = document.getElementById('districtRegistration');
// const disabilityStatus = document.getElementById('disabilityStatus');
// const GPSAddress = document.getElementById('GPSAddress');
// const userPassWord = document.getElementById('userPassWord');
// const confirmUserPassWord = document.getElementById('confirmUserPassWord');
const registerForm = document.getElementById('registerForm');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');

let userDetails = {};

//Get Current Date
const currentRegistration = new Date();
const dateOfRegistration = currentRegistration.getDate();

const continueBtn = document.getElementById('continue');

const alphaRegEx = '^[a-zA-Z0-9]{2,100}$'; //Only Alphabet min 2 max-lenght = 100
const numrbRegEx = '^[0-9]{11}$'; // only number and lenght = 10
const emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'; //Email must contain @ and .
const regExNum = '^[0-9]{10}$'; //Only number and lenght = 10
const regExPass = '^[a-zA-Z0-9]{6,}$'; // Password must be at least 6 characters  long
const regExCardID = '^\\d{11}$'; //Card ID must be 11 digits
const regExPicture = '([^\\s]+(\\.(?i)(jpg|jpeg|png|gif|bmp))$)'; //Picture must be an image file
// Date format DD/MM/YYYY
const dateRegEx ='^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d$';

//Event Listener for continue button

// ...existing code...

if (continueBtn) {
    continueBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Validating the form
        if (firstName && firstName.value.trim().match(alphaRegEx)) {
            if (lastName && lastName.value.trim().match(alphaRegEx)) {
                if (email && email.value.trim().match(emailRegEx)) {
                    if (dateOfBirth && dateOfBirth.value.trim()) {
                        // Calculate Age
                        const birthDate = new Date(dateOfBirth.value);
                        let age = currentRegistration.getFullYear() - birthDate.getFullYear();
                        if (age >= 18) {
                            if (phoneNumber && phoneNumber.value.trim().match(regExNum)) {
                                // if (homeTown && homeTown.value.trim().match(alphaRegEx)) {
                                    if (regionRegistration && regionRegistration.value.trim().match(alphaRegEx)) {
                                        if (districtRegistration &&	districtRegistration.value.trim().match(alphaRegEx)	) {
                                            if (constituency &&	constituency.value.trim().match(alphaRegEx)	) {
                                                // Uncomment below to enable disabilityStatus validation
                                                /*
                                                if (disabilityStatus && disabilityStatus.value.trim().match(alphaRegEx)) {
                                                    // Uncomment below to enable GPSAddress validation*/
                                                    if (GPSAddress && GPSAddress.value.trim()) {
                                                 /*       // Uncomment below to enable gender validation
                                                        // if ((male && male.checked) || (female && female.checked)) {
                                                            // Uncomment below to enable password validation
                                                            // if (userPassWord && userPassWord.value.trim().match(regExPass)) {
                                                                // Uncomment below to enable confirm password validation
                                                                // if (confirmUserPassWord && confirmUserPassWord.value.trim() === userPassWord.value.trim()) {
                                                */
                                                                    if (cardID && cardID.value.trim().match(regExCardID)) {
                                                                        if ( picture && picture.files && picture.files.length > 0) {
                                                                            const file = picture.files[0];
                                                                            if (!file.type.startsWith('image/')) {
                                                                                errorMsg.innerText = 'Error: Please select a valid image file for the picture (jpg, jpeg, png, gif, bmp).';
                                                                                picture.focus();
                                                                                return;
                                                                            }
                                                                            // Read the image as Base64 and save in userDetails
                                                                            const reader = new FileReader();
                                                                            reader.onload = function (e) {
                                                                                userDetails = {
                                                                                    cardID: cardID.value.trim(),
                                                                                    firstName: firstName.value.trim(),
                                                                                    lastName: lastName.value.trim(),
                                                                                    email: email.value.trim(),
                                                                                    dateOfBirth: dateOfBirth.value.trim(),
                                                                                    age: age,
                                                                                    userGender:
                                                                                        male && male.checked ? 'Male'
                                                                                        : female && female.checked ? 'Female' : '',
                                                                                    phoneNumber: phoneNumber.value.trim(),
                                                                                    // homeTown: homeTown.value.trim(),
                                                                                    regionRegistration: regionRegistration.value.trim(),
                                                                                    districtRegistration: districtRegistration.value.trim(),
                                                                                    constituency: constituency.value.trim(),
                                                                                    // disabilityStatus: disabilityStatus.value.trim(),
                                                                                    GPSAddress: GPSAddress.value.trim(),
                                                                                    // userPassWord: userPassWord.value.trim(),
                                                                                    dateOfRegistration: dateOfRegistration,
                                                                                    picture: e.target.result, // Base64 image
                                                                                };
                                                                                localStorage.setItem( 'userDetails', JSON.stringify(userDetails));
                                                                                successMsg.innerText = 'Success: Correct Data, Redirecting to the Verification page...';
                                                                                errorMsg.innerText = "";
                                                                                // Redirect to candidatureVerification.html after 2 seconds
                                                                                setTimeout(() => {
                                                                                    window.location.href = 'checkDetail.html';
                                                                                }, 1500);
                                                                                // Clear the form
                                                                                cardID.value = "";
                                                                                firstName.value = "";
                                                                                lastName.value = "";
                                                                                email.value = "";
                                                                                dateOfBirth.value = "";
                                                                                phoneNumber.value = "";
                                                                                homeTown.value = "";
                                                                                regionRegistration.value = "";
                                                                                districtRegistration.value = "";
                                                                                constituency.value = "";
                                                                                // disabilityStatus.value = "";
                                                                                GPSAddress.value = "";
                                                                                // userPassWord.value = "";
                                                                                // confirmUserPassWord.value = "";
                                                                            };
                                                                            reader.readAsDataURL(file);
                                                                            // Do not proceed further until FileReader is done
                                                                            return;
                                                                        } else {
                                                                            errorMsg.innerText = 'Error: Please select a valid image file for the picture (jpg, jpeg, png, gif, bmp).';
                                                                            picture.focus();
                                                                            return;
                                                                        }
                                                                    } else {
                                                                        errorMsg.innerText = 'Error: Card ID must be exactly 11 digits.';
                                                                        cardID.focus();
                                                                        return;
                                                                    }
                                                /*
                                                                } else {
                                                                    errorMsg.innerText = 'Error: Password Mismatch...';
                                                                    confirmUserPassWord && confirmUserPassWord.focus();
                                                                    return;
                                                                }
                                                            } else {
                                                                errorMsg.innerText = 'Error: Password must be at least 6 characters long...';
                                                                userPassWord && userPassWord.focus();
                                                                return;
                                                            }
                                                        } else {
                                                            errorMsg.innerText = 'Error: Please select the gender...';
                                                            male && !male.checked &&
                                                            female && !female.checked &&
                                                            male.focus();
                                                            return;
                                                        }*/
                                                    } else {
                                                    	errorMsg.innerText = 'Error: Please enter your GPS Address...';
                                                    	GPSAddress && GPSAddress.focus();
                                                    	return;
                                                    }
                                                /*} else {
                                                    errorMsg.innerText = 'Error: Please enter your Disability Status...';
                                                    disabilityStatus && disabilityStatus.focus();
                                                    return;
                                                }
                                                */
                                            } else {
                                                errorMsg.innerText = 'Error: Please enter your Constituency...';
                                                constituency && constituency.focus();
                                                return;
                                            }
                                        } else {
                                            errorMsg.innerText = 'Error: Please enter your District of Registration...';
                                            districtRegistration && districtRegistration.focus();
                                            return;
                                        }
                                    } else {
                                        errorMsg.innerText = 'Error: Please enter your Region of Registration...';
                                        regionRegistration && regionRegistration.focus();
                                        return;
                                    }
                                // } else {
                                //     errorMsg.innerText = 'Error: Please enter your Home Town...';
                                //     return;
                                // }
                            } else {
                                errorMsg.innerText = 'Error: Phone Number must be 10 digits...';
                                phoneNumber && phoneNumber.focus();
                                return;
                            }
                        } else {
                            errorMsg.innerText = 'Error: Age must be 18 years and above...';
                            dateOfBirth && dateOfBirth.focus();
                            return;
                        }
                    } else {
                        errorMsg.innerText = 'Error: Please enter your Date of Birth...';
                        dateOfBirth && dateOfBirth.focus();
                        return;
                    }
                } else {
                    errorMsg.innerText = 'Error: Please enter a valid Email...';
                    email && email.focus();
                    return;
                }
            } else {
                errorMsg.innerText = 'Error: Please enter your Last Name...';
                lastName && lastName.focus();
                return;
            }
        } else {
            errorMsg.innerText = 'Error: Please enter your First Name...';
            firstName && firstName.focus();
            return;
        }
    });
}

//End of Event Listener for continue button
// ...existing code...