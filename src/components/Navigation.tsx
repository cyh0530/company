import { Layout, Menu } from "antd";
import { Link, useParams } from "react-router-dom";

const { Sider } = Layout;

interface IProps {
  menu: any[];
}
const Navigation = ({ menu }: IProps) => {
  const { category } = useParams<{ category: string }>();

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <Menu selectedKeys={[category || "Career Sites"]} defaultSelectedKeys={["Career Sites"]} theme="light">
        {menu.map((tab) => (
          <Menu.Item key={tab.name}>
            <Link to={tab.name !== "Career Sites" ? tab.name : "/"}>
              {tab.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Navigation;
