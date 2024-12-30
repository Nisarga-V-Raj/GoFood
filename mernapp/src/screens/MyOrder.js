import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const fetchMyOrder = async () => {
        const email = localStorage.getItem('userEmail');
        const response = await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        setOrderData(data.orderData && data.orderData.order_data ? data.orderData.order_data : []);
    };
    useEffect(() => {
        fetchMyOrder();
    }, []);
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? orderData.map((order, orderIndex) => (
                        <div key={orderIndex} className="col-12 mt-4">
                            <div className="card">
                                <div className="card-body">
                                    {order[0] && order[0].Order_date && (
                                        <h5 className="card-title">
                                            Order Date: {formatDate(order[0].Order_date)}
                                        </h5>
                                    )}
                                    <div className="order-items">
                                        {order.slice(1).map((item, itemIndex) => (
                                            <div key={itemIndex} className='mb-3'>
                                                <div className="card mt-2">
                                                    <div className="card-body">
                                                        <h6 className="card-title">{item.name}</h6>
                                                        <p className='m-0'>Qty: {item.qty}</p>
                                                        <p className='m-0'>Size: {item.size}</p>
                                                        <p className='m-0'>Price: ₹{item.price}/-</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-12 mt-4">
                            <div className="alert alert-info" role="alert">
                                No orders found. Start shopping now!
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}