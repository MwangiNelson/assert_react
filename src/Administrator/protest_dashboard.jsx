import React, { useState, useEffect } from 'react'
import { LoaderGreen } from '../components/features';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProtestDashboard() {
  const [tabIndex, setTabIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [protests, setProtests] = useState(null)
  const [displayProtests, setDisplayedProtests] = useState(null)
  const [protestCount, setProtestCount] = useState(0)
  const [invalidCount, setInvalidCount] = useState(0)
  const [selected, setSelected] = useState(null)

  const fetchProtests = async () => {
    const url = 'http://127.0.0.1:8000/api/protests';
    try {
      const response = await axios.get(url);
      const data = response.data.protests;
      setProtests(data);
      // console.log('Protest fetch successful:', data);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false)
    }
  };

  const filterValidated = () => {
    if (protests) {
      const filteredArray = protests.filter((obj) => obj.is_validated);
      setDisplayedProtests(filteredArray);
      setProtestCount(filteredArray.length);
      setInvalidCount(protests.length - filteredArray.length)
      setTabIndex(0)
    }
  };

  const filterNotValidated = () => {
    if (protests) {
      const filteredArray = protests.filter((obj) => !obj.is_validated);
      setDisplayedProtests(filteredArray);
      setInvalidCount(filteredArray.length);
      setProtestCount(protests.length - filteredArray.length)
      setTabIndex(1)
    }
  };


  const methods = []
  const toggleDescription = (index) => {
    (index == selected) ? setSelected(null) : setSelected(index)
  }

  const toggleValidation = async (protest_id, validation_state) => {
    const url = `http://127.0.0.1:8000/api/updateProtest`;
    const protestData = {
      id: protest_id,
      is_validated: !validation_state
    }

    console.log(protestData)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(protestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('tried to reload here');
        // Update the is_banned status in the ushers state
        const updatedProtests = protests.map((protest) => {
          if (protest.id === protest_id) {
            return {
              ...protest,
              is_banned: !protest.is_validated,
            };
          }
          return protest;
        });
        setProtests(updatedProtests);
        location.reload()
        // Update the displayedProtests state based on the new approval status
        if (!validation_state) {
          filterValidated();
        } else {
          filterNotValidated();
        }
      } else {
        console.log('Protest could not be updated.');
        return false;
      }
    } catch (error) {
      console.log('Error:', error);
      return false;
    }
  }


  useEffect(() => {
    fetchProtests()
  }, []);

  useEffect(() => { filterValidated() }, [protests])

  const ProtestCard = (props) => {
    return (
      <div className="w-100 p-3 d-flex flex-row ">
        <div className={`btn rounded-1 btn-light border p-0 w-100 d-flex flex-row rounded ${!props.is_validated ? 'border-danger' : ''}`} >
          <img src="images/demos.jpg" alt="" className="w-25 img-cover" />
          <div className="w-75 ais d-flex flex-column p-4">
            <div className="w-100 d-flex flex-row border-0 border-bottom border-2 border-dark aic justify-content-between">
              <h2 className="fs-2 text-uppercase text-bold p-0 m-0">{props.title.toString().toLowerCase()}</h2>
              <button
                className="btn btn-outline-dark gap-2 border-0 p-0 px-3 m-0 d-flex jcc aic"
                onClick={() => { toggleDescription(props.index) }}
              >
                DESCRIPTION
                <i className="fa-solid fa-angle-down fs-5"></i>
              </button>
            </div>

            <div className="d-flex flex-column-reverse w-100 pt-3">
              <div className="w-50 d-flex flex-column">
                <h4 className='text-capitalize d-flex gap-1'>Venue <b className='font-primary text-primary text-bold'>:</b> <b className='text-primary'>{props.venue.toString().toLowerCase()}</b></h4>
                <h4 className='text-capitalize d-flex gap-1'>Date <b className='font-primary text-primary text-bold'>:</b> <b className='text-primary justify-content-center d-flex'>{props.date}</b></h4>
                <h4 className='text-capitalize d-flex gap-1'>Status <b className='font-primary text-bold'>:</b> <b className={props.is_validated ? 'justify-content-center d-flex text-success' : 'justify-content-center d-flex text-danger'}>{props.is_validated ? 'VALIDATED' : 'NOT VALIDATED'}</b></h4>

                <div className="w-100 d-flex gap-3 flex-row">
                  <button className="btn btn-warning gap-3 d-flex flex-row">
                    CANCEL
                    <i className="fa-solid fa-ban"></i>
                  </button>
                  <button
                    className={`btn gap-3 d-flex flex-row ${props.is_validated ? 'btn-danger' : 'btn-success'} `}
                    onClick={() => { toggleValidation(props.protest_id, props.is_validated) }}
                  >

                    {(props.is_validated == 1) ? 'INVALIDATE' : 'VALIDATE'}
                    <i className="fa-solid fa-book "></i>
                  </button>
                </div>

              </div>
              <div className="w-100 text-secondary tas animate-down" style={{ height: (selected == props.index) ? '100%' : '0', overflow: 'hidden' }} >
                <p className='tas m-0 py-3'>{props.description}</p>
              </div>
            </div>


          </div>

        </div>
      </div >
    )
  }

  return (
    <div className="w-100 d-flex jcc aic py-4 flex-column">
      <div className="w-75 vh-100">
        <div className="w-100 d-flex gap-4 flex-row py-4">
          <div className={`w-50 px-4 d-flex ais flex-column rounded py-4 btn btn-light border ${tabIndex == 0 ? 'bg-secondary' : ''} `}
            onClick={filterValidated}
          >
            <h2 className="fs-3">
              ALL PROTESTS
            </h2>
            <p className={`display-3 p-0 m-0 ${tabIndex == 0 ? 'text-secondary-green' : 'text-dark'}`}>
              {protestCount}
            </p>

          </div>
          <div className={`w-50 px-4 d-flex ais flex-column rounded py-4 btn btn-light border ${tabIndex == 1 ? 'bg-secondary' : ''} `}
            onClick={filterNotValidated}
          >
            <h2 className="fs-3">
              PROTEST APPROVAL REQUESTS
            </h2>
            <p className={`display-3 p-0 m-0 ${tabIndex == 1 ? 'text-secondary-green' : 'text-dark'}`}>
              {invalidCount}
            </p>

          </div>
        </div>
        <div className="w-100 border-0 border-top">
          <div className="w-100 d-flex flex-row aic jsb">
            <h2 className="fs-1 pt-3">ALL PROTESTS</h2>
            <Link to={'/post-protests'}>            <button className="btn btn-outline-dark rounded-1">ADD NEW PROTEST</button>
            </Link>
          </div>
          <div className="w-100 d-flex flex-row flex-wrap">
            {
              loading ? <LoaderGreen /> : (displayProtests !== null) ? displayProtests.map((protest, index) => {
                return (
                  <ProtestCard
                    key={index}
                    title={protest.title}
                    venue={protest.venue}
                    date={protest.event_date}
                    description={protest.description}
                    protest_id={protest.protest_id}
                    is_validated={protest.is_validated}
                    index={index}
                  />
                )
              }) : <div className="w-100 bg-warning rounded p-2 border-secondary rounded-1 tac"> There are no protests available</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProtestDashboard