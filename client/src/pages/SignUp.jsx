import { useState } from "react";
import { Button, OAuth } from "../components/index.js";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        console.log(data.message);
        setError(data.message);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError("Something went wrong!")
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="font-semibold text-center text-3xl my-7 ">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <Button disabled={loading} type="submit" bgColor="bg-slate-700">
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
