import React, { useState, useCallback, useMemo } from "react";
import { Skeleton, Table, TableColumnType } from "antd";
import { useHistory } from "react-router-dom";
import Button from "../../../components/button";

import styles from "../Orders.module.scss"; 
import Tab, { ITabData } from "../../../components/tab";

interface ITableData {
  ProductName: string;
  AvailIn: string;
  mrp: string;
  SellingPrice: string;
  LoyaltyPoint: string;
  BuddyMargin: string;
  inStock: string;
  key: number;
}

const fakeColumns: TableColumnType<any>[] = [
  {
    title: "Product Name",
    dataIndex: "ProductName",
    key: "ProductName",
    sorter(a, b) {
      return 1;
    },
  },
  {
    title: "Avail. in",
    dataIndex: "AvailIn",
    key: "AvailIn",
    sorter(a, b) {
      return 1;
    },
  },
  {
    title: "MRP",
    dataIndex: "mrp",
    key: "mrp",
    sorter(a, b) {
      return 1;
    },
  },
  {
    title: "Selling Price",
    dataIndex: "SellingPrice",
    key: "SellingPrice",
    sorter(a, b) {
      return 1;
    },
  },
  {
    title: "Loyalty Point [%]",
    dataIndex: "LoyaltyPoint",
    key: "LoyaltyPoint",
  },
  {
    title: "BuddyMargin",
    dataIndex: "BuddyMargin",
    key: "BuddyMargin",
  },
  {
    title: "In Stock",
    dataIndex: "inStock",
    key: "inStock",
  },
];

const fakeData: ITableData[] = [
  {
    key: 2,
    ProductName: "Whole Wheat Atta",
    AvailIn: "5Kg",
    mrp: "250",
    SellingPrice: "220",
    LoyaltyPoint: "20",
    BuddyMargin: "25",
    inStock: "200",
  },
  {
    key: 1,
    ProductName: "ABC Wheat Atta",
    AvailIn: "54Kg",
    mrp: "250",
    SellingPrice: "400",
    LoyaltyPoint: "20",
    BuddyMargin: "14",
    inStock: "670",
  },
];

const RequestedOrders: React.FC = (props) => {
  const history = useHistory();
  const [activeTogglebarKey, setActiveToggleKey] = useState<string>("1");
  const [selectedRowKeys, setSelectedRows] = useState<number[]>([]);

  const toggleBarData = useMemo<ITabData[]>(
    () => [
      { key: "1", title: "All" },
      { key: "2", title: "Standard" },
      { key: "3", title: "Customized" },
    ],
    []
  );

  const handleToggleSelect = useCallback((val: ITabData) => {
       
    setActiveToggleKey(val.key);
  }, []);

  const handleAddItemBtnClick = useCallback(() => {
    history.push("/dashboard/inventory/addproduct");
  }, [history]);

  const handleRowSelect = useCallback( 
    (selectedRowKey) => {
      if (selectedRowKeys.includes(selectedRowKey.key)) {
        return setSelectedRows(
          selectedRowKeys.filter((e) => e !== selectedRowKey.key)
        );
      }
      setSelectedRows([...selectedRowKeys, selectedRowKey.key]);
    },
    [selectedRowKeys]
  );

  return (
    <div className={styles.content}>
      <div className={styles["tools-container"]}>
        <div className={styles["togglebar-container"]}>
          <Tab
            onSelect={handleToggleSelect}
            activeKey={activeTogglebarKey}
            items={toggleBarData}
          />
        </div>
         
      </div>
      <div style={{ marginTop: "30px" }}>
        <Table
          rowSelection={{ selectedRowKeys, onSelect: handleRowSelect }}
          columns={fakeColumns}
          dataSource={fakeData}
        />
      </div>
    </div>
  );
};

export default RequestedOrders;
