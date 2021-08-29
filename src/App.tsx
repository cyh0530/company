import { useState, useEffect } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import axios from "axios";
import { parse } from "node-html-parser";
import { decode } from "html-entities";
import Category from "./Category";
import Navigation from "./components/Navigation";
import RecruitingSites from "./RecruitingSites";
import { dataURL, spreadsheetURL } from "./constants";

function App() {
  const { Content, Header } = Layout;
  const [menu, setMenu] = useState<any[]>([]);
  const [allData, setAllData] = useState<any>({});
  const [careerSites, setCareerSites] = useState<any[]>([]);

  useEffect(() => {
  }, []);

  useEffect(() => {
    const wrapper = async () => {
      const tabs = new Map();
      try {
        const res = await axios
          .get(dataURL)
          .then((res) => {
            return res.data;
          })
          .then((res) => {
            return res;
          });
        const html = parse(res);

        const viewport = html.querySelector("#sheets-viewport");
        viewport.childNodes.forEach((node: any) => {
          tabs.set(node.id, { id: node.id, key: node.id });
        });

        const sheetMenu = html.querySelector("#sheet-menu");
        tabs.forEach((value, id) => {
          const tabName = sheetMenu.querySelector(`#sheet-button-${id}`)
            .childNodes[0].innerText;
          tabs.set(id, {
            ...tabs.get(id),
            name: tabName,
          });
        });

        let allData: any = {};
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
            let rowData: any = {};
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
            const category = value.name;
            allData[category] = data;
          }
        });
        let tabList: any[] = [];
        tabs.forEach((tab) => {
          tabList.push(tab);
        });
        setMenu(tabList);
        setAllData(allData);
      } catch (err) {
        console.error(err);
      }
    };
    wrapper();
  }, []);

  return (
    <HashRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Switch>
          <Route path={["/:category", "/"]}>
            <Navigation menu={menu} />
          </Route>
        </Switch>
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
                href={spreadsheetURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              . Delay up to 5 minutes
            </p>
          </div>
          <Content style={{ padding: 10 }}>
            <div style={{ width: "95%", maxWidth: "1280px", margin: "0 auto" }}>
              <Switch>
                <Route exact path={["/", "/0"]}>
                  <RecruitingSites careerSites={careerSites} />
                </Route>
                <Route path="/:category">
                  <Category data={allData} />
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  );
}

export default App;
