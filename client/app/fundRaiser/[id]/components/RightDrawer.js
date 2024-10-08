'use client'
import { CheckIcon, CloseIcon, WarningIcon } from "@chakra-ui/icons";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useParams } from "next/navigation";
import axios from "axios";


const RightDrawer = ({ data: timeline, isOpen, onClose }) => {
    const [user, setUser] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const { id } = useParams();
    // const [remark, setRemark] = useState("");
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState("");

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const onSubmit = () => {
        console.log(selectedOption, message);
    };

    useEffect(() => {
        const getTokenFromCookie = () => {
            const cookies = document.cookie.split("; ");
            const cookie = cookies.find((c) => c.startsWith("token="));
            if (cookie) {
                const token = cookie.split("=")[1];
                return token;
            }
            return null;
        };
        const decodeToken = (token) => {
            if (token) {
                try {
                    const decoded = jwt.decode(token);
                    //console.log('Decoded token:', decoded);
                    setUser(decoded);
                } catch (error) {
                    console.error("Error decoding token:", error.message);
                }
            }
        };
        const token = getTokenFromCookie();
        decodeToken(token);
    }, []);


    useEffect(() => {

        axios.post(`http://localhost:5000/api/fetchById/`, { id: user?.userId })
            .then((res) => {
                console.log(res.data);
                setUserName(res.data.name);
                setUserEmail(res.data.email);

                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });

    },);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';  // Replace with the actual script URL
        script.async = true;
        document.body.appendChild(script);

        // Clean up to remove the script when the component unmounts
        
    }, []);

    const donate = async () => {
        
        setIsLoading(true);
        try {

            // Create order by calling the server endpoint
            // response = await fetch('/create-order', {
            //   method: 'POST', 
            //   headers: {
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify({ amount , currency: 'INR', receipt: 'receipt#1', notes: {} })
            // });
            let response = await axios.post(`http://localhost:5000/api/payment/create-order`, { amount, currency: 'INR', receipt: 'receipt#1', notes: {} });
            console.log("Arbra ka dabra",response.data);
            
            const order = await response.data;
            
            // Open Razorpay Checkout
            const options = {
              key: 'rzp_test_mxUTlp84gEbEo8', // Replace with your Razorpay key_id
              amount: order.amount,
              currency: order.currency,
              name: 'AlumniConnect',
              description: message,
              order_id: order.id, // This is the order_id created in the backend
              callback_url: window.location, // Your success URL
              prefill: {
                name: userName,
                email: userEmail,
                contact: '9999999999'
              },
              theme: {
                color: '#F37254'
              },
               handler:  function (response) {
                axios.post('http://localhost:5000/api/payment/verify-payment', {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                })
                .then((res) => {
                    const data = res.data;
                    if (data.status === 'ok') {
                        
                        alert('Payment successful');
                        response =  axios.post(`http://localhost:5000/api/fundraiser/${id}/donate`, { amount, userId: user?.userId, userName, userEmail, message });
                        console.log(response.data);
                        onClose();
                        toast({
                            title: "Donation Successful",
                            description: "Thank you for your donation",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                        });
                        //reload the page
                        //wait for 5 seconds before reloading
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                        
                    } else {
                        alert('Payment verification failed');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error verifying payment');
                });
            }
            };
      
            const rzp = await new Razorpay(options);
            console.log('Razorpay:', rzp);
            
            rzp.open();
            // response = await axios.post(`http://localhost:5000/api/fundraiser/${id}/donate`, { amount, userId: user?.userId, userName, userEmail, message });
            // console.log(response.data);
            // onClose();
            // toast({
            //     title: "Donation Successful",
            //     description: "Thank you for your donation",
            //     status: "success",
            //     duration: 3000,
            //     isClosable: true,
            // });
            // setIsLoading(false);

        } catch (error) {
            console.error('Error donating:', error);
            toast({
                title: "Donation Failed",
                description: "Please try again",
                status: "error",
                duration: 3000,
                isClosable: true,
            });

        } finally {
            setIsLoading(false);
        }
        // { amount, userId, userName, userEmail, message }
    }



    console.log(userName, userEmail, amount, message, id, user?.userId)
    return (
        <Drawer
            // bgColor="#a19bef"
            isOpen={isOpen}
            placement="right"
            onClose={onClose}

        // finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent bgColor={'#f7f7ff'}>
                <DrawerCloseButton />
                <DrawerHeader>Donate to Fundraiser</DrawerHeader>

                <DrawerBody >
                    <div className="flex flex-col-reverse ">
                        <div className="flex ">
                            <div className="w-full">
                                <label
                                    htmlFor="comment"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Add your Message
                                </label>

                                <div className="mt-1">
                                    <textarea
                                        rows={4}
                                        onChange={(e) => setMessage(e.target.value)}
                                        name="comment"
                                        id="comment"
                                        className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 rounded-md"
                                        defaultValue={""}
                                    />
                                </div>
                            </div>
                            {/* <div></div> */}
                        </div>

                        <div>
                            <div>
                                <label htmlFor="amount1" className="block text-sm font-medium text-gray-700">
                                    Select Amount
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        name="amount1"
                                        id="amount"
                                        className=" p-2 shadow-sm min-h-10  text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 rounded-md mb-2"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button isLoading={isLoading} onClick={donate} bgColor={'#231d69'} textColor={'white'} >
                        Donate✨
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default RightDrawer;
