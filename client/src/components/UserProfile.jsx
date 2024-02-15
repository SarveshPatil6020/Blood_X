import React, { useState } from "react";

function UserProfile() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const uploadFile = async () => {
    if (imageUpload === null) {
      alert("Please select a file.");
      return;
    }

    console.log(imageUpload);

    const formData = new FormData();
    formData.append("file", imageUpload);

    try {
      const response = await fetch("http://localhost:8081/api/users/signup", {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json"
        //   },
        body: formData,
      });

      if (response.status === 200) {
        alert("File uploaded successfully!");
        setImageUpload(null); // Clear the selected file
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  const handleFileChange = (event) => {
    setImageUpload(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload Image</button>
      {imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`Image ${index}`} />
      ))}
    </div>
  );
}

export default UserProfile;
