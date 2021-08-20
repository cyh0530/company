import { ColumnsType } from "antd/es/table";

export const dataURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vScDAvmEaLUZS4yWIvVLkDsb3vZjy_3vJvllPxtrseZx0G8gphZSngeKk-x16-vnthmoHORXj-3GApx/pubhtml";

interface Company {
  key: number;
  Company: string;
  "Official Website": string;
  "What they do": string;
  "Apply Website": string;
  "Student Apply": string;
}


export const jobColumns: ColumnsType<Company> = [
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
    key: "Student Apply",
    dataIndex: "Student Apply",
    title: "Student Apply",
    render: (link) => {
      if (link) {
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Student Apply
          </a>
        );
      }
    },
    width: 150,
  },
];