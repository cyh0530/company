import React, { useState, useEffect } from "react";
import { Table, Layout, Menu, message } from "antd";
import axios from "axios";
import { parse } from "node-html-parser";
import { decode } from "html-entities";
import RecruitingSites from "./RecruitingSites";

function App() {
  const { Content, Sider, Header } = Layout;
  const [menu, setMenu] = useState([]);
  const [allData, setAllData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [currentTab, setCurrentTab] = useState('0');
  const [careerSites, setCareerSites] = useState([]);

  const htmlURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vScDAvmEaLUZS4yWIvVLkDsb3vZjy_3vJvllPxtrseZx0G8gphZSngeKk-x16-vnthmoHORXj-3GApx/pubhtml";

  useEffect(() => {
    const wrapper = async () => {
      const tabs = new Map();
      try {
        const res = await axios
          .get(htmlURL)
          .then((res) => {
            return res.data;
          })
          .then((res) => {
            return res;
          });
        const html = parse(res);

        const viewport = html.querySelector("#sheets-viewport");
        viewport.childNodes.forEach((node) => {
          tabs.set(node.id, { id: node.id, key: node.id });
        });

        const sheetMenu = html.querySelector("#sheet-menu");
        let mainTabId;
        tabs.forEach((value, id) => {
          const tabName = sheetMenu.querySelector(`#sheet-button-${id}`)
            .childNodes[0].innerText;
          if (tabName === "Main") {
            mainTabId = id;
          }
          tabs.set(id, {
            ...tabs.get(id),
            name: tabName,
          });
        });

        let allData = {};
        tabs.forEach((value, id) => {
          const tableBody = viewport.querySelector(`#${id} table tbody`);
          const columnsNameRow = tableBody.childNodes[0];
          let columnsName = [];
          let data = [];
          for (let i = 0; i < columnsNameRow.childNodes.length; i++) {
            columnsName.push(columnsNameRow.childNodes[i].innerText);
          }
          for (let i = 1; i < tableBody.childNodes.length; i++) {
            const tr = tableBody.childNodes[i];
            let rowData = {};
            for (let j = 1; j < tr.childNodes.length; j++) {
              const td = tr.childNodes[j];
              const text = td.innerText;
              rowData[columnsName[j]] = decode(text);
            }
            rowData.key = i;
            data.push(rowData);
          }
          if (id === "0") {
            setCareerSites(data);
          } else {
            allData[id] = data;
          }
        });
        let tabList = [];
        tabs.forEach((tab) => {
          tabList.push(tab);
        });
        setMenu(tabList);
        setAllData(allData);
        setDataSource(allData[mainTabId]);
        // changeTab(tabs.values().next().value);
        // quietFetch(tabs);
      } catch (err) {
        console.error(err);
      }
    };
    wrapper();
  }, []);

  const changeTab = async (tab) => {
    if (tab.key === "0") {
      setCurrentTab(tab.key);
    } else if (allData[tab.key]) {
      setDataSource(allData[tab.key]);
      setCurrentTab(tab.key);
    } else {
      message.error("Sorry, there's an error occurred. Please try again later");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <Menu onClick={changeTab} defaultSelectedKeys={["0"]} theme="light">
          {menu.map((tab) => (
            <Menu.Item key={tab.id}>{tab.name}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            textAlign: "center",
            padding: 10,
            backgroundColor: "rgb(240, 242, 245)",
          }}
        >
          <h3 style={{ fontSize: 30 }}>Company List</h3>
        </Header>
        <div style={{ textAlign: "center" }}>
          <p>
            Data are extracted from{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1xnufjjVD6_CpvanNPJa36XaycK2VMFoRlLE4OdWBQq4/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            . Delay up to 5 minutes
          </p>
        </div>
        <Content style={{ padding: 10 }}>
          <div style={{ maxWidth: "75%", margin: "0 auto" }}>
            {currentTab === "0" ? (
              <RecruitingSites careerSites={careerSites} />
            ) : (
              <Table
                columns={jobColumns}
                dataSource={dataSource}
                pagination={{
                  total: dataSource.length,
                  pageSize: dataSource.length,
                  hideOnSinglePage: true,
                }}
              />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

const jobColumns = [
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

export default App;
