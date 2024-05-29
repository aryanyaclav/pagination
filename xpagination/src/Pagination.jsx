import React, { useEffect, useState } from 'react'
import Table from './Table'
import './Pagination.css'

export default function Pagination() {
    let contentApi = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"

    let [employeeData, setEmployeeData] = useState([])
    let [paginatedData, setPaginatedData] = useState({})
    let [presentPage, setPresentPage] = useState(1)
    let [displayData, setDisplayData] = useState([])
    let heading = ["ID", "Name", "Email", "Role"]
    let [totalPages, setTotalPages] = useState(0)

    let fetchData = () => {
        try{
            fetch(contentApi).then((res) => res.json()).then((data) => 
                setEmployeeData(data)).catch((err) => alert("failed to fetch data"))
        }catch(err){
            console.log(`Some error in fetching data: ${err}`)
        }
    }

    let createPaginatedData = () => {
        let dataLength = employeeData.length
        let dataWithPage = {}
        let pageNeeded = Math.ceil(dataLength/10)
        let dataTraversal = 0
        for(let i=1;i<=pageNeeded;i++){
            let tenData = []
            let pageTraversal = 0
            while(pageTraversal < 10 && dataTraversal < dataLength){
                tenData.push(employeeData[dataTraversal])
                pageTraversal++
                dataTraversal++
            }
            dataWithPage[i] = tenData
        }
        setPaginatedData(dataWithPage)
        setTotalPages(pageNeeded)
    }


    let goToPreviousPage = () => {
        if(presentPage !== 1){
            setPresentPage(presentPage-1)
        }
    }

    let goToNextPage = () => {
        if(presentPage !== totalPages){
            setPresentPage(presentPage + 1)
        }
    }

    // hook for fetching data
    useEffect(() => {
        fetchData()
    }, [])

    //hook for creating paginated data
    useEffect(() => {
        if(employeeData.length > 0){
            createPaginatedData()
        }
    },[employeeData])

    //hook for displaying particular page data when page changes
    useEffect(() => {
        if(paginatedData[presentPage]){
            setDisplayData(paginatedData[presentPage])
        }
    }, [presentPage,employeeData, paginatedData])

  return (
    <div className="mainContainer">
            {/* { [1,2,3,4,5].map((page) => {
                return <button onClick={(e) => displayDataAndPage(e)} value={page}>{page}</button>
            })}
            <button onClick={() => displayselectedPageData()}>display data</button> */}
            <div className="main-heading">Employee Data Table</div>
            <Table headings={heading} body={displayData} />
            <div className="buttonContainer">
            <div className='insideContainer'>
            <button onClick={(() => goToPreviousPage())}>Previous</button>
                <div className="pageNumber">{presentPage}</div>
                <button onClick={(() => goToNextPage())}>Next</button>
            </div>
                
            </div>
    </div>
  )
}
