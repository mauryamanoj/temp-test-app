document.addEventListener('DOMContentLoaded', () => {
    let entries = [];
    let isEditing = false;
    let editIndex = null;

    // Element Selectors
    const userForm = document.getElementById('userForm');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const listWrapper = document.getElementById('entries-list-wrapper');
    
    // Input Selectors
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const roleInput = document.getElementById('role');

    // Handle Submit (Save/Update)
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const entry = {
            name: nameInput.value,
            email: emailInput.value,
            role: roleInput.value
        };

        if (isEditing) {
            entries[editIndex] = entry;
            resetForm();
        } else {
            entries.push(entry);
            userForm.reset();
        }

        renderList();
    });

    // Handle Cancel
    cancelBtn.addEventListener('click', resetForm);

    function renderList() {
        console.log(window.parent);
        console.log("window.parent.location.origin--"+document.referrer);
        if (entries.length === 0) {
            listWrapper.innerHTML = '<p style="color: #888;">No entries found. Add one on the left!</p>';
            return;
        }

        const list = document.createElement('ul');
        entries.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <small style="color: #666;">${item.role} | ${item.email}</small>
                </div>
                <button class="btn-edit" data-index="${index}">Edit</button>
            `;
            list.appendChild(li);
        });

        listWrapper.innerHTML = '';
        listWrapper.appendChild(list);

        // Add listeners to edit buttons
        list.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                setupEdit(idx);
            });
        });
    }

    function setupEdit(index) {
        isEditing = true;
        editIndex = index;
        const data = entries[index];

        // Update UI for Edit Mode
        formTitle.innerText = '📝 Edit User';
        submitBtn.innerText = 'Update Entry';
        cancelBtn.style.display = 'inline-block';

        // Fill inputs
        nameInput.value = data.name;
        emailInput.value = data.email;
        roleInput.value = data.role;
    }

    function resetForm() {
        isEditing = false;
        editIndex = null;
        formTitle.innerText = '➕ Add User';
        submitBtn.innerText = 'Save Entry';
        cancelBtn.style.display = 'none';
        userForm.reset();
    }

});


