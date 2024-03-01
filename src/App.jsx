import React, { useState } from 'react';

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [boxColor, setBoxColor] = useState('#FFFFFF'); // Initial color white

  const fetchRandomUser = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      const randomUserIndex = Math.floor(Math.random() * userData.users.length);
      const randomUser = userData.users[randomUserIndex];
      setUserDetails(randomUser);
      changeBoxColor();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const changeBoxColor = () => {
    const randomColor = getRandomColor();
    setBoxColor(randomColor);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className='container w-50'>
      <h1>Random User Details</h1>
      <button onClick={fetchRandomUser}>Get Random User</button>
      <div style={{ backgroundColor: boxColor, padding: '20px', marginTop: '20px' }}>
        {userDetails && (
          <div>
            <h2>User Details</h2>
            <div className='row'>
              <div className='col-lg-6'> <h3>ID: {userDetails.id}</h3>
              <h4>First Name: {userDetails.firstName}</h4></div>
              <div className='col-lg-6 align-items-center' > <h4>Last Name: {userDetails.lastName}</h4>
              <h4>Maiden Name: {userDetails.maidenName}</h4>
              <h4>Age: {userDetails.age}</h4>
              <h4>phone: {userDetails.phone}</h4>
              <h4>phone: {userDetails.address.address}</h4>
                        <h4>city: {userDetails.address.city}</h4>

              </div>
             
             
              {userDetails.image && <img  style={{height:'30%',width:'30%'}} src={userDetails.image} alt="User" />} {/* Display user image if available */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
