import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { contextMenuItems, ordersGrid } from "../data/dummy";
import Header from "../components/Header";
import { ordersData } from '../extras/orders'

const Orders = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Orders" category="Inventory" />
      <GridComponent
        dataSource={ordersData}
        id="gridcomp"
        allowPaging
        allowSorting
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default Orders;
