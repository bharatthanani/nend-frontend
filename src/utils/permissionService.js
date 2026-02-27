export async function fetchPermissions() {
  const res = await fetch('http://localhost:3000/api/permissions', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const data = await res.json();

  if (data.success) {
    // Save globally
    localStorage.setItem('permissions', JSON.stringify(data.permissions));
    console.log("Fetched permissions:", data.permissions);
  }else{
    console.log("working");
  }
}