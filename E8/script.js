document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');
    const checkboxes = document.querySelectorAll('input[name="events"]');
    const errorMessage = document.getElementById('error-message');
    const maxSelections = 3;

    // Client-side limit validation
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedCount = document.querySelectorAll('input[name="events"]:checked').length;
            
            if (checkedCount > maxSelections) {
                checkbox.checked = false;
                errorMessage.textContent = `You can select a maximum of ${maxSelections} events.`;
                setTimeout(() => { errorMessage.textContent = ''; }, 3000);
            } else {
                errorMessage.textContent = '';
            }
        });
    });

    // Form submission to server
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const regNumber = document.getElementById('regNumber').value;
        const fullName = document.getElementById('fullName').value;
        const selectedEvents = Array.from(document.querySelectorAll('input[name="events"]:checked'))
                                    .map(cb => cb.value);

        if (selectedEvents.length === 0) {
            errorMessage.textContent = 'Please select at least one event.';
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ regNumber, fullName, events: selectedEvents })
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                form.reset();
            } else {
                errorMessage.textContent = result.message;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            errorMessage.textContent = 'Server is not running. Please start the server.';
        }
    });
});
