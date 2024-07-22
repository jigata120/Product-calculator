
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
                <img src="https://assets.codepen.io/285131/netflix-logo.png" />
                </figure>
                <div className="list-item-company-info">
                <h4 className="list-item-company-name">Netflix</h4>
                <a href="#" className="list-item-company-hashtag">
                    #Entertainment
                </a>
                </div>
            </div>
            <div className="list-item-transaction">
                <div className="list-item-transaction-values">
                <span className="list-item-transaction-value">
                    <i className="ph-arrows-clockwise-bold" />
                    -$7.99
                </span>
                <time
                    className="list-item-transaction-time"
                    dateTime="2020-09-23T16:00:00"
                >
                    September 23, 2020 at 4:00pm
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
                <img src="https://assets.codepen.io/285131/apple-music.png" />
                </figure>
                <div className="list-item-company-info">
                <h4 className="list-item-company-name">Apple Music</h4>
                <a href="#" className="list-item-company-hashtag">
                    #Music
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
                    dateTime="2020-09-26T17:00:00"
                >
                    September 26, 2020 at 5:00pm
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
                <img src="https://assets.codepen.io/285131/aws-logo.png" />
                </figure>
                <div className="list-item-company-info">
                <h4 className="list-item-company-name">Amazon AWS</h4>
                <a href="#" className="list-item-company-hashtag">
                    #Hosting
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
                    dateTime="2020-09-27T21:00:00"
                >
                    September 27, 2020 at 9:00pm
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