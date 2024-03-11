import { useState } from "react";
import { Button } from "../components/index";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState();
  console.log(formData);
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },

        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="max-w-4xl mx-auto p-3">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded-lg"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            className="border p-3 rounded-lg resize-none"
            name="description"
            id="description"
            placeholder="Description"
            required
          ></textarea>
          <input
            className="border p-3 rounded-lg"
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" />
              <label className="mr-4" htmlFor="sale">
                Sell
              </label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" />
              <label className="mr-4" htmlFor="rent">
                Rent
              </label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" />
              <label className="mr-4" htmlFor="parking">
                Parking
              </label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" />
              <label className="mr-4" htmlFor="furnished">
                Furnished
              </label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" />
              <label className="mr-4" htmlFor="offer">
                Offer
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <label htmlFor="bedrooms">Beds</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <label htmlFor="bathrooms">Baths</label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="regularPrice"
              min="1"
              max="10"
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
            <label
              className="flex flex-col items-center"
              htmlFor="regularPrice"
            >
              Regular Price <span className="text-xs">($ / Month)</span>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="discountPrice"
              min="1"
              max="10"
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
            <label
              className="flex flex-col items-center"
              htmlFor="discountPrice"
            >
              Discounted Price <span className="text-xs">($ / Month)</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="border-gray-300 border p-3 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              disabled={uploading}
              className="text-green-700 border-green-700 border p-3 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <Button type="submit" bgColor="bg-slate-700">
            Create Listing
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
