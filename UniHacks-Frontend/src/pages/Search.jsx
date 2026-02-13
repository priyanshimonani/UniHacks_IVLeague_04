import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/offices");
        const data = await res.json();
        setOffices(data);
      } catch (err) {
        console.error("Error fetching offices:", err);
      }
    };

    fetchOffices();
  }, []);

  const filteredOffices = offices.filter((office) =>
    office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    office.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h1 className="title1">Find Your Office</h1>
      <p style={styles.subtitle}>
        Search for banks, hospitals, colleges and government offices
      </p>

      {/* 🔎 Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search office name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* 🏢 Office Cards */}
      <div style={styles.grid}>
        {filteredOffices.map((office) => (
          <div key={office._id} style={styles.card}>
            <h3 style={styles.officeName}>{office.name}</h3>
            <p style={styles.location}>{office.location}</p>

            <div style={styles.infoRow}>
              <span>Queue</span>
              <strong>{office.queueLength} people</strong>
            </div>

            <div style={styles.infoRow}>
              <span>Current Token</span>
              <strong>#{office.currentToken}</strong>
            </div>

            <div style={styles.infoRow}>
              <span>Estimated Wait</span>
              <strong>~{office.estimatedWaitTime} mins</strong>
            </div>

            <Link to={`/join/${office._id}`}>
              <button style={styles.joinBtn}>Join Queue</button>
            </Link>
          </div>
        ))}
      </div>

      {filteredOffices.length === 0 && (
        <p style={styles.noResult}>No offices found.</p>
      )}
    </div>
  );
};

export default Search;

const styles = {
  page: {
    minHeight: "100vh",
    padding: "60px 30px",
    backgroundColor: "#f7f8c8",
    textAlign: "center",
    fontFamily: "Dosis, sans-serif",
  },
  title: {
    fontSize: "2.8rem",
    marginBottom: "10px",
    color: "#333",
  },
  subtitle: {
    fontSize: "1.1rem",
    marginBottom: "40px",
    color: "#555",
  },
  searchContainer: {
    maxWidth: "600px",
    margin: "0 auto 50px auto",
    backgroundColor: "white",
    padding: "18px 25px",
    borderRadius: "50px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
  },
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "left",
    boxShadow: "0 12px 25px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },
  officeName: {
    fontSize: "1.3rem",
    marginBottom: "6px",
  },
  location: {
    fontSize: "0.9rem",
    marginBottom: "15px",
    color: "#666",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "0.95rem",
  },
  joinBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    borderRadius: "30px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  noResult: {
    marginTop: "40px",
    color: "#444",
    fontSize: "1.1rem",
  },
};
