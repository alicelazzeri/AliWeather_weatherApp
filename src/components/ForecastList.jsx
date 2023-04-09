import { useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const ForecastList = () => {
  const dispatch = useDispatch();
  const settimana = useSelector(state => state.settimana.content);
  const longitude = "10.5258221";
  const latitude = "42.9332727";
  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=en&units=metric&appid=0fed715bb045ae4b8aceb8e42ee9243a`;
  const request = async endpoint => {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: "WEEKLY_WEATHER", payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    request(endpoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {settimana !== null && (
        <>
          <ListGroup id="forecastList" variant="flush">
            {settimana.list.map((day, index) => (
              <ListGroup.Item
                key={{ index }}
                className="d-flex justify-content-between align-items-center px-2 px-md-5 py-3"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <img src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="Weather" width={40} />
                  <span className="ps-4 fw-light">
                    {new Date(day.dt * 1000).toLocaleDateString("en-UK", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "Europe/London",
                    })}
                  </span>
                </div>

                <p className="fw-light mb-0">
                  <small>
                    {day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1)}
                  </small>
                </p>

                <div className="d-flex flex-row">
                  <p className="fw-light mb-0">
                    {" "}
                    <span>{parseFloat(day.main.temp_min).toFixed(0)}°</span> &#8211;{" "}
                    <span>{parseFloat(day.main.temp_max).toFixed(0)}°</span>
                  </p>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </Container>
  );
};

export default ForecastList;