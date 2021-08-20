import { ColumnsType } from "antd/es/table";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

export const dataURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vScDAvmEaLUZS4yWIvVLkDsb3vZjy_3vJvllPxtrseZx0G8gphZSngeKk-x16-vnthmoHORXj-3GApx/pubhtml";

export const spreadsheetURL =
  "https://docs.google.com/spreadsheets/d/1xnufjjVD6_CpvanNPJa36XaycK2VMFoRlLE4OdWBQq4/edit?usp=sharing";
const careerSites = [
  {
    name: "LinkedIn",
    search: "https://www.linkedin.com/jobs/search/?keywords=",
  },
  {
    name: "Indeed",
    search: "https://www.indeed.com/jobs?q=",
  },
  {
    name: "Glassdoor",
    search: "https://www.glassdoor.com/Search/results.htm?keyword=",
  },
  {
    name: "Monster",
    search: "https://www.monster.com.hk/srp/results?query=",
  },
  {
    name: "Handshake",
    search: "https://uw.joinhandshake.com/postings?query=",
  },
  {
    name: "Canvas",
    search: "https://www.canvas.com/app/discover/jobs",
  },
];

const careerSitesMenu = (company: string) => (
  <Menu>
    {careerSites.map((site, index) => (
      <Menu.Item key={index}>
        <a
          href={
            site.name !== "Canvas" ? `${site.search}${company}` : site.search
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {site.name}
        </a>
      </Menu.Item>
    ))}
  </Menu>
);

const appliedRecord = localStorage.getItem("record") || []
export interface ICompany {
  key: number;
  Company: string;
  "Official Website": string;
  "What they do": string;
  "Apply Website": string;
  "Student Apply": string;
}

export const jobColumns: ColumnsType<ICompany> = [
  {
    key: "Company",
    dataIndex: "Company",
    title: "Company",
    render: (text, record) => (
      <a
        href={record["Official Website"]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    ),
    width: 150,
    sorter: (a, b) => a.Company.localeCompare(b.Company),
    defaultSortOrder: "ascend",
  },
  // {
  //   key: "CS Affiliated",
  //   dataIndex: "CS Affiliated",
  //   title: "UW CS Affiliates",
  //   width: 150,
  // },
  {
    key: "What they do",
    dataIndex: "What they do",
    title: "What they do",
    width: 400,
  },
  {
    key: "Apply Website",
    dataIndex: "Apply Website",
    title: "Apply Website",
    render: (link) => {
      if (link) {
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Apply
          </a>
        );
      }
    },
    width: 150,
  },
  {
    key: "Internship",
    dataIndex: "Student Apply",
    title: "Internship Website",
    render: (link) => {
      if (link) {
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Internship
          </a>
        );
      }
    },
    width: 150,
  },
  {
    key: "Career Sites",
    dataIndex: "Career Sites",
    title: "Career Sites",
    render: (text, record) => {
      return (
        <Dropdown overlay={careerSitesMenu(record.Company)}>
          <Button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Career Sites <DownOutlined />
          </Button>
        </Dropdown>
      );
    },
    width: 150,
  },
  {
    key: "Apply Record",
    dataIndex: "Apply Record",
    title: "Apply Record",
    // render: (text, record) => {

    // }
  }
];
