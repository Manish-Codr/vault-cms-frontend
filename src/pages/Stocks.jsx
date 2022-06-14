import React, { useEffect, useState } from "react";
import { customersGrid } from "../data/dummy";
import Header from "../components/Header";
import axios from 'axios'
import { Table } from 'antd'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  Toolbar,
  Search,
  Filter,
  Edit,
} from '@syncfusion/ej2-react-grids'
import Popup from '../components/Popup'
import { useStateContext } from "../contexts/ContextProvider";
const Stocks = () => {
  const { currentColor } = useStateContext()
  const bgColor = currentColor
  const [stockGridData, getStockGridData] = useState('')
  const [updateStockData, setUpdateStockData] = useState('')
  const [popup, setPopup] = useState(false)
  const [brandNumber, setBrandNumber] = useState('')
  const [brandNumberFind, setBrandNumberFind] = useState('')
  useEffect(() => {
    getStocks()
  }, [])
  const updateStocks = async () => {
    const updateData = updateStockData();
    await axios({
      url: 'http://localhost:8080/api/save',
      method: 'POST',
      data: updateData
    })
      .then(() => {
        console.log('Data has been sent')
      })
      .cathc((error) => {
        console.log('Internal Server Error')
        console.log(error)
      })
  }
  const getStocks = async () => {
    await axios.get('http://localhost:8080/api/get')
      .then((response) => {
        const data = response.data
        getStockGridData(data)
      })
      .catch(error => console.error(`Error: ${error}`))
  }
  const findReqStock = async (e) => {
    e.preventDefault()
    const data = { 'brandNumber': brandNumber }
    try {
      let response = await axios.post(
        "http://localhost:8080/api/find",
        data
      )
      const resData = response.data
      setBrandNumberFind(resData)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Stocks" category="Stocks" />
      <div style={{ display: 'flex', padding: 10 }}>
        <button onClick={() => setPopup(true)} className="w-51 hover:drop-shadow-xl h-11 border-1 p-2 rounded-lg"
          style={{ backgroundColor: bgColor, marginLeft: 'auto', color: 'white' }}>
          <span>
            Update Stocks
          </span>
        </button>
      </div>
      <GridComponent
        dataSource={stockGridData}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Sort, Toolbar, Search, Filter, Edit]} />
      </GridComponent>
      <Popup setTrigger={setPopup} trigger={popup}>
        <div style={{ flexDirection: 'row' }}>
          <input
            type='text'
            value={brandNumber}
            onChange={e => setBrandNumber(e.target.value)}
            style={{ width: '20%', borderWidth: 2, padding: 10 }}
            placeholder='Enter The Brand Number'
            maxLength={6}
            name='brandNumber'
          />
          <button onClick={findReqStock}
            type="button" className="hover:drop-shadow-xl"
            style={{ borderWidth: 2, padding: 10, marginLeft: 10, color: 'light-gray' }}
          >
            Find Product
          </button>
          <p
            style={{ color: 'black', marginTop: 10 }}
            className='w-16 border'
          >
          </p>
        </div>
      </Popup>
    </div>
  );
};

export default Stocks;
