
import { useParams } from 'react-router-dom';


export default function Subscriptions(){
    const Details = () => {
        const {Id} = useParams();
    }

    return(
        <div className="scrollable-div">
            <section className="overview">
        <header className="overview-header">
        <h2 className="overview-header-title">
            Recent payments<span>3</span>
        </h2>
        <a href="#" className="link">
            View all
        </a>
        </header>
        <div className="overview-body">
        <div className="list">
            <div className="list-item">
            <div className="list-item-company">
                <figure className="list-item-company-logo list-item-company-logo--square">
                <img src="https://www.zarla.com/images/zarla-funkbox-fiber-1x1-2400x2400-20221115-bdvh3v6xdrkgh6dqjyjr.png?crop=1:1,smart&width=250&dpr=2" />
                </figure>
                <div className="list-item-company-info">
                <h4 className="list-item-company-name">Internet-companyPack</h4>
                <a href="#" className="list-item-company-hashtag">
                    #Connention
                </a>
                </div>
            </div>
            <div className="list-item-transaction">
                <div className="list-item-transaction-values">
                <span className="list-item-transaction-value">
                    <i className="ph-arrows-clockwise-bold" />
                    -$47.99
                </span>
                <time
                    className="list-item-transaction-time"
                    dateTime="2024-09-23T16:00:00"
                >
                    August 3, 2024 at 4:00pm
                </time>
                </div>
                <button className="list-item-transaction-action">
                <i className="ph-caret-down-bold" />
                </button>
            </div>
            </div>
            <div className="list-item">
            <div className="list-item-company">
                <figure className="list-item-company-logo list-item-company-logo--square">
                <img src="https://img.freepik.com/free-vector/gradient-code-logo-template_23-2148820807.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722988800&semt=ais_hybrid" />
                </figure>
                <div className="list-item-company-info">
                <h4 className="list-item-company-name">Monitoring</h4>
                <a href="#" className="list-item-company-hashtag">
                    #Software
                </a>
                </div>
            </div>
            <div className="list-item-transaction">
                <div className="list-item-transaction-values">
                <span className="list-item-transaction-value">
                    <i className="ph-arrows-clockwise-bold" /> -$9.99
                </span>
                <time
                    className="list-item-transaction-time"
                    dateTime="2024-09-26T17:00:00"
                >
                    August 2, 2024 at 5:00pm
                </time>
                </div>
                <button className="list-item-transaction-action">
                <i className="ph-caret-down-bold" />
                </button>
            </div>
            </div>
            <div className="list-item">
            <div className="list-item-company">
                <figure className="list-item-company-logo list-item-company-logo--square">
                <img src="https://img.freepik.com/free-vector/house-rent-concept-background_23-2147779983.jpg" />
                </figure>
                <div className="list-item-company-info">
                <h4 className="list-item-company-name">Office rent</h4>
                <a href="#" className="list-item-company-hashtag">
                    #Rent
                </a>
                </div>
            </div>
            <div className="list-item-transaction">
                <div className="list-item-transaction-values">
                <span className="list-item-transaction-value">
                    <i className="ph-arrows-clockwise-bold" /> -$180.50
                </span>
                <time
                    className="list-item-transaction-time"
                    dateTime="2024-09-27T21:00:00"
                >
                    August 0, 2024 at 9:00pm
                </time>
                </div>
                <button className="list-item-transaction-action">
                <i className="ph-caret-down-bold" />
                </button>
            </div>
            </div>
        </div>
        </div>
        <footer className="overview-footer">
        <a href="#" className="link">
            View all upcoming payments
            <i className="ph-arrow-right-bold" />
        </a>
        </footer>
    </section>
        </div>
    )
}