import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response = await response.json();
            setFoodItem(response[0]);
            setFoodCat(response[1]);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handleSearchChange = debounce((value) => {
        setSearch(value);
    }, 300);

    const carouselImages = [
        "https://images.pexels.com/photos/2271194/pexels-photo-2271194.jpeg?auto=compress&cs=tinysrgb&w=600",
        // ... add other image URLs here
    ];

    return (
        <div>
            <Navbar />
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                        <div className="carousel-inner" id='carousel'>
                            {carouselImages.map((img, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                    <img src={img} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt={`Carousel ${index}`} />
                                </div>
                            ))}
                            <div className="carousel-caption" style={{ zIndex: "10" }}>
                                <div className="d-flex justify-content-center">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSearchChange(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                )}
            </div>
            <div className='container'>
                {foodCat.length !== 0 && foodItem.length !== 0 ? (
                    foodCat.map((data) => (
                        <div key={data._id} className='row mb-3'>
                            <div className="fs-3 m-3">
                                {data.CategoryName}
                            </div>
                            <hr />
                            {foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                .map((filterItems) => (
                                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                        <Card foodItem={filterItems} options={filterItems.options[0]} />
                                    </div>
                                ))}
                        </div>
                    ))
                ) : (
                    <div>No data available</div>
                )}
            </div>
            <Footer />
        </div>
    );
}