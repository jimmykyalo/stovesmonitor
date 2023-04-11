import React, { useState } from 'react'
import Modal from './Modal';
import Select from 'react-select'

function AddStoveForm({open, setOpen}) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [location, setLocation] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [product, setProduct] = useState('')
	const [date, setDate] = useState('')
	const [loading, setLoading] = useState(false)
    const [places, setPlaces] = useState([])
    const [placeId, setPlaceId] = useState('')
    const [IDNumber, setIDNumber] = useState('')
    const [householdSize, setHouseholdSize] = useState('')
    const [gender, setGender] = useState('')
    const [incomeLevel, setIncomeLevel] = useState('')
    const [educationLevel, setEducationLevel] = useState('')
    const [type, setType] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')
    const [customer, setCustomer] = useState('')
    const [notify, setNotify] = useState(false)

    const handleProductChange = (newValue, actionMeta) => {
        

        if (newValue){
            
            setProduct(newValue.value)
        }else{
            setProduct('')
        }
        
    };
    const today = new Date()
  return (
    <Modal open={open} setOpen={setOpen} title="Add Stove">
        <form>
            <div className="col-2">
                <h3 className="text-emerald-500 text-center font-normal">Stove Details</h3>

                <div className="form-group">
                    <label htmlFor="date" className="form-label">Start Date</label>
                    <input value={date} onChange={(e)=> setDate(e.target.value)} max={`${today.getFullYear()}-${today.getMonth()<9?0:''}${today.getMonth()+1}-${today.getDate()}`} required type="date" name="date" id="date" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="product" className="form-label">Product</label>
                    <Select id='product' required isClearable isSearchable options={[]} onChange={handleProductChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="totalPrice" className="form-label">Price</label>
                    <input value={totalPrice} onChange={(e)=> setTotalPrice(e.target.value)} required type="number"  name="totalPrice" id="totalPrice" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input value={location} onChange={(e)=> setLocation(e.target.value)} required type="text" name="location" id="location" className="form-input" />
                </div>

            </div>

        </form>
    </Modal>
  )
}

export default AddStoveForm