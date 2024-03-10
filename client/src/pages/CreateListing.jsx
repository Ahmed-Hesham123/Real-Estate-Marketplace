import { Button } from "../components/index";

const CreateListing = () => {
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
              className="border-gray-300 border p-3 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              className="text-green-700 border-green-700 border p-3 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>
          <Button type="submit" bgColor="bg-slate-700">
            Create Listing
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
