import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./app.css";
import AIUse from "./charts/AIUse";
import AIToolBar from "./charts/AIToolBar";
import AIUseLine from "./charts/AIUseLine";
import Usage from "./charts/Usage";
import Helpfulness from "./charts/Helpfulness";
import Parents from "./charts/Parents";
import School from "./charts/School";
import Filter from "./components/Filter";
import Citations from "./components/Citations";

import TopBar from "./components/TopBar";
import Particles from "./components/Particles";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRoboufYWX_ZdXrl8XEW7xhTMrGFTVw0qD61OAeD-OXzufwTaNb7HCnpkLkXBcmT6rhp65k4xaqo1sO/pub?output=tsv`;

      try {
        const response = await fetch(url);
        const text = await response.text();

        const rows = text
          .trim()
          .split("\n")
          .map((row) => row.split("\t"));
        const headers = rows[0];
        const jsonData = rows
          .slice(1)
          .map((row) =>
            Object.fromEntries(row.map((val, i) => [headers[i], val]))
          );

        console.log("✅ Sheet data:", jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("❌ Error fetching sheet data:", error);
      }
    };

    fetchData();
  }, []);

  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedEducation, setSelectedEducation] = useState("All");

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const countryMatch =
        selectedCountry === "All" ||
        row["Country of residence"]?.trim() === selectedCountry;

      const educationMatch =
        selectedEducation === "All" ||
        row["Current education level"]?.trim() === selectedEducation;

      return countryMatch && educationMatch;
    });
  }, [data, selectedCountry, selectedEducation]);

  return (
    <>
      <TopBar />
      <div className="container">
        <motion.div
          className="hero"
          style={{ position: "relative", overflow: "hidden" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Particles numParticles={48} color="#fff" style={{ zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1>Generation[AI]</h1>
            <h2>How do students use AI?</h2>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          <div className="flex">
            <div className="graph">
              <AIUseLine data={filteredData} />
              <Usage data={filteredData} />
              <AIUse data={filteredData} />
            </div>

            <Filter
              data={data}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedEducation={selectedEducation}
              setSelectedEducation={setSelectedEducation}
            />

            <div className="graph">
              <AIToolBar data={filteredData} />
              <Helpfulness data={filteredData} />
              <School data={filteredData} />
            </div>
          </div>
        </motion.div>
        {/* <div className="graph2">
          
         <Parents data={filteredData} /> 
        </div> */}

        <Citations data={filteredData} />
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeaoR4krXg8eoVKQSw8QGF5dIlgkuyq-WHbeGhjkw-OB7YpbA/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>
            <img
              src="/zap.svg"
              alt="Source icon"
              style={{
                width: 18,
                height: 18,
                marginRight: 4,
                marginBottom: 2,
              }}
            />
            Join the Research
          </button>
        </a>

        <p>Total responses: {data.length} students!</p>
      </div>
    </>
  );
}

export default App;
