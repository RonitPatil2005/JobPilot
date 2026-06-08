import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { searchJobs } from "../services/jobService";
import "./SearchBar.css";

 function SearchBar({ setJobs }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to search jobs.");
      return;
    }

    try {
      setLoading(true);

      const data = await searchJobs(
        keyword,
        location
      );

      setJobs(data);

      setTimeout(() => {
        const section =
          document.querySelector(
            ".jobs-section"
          );

        if (section) {
          section.scrollIntoView({
            behavior: "smooth"
          });
        }
      }, 300);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to fetch jobs"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-box">

      <div className="search-input-group">
        <FaSearch className="search-input-icon" />

        <input
          type="text"
          placeholder="Job Role...."
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleSearch()
          }
        />
      </div>

      <div className="divider"></div>

      <div className="search-input-group">
        <FaMapMarkerAlt className="search-input-icon" />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleSearch()
          }
        />
      </div>

      <button
        className="search-btn"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading
          ? "Searching..."
          : "Search Jobs"}
      </button>

    </div>
  );
}

export default SearchBar;