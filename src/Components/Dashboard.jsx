import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

const Dashboard = () => {

    
  const navigate = useNavigate();
  const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth)

  return (
    <div>
      Hello ${user.name}
    </div>
  )
}

export default Dashboard
