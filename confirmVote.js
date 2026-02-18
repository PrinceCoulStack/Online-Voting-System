// confirmVote.js
// Handles vote confirmation and ensures one vote per user

document.addEventListener('DOMContentLoaded', function() {
    const voterIdInput = document.getElementById('voterId');
    const confirmBtn = document.getElementById('confirmVoteBtn');
    const errorMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg');

    // Check if user already voted
    const voted = localStorage.getItem('voted');
    if (voted) {
        // if (successMsg) successMsg.innerText = 'You have already voted.';
        if (confirmBtn) confirmBtn.disabled = true;
        window.location.href = 'userDashboard.html';
        return;
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const voterId = voterIdInput ? voterIdInput.value.trim() : '';
            if (!voterId) {
                if (errorMsg) errorMsg.innerText = 'Please enter your Voter ID.';
                return;
            }

            // Check if voterId matches any in voterIDs array from localStorage
            let voterIDs = [];
            try {
                voterIDs = JSON.parse(localStorage.getItem('voterIDs')) || [];
            } catch (e) { voterIDs = []; }

            if (!Array.isArray(voterIDs) || voterIDs.length === 0) {
                if (errorMsg) errorMsg.innerText = 'No registered voter found. Please register first.';
                return;
            }

            // Accept both string and number match
            const found = voterIDs.some(id => id.toString() === voterId);
            if (found) {
                // Save vote (simulate, in real app send to server)
                const selectedCandidate = localStorage.getItem('selectedCandidate');
                localStorage.setItem('voted', 'true');
                localStorage.setItem('votedCandidate', selectedCandidate);
                if (successMsg) successMsg.innerText = 'Successful vote for candidate!';
                if (errorMsg) errorMsg.innerText = '';
                confirmBtn.disabled = true;
                // Optionally redirect to a thank you or summary page
                // window.location.href = 'thankYou.html';
                window.location.href = 'userDashboard.html';
            } else {
                if (errorMsg) errorMsg.innerText = 'Voter ID incorrect. Enter the ID in your voter card.';
                if (successMsg) successMsg.innerText = '';
            }
        });
    }
});

 // --- Dynamically show the selected candidate ---
        document.addEventListener('DOMContentLoaded', function() {
            //button
            // const confirmbtn = document.getElementById("confirmVoteBtn");
            // const resetbtn = document.getElementById("resetbtn");
            // const voterIdInput = document.getElementById("voterId");
            // Candidate summary container
            const candidateSummary = document.getElementById('candidateSummary');
            // Get selected candidate id
            const selectedId = localStorage.getItem('selectedCandidate');
            // Get candidateMap from localStorage (contains all candidates, including new ones)
            //selectedVoterId
            // const selectedVoterId = localStorage.getItem('voterIDs');
            let candidateMap = {};
            try {
                candidateMap = JSON.parse(localStorage.getItem('candidateMap')) || {};
            } catch (e) { candidateMap = {}; }
            // Find candidate by id
            const cand = candidateMap[selectedId];
            if (selectedId && cand) {
                candidateSummary.innerHTML = `
                    <div class="candidate" style="margin:1rem auto;max-width:350px;">
                        <div class="left">
                            <img src="${cand.photo || cand.img || 'Images/paaPix.png'}" alt="${cand.name}" class="candidate-photo" style="height:60px;width:60px;" />
                        </div>
                        <div class="details">
                            <label>Full Name</label>
                            <h3>${cand.name}</h3>
                            <label>Party</label>
                            <p>${cand.party}</p>
                        </div>
                    </div>
                `;
                /*// check if voterID exists
                confirmbtn.disabled = false;
                if(voterIdInput.value === ""){
                    confirmbtn.disabled = true;
                    if(voterIdInput.value === selectedVoterId.id)
                }
                /*if(selectedVoterId){
                    confirmbtn.disable = false;

                }*/
            } else {
                candidateSummary.innerHTML = '<p style="color:red;">No candidate selected. Please go back and select a candidate.</p>';
                document.getElementById('confirmForm').style.display = 'none';
            }
        });
