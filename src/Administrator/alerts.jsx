import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Alerts() {
    const [alerts, setAlerts] = useState(null)

    async function getAlerts() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/alerts`);
            setAlerts(response.data.alerts)
        } catch (error) {
            console.error()
        }
    }
    function formatDateTime(datetime) {
        const formattedDate = new Date(datetime).toLocaleDateString();
        const formattedTime = new Date(datetime).toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        return `${formattedDate} (${formattedTime})`;
    }

    useEffect(() => {
        getAlerts()
    }, [])

    const AlertCard = (props) => {

        return (
            <div className="w-100 d-flex flex-column border border-2 rounded-1 p-3">
                <h2 className="display-4 text-danger">Notice</h2>
                <div className="w-100 d-flex flex-row">
                    <p className="fs-5 text-dark font-tertiary w-75">
                        An alert has been posted by <b className='fs-2'>{props.author}</b> ushering a protest <b className="fs-2">({props.title})</b> at <b className='fs-2'>{props.venue}</b>
                    </p>
                    <div className="w-25 d-flex flex-row-reverse">
                        <i className="fa-solid fa-triangle-exclamation fs-lg text-danger"></i>
                    </div>
                </div>
                <div className="w-100 d-flex flex-row-reverse">
                    Alert posted at {formatDateTime(props.timestamp)}
                </div>
            </div>
        )
    }

    return (
        <div className="w-100 d-flex jcc">
            <div className="d-flex w-75 flex-column vh-100-min py-4">
                <h1 className="text-bold display-2 border-0 border-bottom border-2 border-dark">
                    ALERTS
                </h1>
                {
                    alerts !== null && alerts !== [] ?
                        alerts.map((alert, index) => {
                            return (
                                <AlertCard
                                    key={index}
                                    author={alert.volunteer_username}
                                    title={alert.protest_title}
                                    venue={alert.venue}
                                    timestamp={alert.timestamp}
                                />
                            )
                        })
                        : null
                }



            </div>
        </div>
    )
}

export default Alerts