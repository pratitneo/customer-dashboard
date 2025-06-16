import "./styles/global.scss";
import Searchbar from "./components/searchBar/searchBar";
import Heading from "./components/heading/heading";
import Button from "./components/button/button";
import { CiSquarePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import QuickCard from "./components/quickCard/quickCard";
import type { CustomersDataType, ErrorsType, FormDataType } from "./types/types";
import { FaUsers } from "react-icons/fa";
import { MdBlock, MdOutlineNotificationsActive } from "react-icons/md";
import CustomerCard from "./components/customerCard/customerCard";
import Overlay from "./components/overlay/overlay";
import NewCustomer from "./components/newCustomer/newCustomer";

function App() {
  const [customers, setCustomers] = useState<CustomersDataType | null>(null)
  const [filteredCustomers, setFilteredCustomers] = useState<CustomersDataType | null>(null)
  const [_loading, setLoading] = useState(true)
  const [_error, setError] = useState<null | string>(null)
  const [modal, setModal] = useState(false)

  // fetch data from api
  useEffect(() => {
    const getLocalData = localStorage.getItem('customers')
    if (getLocalData) {
      setCustomers(JSON.parse(getLocalData))
    }
    else {
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
    }
  }, [])

  // set customers to filtered customers
  useEffect(() => {
    if (customers) {
      setFilteredCustomers(customers);
    }
  }, [customers]);

  // set data to local storage
  useEffect(() => {
    if (filteredCustomers?.customers && filteredCustomers.customers.length > 0) {
      localStorage.setItem('customers', JSON.stringify(filteredCustomers));
    }
  }, [filteredCustomers]);

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

  const handleModalClose = () => {
    setModal(false)
  }
  const pushNewCustomer = (customer: ErrorsType) => {
    setCustomers((prev: any) => ({ ...prev, customers: [...prev?.customers || [], customer] }));
    setModal(false)
  }
  const handleCustomerDeletion = (_customer: FormDataType, index: number) => {
    setCustomers((prev: any) => {
      if (!prev?.customers) return prev;
      return {
        ...prev,
        customers: prev.customers.filter((_: any, i: number) => i !== index),
      };
    });
  };

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
              handleNewCustomer={() => setModal(true)}
            />
          </div>
          <div className="cust-dash__quickCards">
            <QuickCard iconName={<FaUsers />} head="total customers" total={totalCustomers} />
            <QuickCard iconName={<MdOutlineNotificationsActive />} head="active customers" total={activeCustomers} />
            <QuickCard iconName={<MdBlock />} head="inactive customers" total={inActiveCustomers} />
            {/* <QuickCard iconName={<CiLogin />} head="contacts logged in" total={customers?.contactsLogIn} /> */}
          </div>
          <div className='cust-dash__cards'>
            <CustomerCard customersData={filteredCustomers} updateStatus={changeStatus} getDeleteFn={handleCustomerDeletion} />
          </div>
        </div>
        {modal ? (
          <Overlay getModalCloseFn={handleModalClose}>
            <NewCustomer sendNewCustomer={pushNewCustomer} />
          </Overlay>
        ) : ''}
      </div>
    </div>
  );
}

export default App;
