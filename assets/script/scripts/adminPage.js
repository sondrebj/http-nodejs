// this is the code for showing all the users in the database on the admin page
// and to make them display inside the table
window.addEventListener('load', async () => {
  try {
    const response = await fetch('http://localhost:3200/all', {
      method: "GET"
    });
    const allUsers = await response.json();
    const tbody = document.querySelector("#admin-user-list");
    allUsers.forEach(user => {
      const tr = document.createElement('tr');
      const emailTd = document.createElement('td');
      emailTd.textContent = user.email;
      const roleTd = document.createElement('td');
      roleTd.textContent = user.role;
      const makerTd = document.createElement('td');
      const makerButton = document.createElement("button");
      makerButton.innerHTML = "Make this user a maker"
      makerButton.addEventListener('click', async() => {
        try {
          const updateUser = await fetch(`http://localhost:3200/all/${user._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: 'maker' })
          });
          const updatedUser = await updateUser.json();
          roleTd.textContent = updatedUser.role;
        } catch (error) {
          console.log(error.message);
        }
      });
      makerTd.append(makerButton);
      const adminTd = document.createElement('td');
      const adminButton = document.createElement("button");
      adminButton.innerHTML = 'Make this user an admin';
      adminButton.addEventListener('click', async () => {
        try {
          const updateUser = await fetch(`http://localhost:3200/all/${user._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: 'admin' })
          });
          const updatedUser = await updateUser.json();
          roleTd.textContent = updatedUser.role;
        } catch (error) {
          console.log(error.message);
        }
      });
      adminTd.append(adminButton);
      const deleteTd = document.createElement('td');
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = 'Delete account';
      deleteButton.addEventListener('click', async () => {
        const confirmMessage = window.confirm("Are you sure you want to delete this user?");
        if (confirmMessage) {
          try {
            const response = await fetch(`http://localhost:3200/delete/${user._id}`, {
              method: 'DELETE'
            });
            if (response.ok) {
              tr.remove();
            } else {
              throw new Error('Failed to delete user');
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      });
      
      
      deleteTd.append(deleteButton);
      tr.append(emailTd, roleTd, makerTd, adminTd, deleteTd);
      tbody.append(tr);
    });
  } catch (error) {
    console.log(error.message);
  }
});


// this is the code for showing the recent bookings in the database on the admin page
// and to make them display inside the table
window.addEventListener('load', async () => {
  try {
    const response = await fetch('http://localhost:3200/booking/getBooking', {
      method: 'GET'
    });
    const allBookings = await response.json();

    // sort the bookings in an descneding order
    allBookings.sort((a, b) => new Date(a.startBookingDate) - new Date(b.startBookingDate));
  

    // find the table body element to add rows to
    const tbody = document.querySelector('#admin-booking-list');

    allBookings.forEach(booking => {
      const tr = document.createElement('tr');

      const emailTd = document.createElement('td');
      emailTd.textContent = booking.email;

      const toolsTd = document.createElement('td');
      toolsTd.textContent = booking.toolName;

      const fromTd = document.createElement('td');
      fromTd.textContent = booking.startBookingDate;

      const toTd = document.createElement('td');
      toTd.textContent = booking.endBookingDate;

      const buttonTd = document.createElement('td')
      const deleteBooking = document.createElement('button');
      deleteBooking.textContent = 'Delete';
      deleteBooking.addEventListener('click', async () => {
        try {
          const confirmMessage = window.confirm("Are you sure you want to delete this?");
          if(confirmMessage) {
            const response = await fetch(`http://localhost:3200/booking/delete/${booking._id}`, {
              method: 'DELETE'
            });
            const result = await response.json();
            console.log(result.message);
            // remove the table row from the page
            tr.remove();
            const deleteButton = document.querySelector(`[data-booking-id="${booking._id}"]`);
            if (deleteButton) {
              const toolElement = deleteButton.closest('.tool-card');
              if (toolElement) {
                toolElement.remove(); // remove tool from webpage
                const toolId = deleteButton.dataset.toolId;
                const deleted = await deleteTool(toolId); // delete tool from database
                if (!deleted) {
                  console.log('Failed to delete tool');
                }
              }
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      });
      
      buttonTd.append(deleteBooking)

      tr.append(emailTd, toolsTd, fromTd, toTd, buttonTd);
      tbody.append(tr);
    });
  } catch (error) {
    console.log(error.message);
  }
});


