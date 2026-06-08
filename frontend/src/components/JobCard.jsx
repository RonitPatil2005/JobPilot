import "./JobCard.css";

function JobCard({
  title,
  company,
  location,
  source,
  applyLink
}) {

  const applyJob = () => {
    window.open(
      applyLink,
      "_blank"
    );
  };

  return (
    <div className="job-card">
      <h3>{title}</h3>
      <p>{company}</p>
      <p>{location}</p>
      <p className="source">Source: {source}</p>
      <button onClick={applyJob}>Apply Now</button>
    </div>
  );
}

export default JobCard;