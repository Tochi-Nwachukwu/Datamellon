import React, { useState, useEffect, useRef } from 'react'
import axios, { Axios } from 'axios'
import { Bar } from 'react-chartjs-2'

function BarChart() {

    let city = []
    let category = []
    let country = []
    let customerID = []
    let Discount = []
    let OrderDate = []
    let OrderID = []
    let PostalCode = []
    let ProductID = []
    let ProductName = []
    let Profit = []
    let Quantity = []
    let Region = []
    let RowID = []
    let Sales = []
    let Segment = []
    let ShipDate = []
    let ShipMode = []
    let State = []


    let tableData = [
        { id: 1, data: city, label: 'City' },
        { id: 2, data: category, label: 'Category' },
        { id: 3, data: country, label: 'Country' },
        { id: 4, data: customerID, label: 'Customer ID' },
        { id: 5, data: Discount, label: 'Discount' },
        { id: 6, data: OrderDate, label: 'OrderDate' },
        { id: 7, data: OrderID, label: 'OrderID' },
        { id: 8, data: PostalCode, label: 'PostalCode' },
        { id: 9, data: ProductID, label: 'ProductID' },
        { id: 10, data: ProductName, label: 'ProductName' },
        { id: 11, data: Profit, label: 'Profit' },
        { id: 12, data: Quantity, label: 'Quantity' },
        { id: 13, data: Region, label: 'Region' },
        { id: 14, data: RowID, label: 'RowID' },
        { id: 15, data: Sales, label: 'Sales' },
        { id: 16, data: Segment, label: 'Segment' },
        { id: 17, data: ShipDate, label: 'ShipDate' },
        { id: 18, data: ShipMode, label: 'ShipMode' },
        { id: 19, data: State, label: 'State' },
    ]

    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [displayData, setDisplayData] = useState([])
    const [sorted, setSorted] = useState({ data: data, done: false })
    const [progress, setProgress] = useState(0)
    const [sortby, setSortby] = useState(tableData.city)
    const [open, setOpen] = useState(false)
    const [TotalData, setTotalData] = useState(0)


    const showDropDown = () => {
        setOpen(!open)
    }
    const getSorted = (e) => {
        tableData.forEach(item => {
            if (item.id == e.target.id) {
                setSortby(item.data)
            }
        })
    }

    const Pagination = () => {
        const perPage = 10;
        const totalData = data.length;
        const noOfPages = totalData / perPage;
        setTotalData(totalData)
        setDisplayData(data.slice(0, perPage))
    }

    const filterData = (item) => {
        const results = data.filter(item => item["State"] == "Florida")
        setData2(results)
    }

    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://g54qw205uk.execute-api.eu-west-1.amazonaws.com/DEV/stub',

            data: { "angular_test": "angular-developer" },
            onDownloadProgress: (progressEvent) => {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted)
            }
        }).then((response) => {
            setData(response.data.slice(0, 20))

        })

        Pagination()
        filterData()

    }, [data])

    for (const dataObj of sorted.done ? sorted.data : data) {
        city.push(dataObj.City)
        category.push(dataObj.Category)
        country.push(dataObj.Country)
        customerID.push(dataObj["Customer ID"])
        Discount.push(parseInt(dataObj.Discount))
        OrderDate.push(dataObj["Order Date"])
        OrderID.push(dataObj["Order ID"])
        PostalCode.push(dataObj["Postal Code"])
        ProductID.push(dataObj["Product ID"])
        ProductName.push(dataObj["Product Name"])
        Profit.push(parseFloat(dataObj.Profit))
        Quantity.push(dataObj.Quantity)
        Region.push(dataObj.Region)
        RowID.push(dataObj["Row ID"])
        Sales.push(dataObj.Sales)
        Segment.push(dataObj.Segment)
        ShipDate.push(dataObj["Ship Date"])
        ShipMode.push(dataObj["Ship Mode"])
        State.push(dataObj.State)

    }

    const sortArray = () => {
        displayData.sort((a, b) => {
            return a.Profit - b.Profit;
        });

        setSorted({ data: data, done: !sorted.done })
    }

    return (
        <div>
            <div>loading:{progress}  <div style={{ height: '20px', width: '100px' }}><div style={{ width: `${progress}%`, backgroundColor: 'blue', height: '100%' }}></div></div></div>
            <button onClick={sortArray}>sort array</button>
            <div >
                <button onClick={showDropDown}>Sort by</button>
                {open && <ul>
                    {tableData.map((item) => (<li id={item.id} onClick={getSorted}>{item.label}</li>))}
                </ul>}
            </div>

            <Bar
                data={{
                    labels: sortby,

                    datasets: [{
                        label: 'city',
                        data: tableData[14].data,
                        backgroundColor: ['red'],
                        borderWidth: 4
                    }]
                }}
                height={400}
                width={600}
                options={{ maintainAspectRatio: true }}
                animation={false}
                responsive={true}
            />


            <div>{TotalData}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr, 1fr, 1fr, 1fr, 1fr' }}>
                {data2.map((item) => (
                    <div style={{ display: 'flex' }} >
                        <div style={{ margin: '16px' }}>{item.City}</div>
                        <div style={{ margin: '16px' }}>{item.Category}</div>
                        <div style={{ margin: '16px' }}>{item["Customer ID"]}</div>
                        <div style={{ margin: '16px' }}>{item["Order Date"]}</div>
                        <div style={{ margin: '16px' }}>{item["Order ID"]}</div>
                        <div style={{ margin: '16px' }}>{item["Product Name"]}</div>
                        <div style={{ margin: '16px' }}>{item["Profit"]}</div>
                        <div style={{ margin: '16px' }}>{item["Quantity"]}</div>
                        <div style={{ margin: '16px' }}>{item["Sales"]}</div>

                    </div>

                ))}

            </div>






        </div >

    )
}
export default BarChart
