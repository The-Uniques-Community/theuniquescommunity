import React from 'react'
import TransactionTable from './components/TransactionTable'
import StatCard from '../dashboardComponents/StatCard'

const index = () => {
  return (
    <div>
      <div className='grid grid-cols-4 my-4'>
        <StatCard title='Total Members' value={55}/>
        <StatCard title='Total Fine' value={5500}/>
        

      </div>
      <TransactionTable/>
    </div>
  )
}

export default index