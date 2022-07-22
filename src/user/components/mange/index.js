import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Information from "./infomationCustomer";
import ManageOrder from "./ManageOrder";
import ValidateCheckout from "./UpdateCustomer";
const ManageComponents = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  const updateid = searchParams.get('updateID')
  
  const ShowInfomation = (id, updateID) => {
    if (id) {
      return <Information />
    }
    if (updateID) {
      return <ValidateCheckout />
    }
  }
  return (<>
    {ShowInfomation(id, updateid)}
  </>);
}

export default ManageComponents;