import { useState } from "react";
import { Table } from "antd";
import { useParams } from "react-router-dom";
import { jobColumns, ICompany } from "./constants";
import { useEffect } from "react";

interface IProps {
  data: any;
}

const Category = ({ data }: IProps) => {
  const { category } = useParams<{ category: string }>();
  const [dataSource, setDataSource] = useState<ICompany[]>([]);

  useEffect(() => {
    if (data[category]) {
      setDataSource(data[category]);
    } else {
      setDataSource([])
    }
  }, [category]);

  return (
    <Table
      columns={jobColumns}
      dataSource={dataSource}
      pagination={{
        total: dataSource.length,
        pageSize: dataSource.length,
        hideOnSinglePage: true,
      }}
    />
  );
};

export default Category;
