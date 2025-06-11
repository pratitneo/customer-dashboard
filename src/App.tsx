import "./styles/global.scss";
import Searchbar from "./components/searchBar/searchBar";
import Heading from "./components/heading/heading";
import Button from "./components/button/button";
import { CiSquarePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import QuickCard from "./components/quickCard/quickCard";
import type { CustomersDataType } from "./types/types";
import { FaUsers } from "react-icons/fa";
import { MdBlock, MdOutlineNotificationsActive } from "react-icons/md";
import CustomerCard from "./components/customerCard/customerCard";
function App() {
  const [customers, setCustomers] = useState<CustomersDataType | null>(null)
  const [filteredCustomers, setFilteredCustomers] = useState<CustomersDataType | null>(null)
  const [_loading, setLoading] = useState(true)
  const [_error, setError] = useState<null | string>(null)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`./data/customers.json`)
        if (!response.ok) {
          throw new Error("Failed to fetch customers")
        }
        const customersData = await response.json()
        setCustomers(customersData)
      }
      catch (err: any) {
        setError(err.message)
      }
      finally {
        setLoading(false)
      }
    }
    fetchCustomers()
  }, [])

  useEffect(() => {
    if (customers) {
      setFilteredCustomers(customers);
    }
  }, [customers]);

  const filterCustomers = (value: string) => {
    if (value) {
      const filteredArray = customers?.customers?.filter((customer: any) =>
        customer?.name?.toLowerCase().includes(value?.toLowerCase())
      ) || [];
      setFilteredCustomers({
        ...customers,
        customers: filteredArray,
        totalCustomers: filteredArray?.length,
        activeCustomers: filteredArray?.filter((customer: any) => customer?.status === 'Active')?.length,
        inactiveCustomers: filteredArray?.filter((customer: any) => customer?.status === 'Inactive')?.length,
        contactsLogIn: customers?.contactsLogIn,
      });
    } else {
      setFilteredCustomers(customers);
    }
  }

  const changeStatus = (_name: any, index: number) => {
    setFilteredCustomers((prevCustomers: any) => {
      return {
        ...prevCustomers,
        customers: prevCustomers?.customers?.map((customer: any, i: number) => {
          if (i === index) {
            return {
              ...customer,
              status: customer?.status ? false : true
            }
          }
          return customer
        })
      }
    })
  }

  const totalCustomers = filteredCustomers?.customers?.length
  const activeCustomers = filteredCustomers?.customers?.filter((customer) => customer?.status)?.length
  const inActiveCustomers = filteredCustomers?.customers?.filter((customer) => !customer?.status)?.length

  return (
    <div className='cust-dash__wrap'>
      {/* NAVBAR */}
      <div className="cust-dash__navbar">
        <div className="cust-dash__container">
          <Searchbar
            inputType="text"
            inputname="Header Search"
            inputPlaceHolder="search customer..."
            searchFn={filterCustomers}
          />
        </div>
      </div>
      {/* MAIN */}
      <div className="cust-dash__main">
        <div className="cust-dash__container">
          <div className="cust-dash__header">
            <Heading headName="customers" />
            <Button
              buttonText="new customer"
              isLeadingIcon={<CiSquarePlus />}
              location="header"
              color="blue"
            />
          </div>
          <div className="cust-dash__quickCards">
            <QuickCard iconName={<FaUsers />} head="total customers" total={totalCustomers} />
            <QuickCard iconName={<MdOutlineNotificationsActive />} head="active customers" total={activeCustomers} />
            <QuickCard iconName={<MdBlock />} head="inactive customers" total={inActiveCustomers} />
            {/* <QuickCard iconName={<CiLogin />} head="contacts logged in" total={customers?.contactsLogIn} /> */}
          </div>
          <div className='cust-dash__cards'>
            <CustomerCard customersData={filteredCustomers} updateStatus={changeStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
