import {
  useState
} from "react";

import {
  uploadResume
} from "../services/resumeService";

function ResumeAnalyzer() {

  const [file,
    setFile] =
    useState(null);

  const [skills,
    setSkills] =
    useState([]);

  const [roles,
    setRoles] =
    useState([]);

  const handleUpload =
    async () => {

      if (!file) return;

      const data =
        await uploadResume(
          file
        );

      setSkills(
        data.skills
      );

      setRoles(
        data.roles
      );
    };

  return (
    <div
      style={{
        padding: "40px"
      }}
    >

      <h2>
        Resume Analyzer
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={
          handleUpload
        }
      >
        Analyze Resume
      </button>

      <h3>
        Extracted Skills
      </h3>

      <ul>
        {skills.map(
          (skill, index) => (
            <li key={index}>
              {skill}
            </li>
          )
        )}
      </ul>

      <h3>
        Recommended Roles
      </h3>

      <ul>
        {roles.map(
          (role, index) => (
            <li key={index}>
              {role}
            </li>
          )
        )}
      </ul>

    </div>
  );
}

export default ResumeAnalyzer;