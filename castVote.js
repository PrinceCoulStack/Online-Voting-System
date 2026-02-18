
document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.candidate input[type="checkbox"]');
  const voteBtn = document.getElementById('voteBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  // Only allow one checkbox at a time
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        checkboxes.forEach(cb => {
          if (cb !== this) cb.checked = false;
        });
      }
    });
  });

  // Prevent voting more than once
  if (localStorage.getItem('voted')) {
    if (voteBtn) voteBtn.disabled = true;
    alert('You have already voted.');
    return;
  }

  // Handle vote button
  if (voteBtn) {
    voteBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const selected = Array.from(checkboxes).find(cb => cb.checked);
      if (!selected) {
        alert('Please select a candidate before voting.');
        return;
      }
      localStorage.setItem('selectedCandidate', selected.value);
      window.location.href = 'confirmVote.html';
    });
  }

  // Handle cancel button
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function(e) {
      e.preventDefault();
      checkboxes.forEach(cb => cb.checked = false);
      window.location.href = 'userDashboard.html';
    });
  }
});

