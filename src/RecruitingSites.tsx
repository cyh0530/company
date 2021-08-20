interface IProps {
  careerSites: {Name: string, URL: string}[];
}
const RecruitingSites = ({careerSites}: IProps) => {
  // const careerSites = [
  //   {
  //     name: "LinkedIn",
  //     url: "https://www.linkedin.com/jobs/",
  //   },
  //   {
  //     name: "Indeed",
  //     url: "https://www.indeed.jobs/available-jobs/",
  //   },
  //   {
  //     name: "Glassdoor",
  //     url: "https://www.glassdoor.com/member/home/index.htm",
  //   },
  //   { name: "Monster", url: "https://www.monster.com/jobs/" },
  //   {
  //     name: "Handshake",
  //     url: "https://joinhandshake.com/",
  //   },
  //   { name: "Canvas", url: "https://www.canvas.com/app/discover/jobs" },
  // ];
  return (
    <div>
      <ul style={{ fontSize: 18 }}>
        {careerSites.map((site, index) => (
          <li key={index} style={{ paddingBottom: 16 }}>
            <a href={site.URL} rel="noopener noreferrer" target="_blank">
              {site.Name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecruitingSites;
