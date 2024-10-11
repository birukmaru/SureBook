import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  // Handle adding photos via link
  async function addPhotoByLink(ev) {
    ev.preventDefault();

    if (!photoLink) return;

    try {
      console.log("clicked 1");

      const response = await axios.post(
        "http://localhost:4000/api/upload-by-link",
        {
          link: photoLink,
        }
      );
      console.log(response);

      const { url } = response.data;
      onChange((prev) => [...prev, url]); // Add the new URL to the existing photos
      setPhotoLink(""); // Clear input
    } catch (error) {
      console.error(
        "Error uploading image by link:",
        error.response ? error.response.data : error.message
      );
    }
  }

  // Handle file uploads
  async function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/upload",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { data: urls } = response; // Adjusted to get the correct response data
      onChange((prev) => [...prev, ...urls]); // Add all the uploaded files to the existing photos
    } catch (error) {
      console.error(
        "File upload failed:",
        error.response ? error.response.data : error.message
      );
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          type="text"
          placeholder="Add using a link..."
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 px-4 rounded-2xl"
        >
          Add photo
        </button>
      </div>
      <div className="mt-2">
        <input type="file" multiple onChange={uploadPhoto} />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <div key={index} className="h-32 flex">
              <img
                className="rounded-2xl w-full object-cover"
                src={link}
                alt="uploaded"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
