import axios from 'axios';
import React, { useState } from 'react';
import { Card, Input, Button, Icon, Loader } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_KEY = `9B549DB9A2C64A60958AEBFA7E24708A`;
const API_ENDPOINT = `https://api.veriphone.io/v2/verify`;
export default function VeriPhone() {
    const [mobileNumber, setMobileNumber] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [phoneData, setPhoneData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const checkMobileNumber = (mobile) => {
        setMobileNumber(mobile);

        if (mobile === '') {
            setIsVisible(false)
        }
    }

    const verifyMobile = () => {
        setIsLoading(true)
        axios.get(`${API_ENDPOINT}?phone=${mobileNumber}&key=${API_KEY}`)
            .then((item) => {
                setPhoneData(item.data);
                if (!item.data.phone_valid) {
                    toast.error("Phone Number is Not Valid");
                    setIsLoading(false)
                }
                else {
                    setIsVisible(true)
                    setIsLoading(false)
                }
            })
    }
    return (
        <div className="app-body">
            <ToastContainer />
            <Card centered className="card-body">
                <Card.Content>
                    <div className="input-container">
                        <Input icon='search'
                            placeholder='Type a Phone Number..'
                            onChange={(e) => checkMobileNumber(e.target.value)}
                        />
                    </div>
                    <div className="btn-container">
                        <Button secondary onClick={verifyMobile}>
                            <Icon name='phone' />Check Mobile Number
                        </Button>
                    </div>
                    {isVisible ? (
                        !isLoading ? (
                            phoneData.phone_valid !== true ? (
                                <div>
                                    <h3>Invalid Mobile Number</h3>
                                </div>
                            ) : (
                                <div className="phone-data">
                                    <h3>Status: <span className="phone-span">{phoneData.status}</span></h3>
                                    <h3>Carrier: <span className="phone-span">{phoneData.carrier}</span></h3>
                                    <h3>Country: <span className="phone-span">{phoneData.country}</span></h3>
                                    <h3>Country Code: <span className="phone-span">{phoneData.country_code}</span></h3>
                                    <h3>International Number: <span className="phone-span">{phoneData.international_number}</span></h3>
                                    <h3>Phone Region: <span className="phone-span">{phoneData.phone_region}</span></h3>
                                    <h3>Validity: <span className="phone-span">{phoneData.phone_valid === true ? 'Valid' : 'Invalid'}</span></h3>
                                </div>
                            )
                        ) : (
                            <div className="loader-container">
                                <Loader active inline='centered' />
                                <h3>Loading..Please Wait..</h3>
                            </div>
                        )
                    ) : (
                        <div>
                            <h3>Check Mobile Number Validity</h3>
                            <p>Check the Mobile Number Validity of a Mobile Number. Just the the Mobile Number</p>
                        </div>
                    )}
                </Card.Content>
            </Card>
        </div>
    )
}
