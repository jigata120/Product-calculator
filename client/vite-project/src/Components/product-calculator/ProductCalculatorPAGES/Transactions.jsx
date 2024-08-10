import { useParams } from "react-router-dom";

export default function Transactions(){
    const Details = () => {
        const {Id} = useParams();
    }
    return(
        <div className="scrollable-div">
            <section className="overview">
            <header className="overview-header">
            <h2 className="overview-header-title">
                Transactions to review<span>7</span>
            </h2>
            <a href="#" className="link">
                View all
            </a>
            </header>
            <div className="overview-body">
            <div className="summary">
                <h3 className="summary-date">June 29, 2024</h3>
                <span className="summary-amount">+$77.01</span>
            </div>
            <div className="list">
                <div className="list-item">
                <div className="list-item-company">
                    <figure className="list-item-company-logo">
                    <img src="https://cdn-icons-png.flaticon.com/512/8637/8637124.png" />
                    </figure>
                    <div className="list-item-company-info">
                    <h4 className="list-item-company-name">Database tax</h4>
                    <a href="#" className="list-item-company-hashtag">
                        #Tax
                    </a>
                    </div>
                </div>
                <div className="list-item-transaction">
                    <div className="list-item-transaction-values">
                    <span className="list-item-transaction-value">
                        <i className="ph-arrows-clockwise-bold" />
                        -$19.99
                    </span>
                    <time
                        className="list-item-transaction-time"dateTime="17:00"
                    >
                        5:00pm
                    </time>
                    </div>
                    <button className="list-item-transaction-action">
                    <i className="ph-caret-down-bold" />
                    </button>
                </div>
                </div>
                <div className="list-item">
                <div className="list-item-company">
                    <figure className="list-item-company-logo">
                    <img src="https://assets.codepen.io/285131/megan.jpg" />
                    </figure>
                    <div className="list-item-company-info">
                    <h4 className="list-item-company-name">
                        E-Transfer from Megan Primeau
                    </h4>
                    <a href="#" className="list-item-company-hashtag">
                        #Income
                    </a>
                    </div>
                </div>
                <div className="list-item-transaction">
                    <div className="list-item-transaction-values">
                    <span className="list-item-transaction-value list-item-transaction-value--positive">
                        {" "}
                        +$120.00
                    </span>
                    <time
                        className="list-item-transaction-time"
                        dateTime="11:30"
                    >
                        11:30am
                    </time>
                    </div>
                    <button className="list-item-transaction-action">
                    <i className="ph-caret-down-bold" />
                    </button>
                </div>
                </div>
                <div className="list-item">
                <div className="list-item-company">
                    <figure className="list-item-company-logo">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/010/533/060/small_2x/house-cleaning-logo-cleaning-service-logo-cleaning-company-logo-house-wash-logo-template-free-vector.jpg" />
                    </figure>
                    <div className="list-item-company-info">
                    <h4 className="list-item-company-name">CL-cleaning</h4>
                    <a href="#" className="list-item-company-hashtag">
                        #Cleaning
                    </a>
                    <a href="#" className="list-item-company-hashtag">
                        #Tax
                    </a>
                    </div>
                </div>
                <div className="list-item-transaction">
                    <div className="list-item-transaction-values">
                    <span className="list-item-transaction-value">
                        {" "}
                        -$6.50
                    </span>
                    <time
                        className="list-item-transaction-time"
                        dateTime="11:23"
                    >
                        11:23am
                    </time>
                    </div>
                    <button className="list-item-transaction-action">
                    <i className="ph-caret-down-bold" />
                    </button>
                </div>
                </div>
                <div className="list-item">
                <div className="list-item-company">
                    <figure className="list-item-company-logo">
                    <img src="https://assets.codepen.io/285131/shell-logo.png" />
                    </figure>
                    <div className="list-item-company-info">
                    <h4 className="list-item-company-name">Shell</h4>
                    <a href="#" className="list-item-company-hashtag">
                        #Gas
                    </a>
                    </div>
                </div>
                <div className="list-item-transaction">
                    <div className="list-item-transaction-values">
                    <span className="list-item-transaction-value">
                        {" "}
                        -$16.50
                    </span>
                    <time
                        className="list-item-transaction-time"
                        dateTime="10:00"
                    >
                        10:00am
                    </time>
                    </div>
                    <button className="list-item-transaction-action">
                    <i className="ph-caret-down-bold" />
                    </button>
                </div>
                </div>
            </div>
            <div className="summary">
                <h3 className="summary-date">June 28, 2024</h3>
                <span className="summary-amount">+$102.76</span>
            </div>
            <div className="list">
                <div className="list-item">
                <div className="list-item-company">
                    <figure className="list-item-company-logo">
                    <img src="https://assets.codepen.io/285131/mike.jpg" />
                    </figure>
                    <div className="list-item-company-info">
                    <h4 className="list-item-company-name">
                        E-Transfer from Mike Gravelle
                    </h4>
                    <a href="#" className="list-item-company-hashtag">
                        #Income
                    </a>
                    </div>
                </div>
                <div className="list-item-transaction">
                    <div className="list-item-transaction-values">
                    <span className="list-item-transaction-value list-item-transaction-value--positive">
                        +$67.00
                    </span>
                    <time
                        className="list-item-transaction-time"dateTime="17:00"
                    >
                        5:00pm
                    </time>
                    </div>
                    <button className="list-item-transaction-action">
                    <i className="ph-caret-down-bold" />
                    </button>
                </div>
                </div>
                <div className="list-item">
                <div className="list-item-company">
                    <figure className="list-item-company-logo">
                    <img src="https://img.freepik.com/free-photo/photorealistic-scene-with-warehouse-logistics-operations_23-2151468917.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1716681600&semt=ais_user" />
                    </figure>
                    <div className="list-item-company-info">
                    <h4 className="list-item-company-name">Stock refill</h4>
                    <a href="#" className="list-item-company-hashtag">
                        #Stock
                    </a>
                    </div>
                </div>
                <div className="list-item-transaction">
                    <div className="list-item-transaction-values">
                    <span className="list-item-transaction-value">
                        {" "}
                        -$150.56
                    </span>
                    <time
                        className="list-item-transaction-time"
                        dateTime="16:40"
                    >
                        4:40pm
                    </time>
                    </div>
                    <button className="list-item-transaction-action">
                    <i className="ph-caret-down-bold" />
                    </button>
                </div>
                </div>
                <div className="list-item">
                <div className="list-item-company">
                    <figure className="list-item-company-logo">
                    <img src="https://images-platform.99static.com//5_RrGQsskUIFD0nJG251i8XYZuo=/174x0:1224x1050/fit-in/500x500/99designs-contests-attachments/107/107631/attachment_107631301" />
                    </figure>
                    <div className="list-item-company-info">
                    <h4 className="list-item-company-name">TWS-shipping</h4>
                    <a href="#" className="list-item-company-hashtag">
                        #Shipping
                    </a>
                    </div>
                </div>
                <div className="list-item-transaction">
                    <div className="list-item-transaction-values">
                    <span className="list-item-transaction-value">
                        {" "}
                        -$19.20
                    </span>
                    <time
                        className="list-item-transaction-time"
                        dateTime="13:23"
                    >
                        1:23am
                    </time>
                    </div>
                    <button className="list-item-transaction-action">
                    <i className="ph-caret-down-bold" />
                    </button>
                </div>
                </div>
            </div>
            </div>
            {/* <footer className="overview-footer">
            <a href="#" className="link">
                View all transactions
                <i className="ph-arrow-right-bold" />
            </a>
        </footer> */}
    </section>
        </div>
    )
}