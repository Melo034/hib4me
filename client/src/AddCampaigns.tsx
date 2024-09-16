import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Components/ui/Navbar";

const AddCampaigns = () => {
  const [formData, setFormData] = useState<{
    name: string;
    condition: string;
    description: string;
    image: File | null;
    address: string;
    goal: string;
  }>({
    name: "",
    condition: "",
    description: "",
    image: null,
    address: "",
    goal: "", 
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("condition", formData.condition); // Corrected to "condition"
    submissionData.append("description", formData.description);
    submissionData.append("address", formData.address);
    submissionData.append("goal", formData.goal);  // Corrected to "goal"
    if (formData.image) {
      submissionData.append("image", formData.image);
    }

    try {
      const response = await fetch("https://hib4me-server.onrender.com/api/donations/create", {
        method: "POST",
        body: submissionData,
      });

      console.log("Response Status:", response.status);
      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (!response.ok) {
        throw new Error(`Failed to create donation campaign: ${responseText}`);
      }


      setSuccess(true);
      setFormData({ name: "", condition: "", description: "", image: null, address: "", goal: "" });
      setPreview(null);
    } catch (error: any) {
      console.error("Error creating donation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="lg:flex-row min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/images/causes.png')` }}
    >
      <div className="relative z-10 flex justify-center pt-8">
        <Navbar />
      </div>
      <div className="mt-5 text-center py-3">
        <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white">
          Add Campaign
        </h1>
        <p className="text-[#FBC790] underline py-3">
          Fill in this form to allow users to Ib4You
        </p>
      </div>
      <main className="w-full flex flex-1 flex-col lg:flex-row justify-center mx-auto">
        <div className="relative flex-1 lg:flex items-center justify-center leading-7">
          <div className="relative z-10 w-full max-w-md">
            <div className="space-y-3 px-4 lg:px-0">
              <h3 className="text-white text-xl sm:text-2xl md:text-5xl lg:text-7xl">
                We are here to help. Tell the world your story
              </h3>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 lg:p-0">
          <div className="w-full max-w-md space-y-8 p-6 lg:p-8 bg-opacity-70 text-white rounded-xl shadow-lg">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">Campaign created successfully!</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter name"
                  className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent rounded-lg border shadow-sm"
                />
              </div>
              <div>
                <label className="font-medium">Condition</label> {/* Corrected to match the backend */}
                <input
                  type="text"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  placeholder="Enter condition"
                  className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent rounded-lg border shadow-sm"
                />
              </div>
              <div>
                <label className="font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Enter description"
                  className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent rounded-lg border shadow-sm"
                />
              </div>
              <div>
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent rounded-lg border shadow-sm"
                />
              </div>
              <div>
                <label className="font-medium">Goal</label> 
                <input
                  type="number"
                  name="goal" 
                  value={formData.goal}
                  onChange={handleChange}
                  required
                  placeholder="Enter goal amount"
                  className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent rounded-lg border shadow-sm"
                />
              </div>
              <div>
                <label className="font-medium">Image</label>
                <div className="flex mt-2 items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
                {preview && (
                  <div className="mt-3 h-24 w-24 flex justify-center ">
                    <img src={preview} alt="Preview" className="w-full object-cover rounded-lg" />
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-20 py-2 text-white font-medium border-2 border-[#9E6643] bg-transparent hover:bg-[#9E6643] hover:text-white rounded-lg shadow-md"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddCampaigns;
