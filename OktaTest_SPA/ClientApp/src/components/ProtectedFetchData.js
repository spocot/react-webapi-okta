import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

function ProtectedFetchData() {
    const { authState, oktaAuth } = useOktaAuth();

    const [state, setState] = useState({
        forecasts: [],
        loading: true
    });

    useEffect(() => {
        console.log(authState);
        fetch('https://localhost:7215/protectedweatherforecast', {
            headers: {
                Authorization: 'Bearer ' + authState.accessToken
            }
        }).then((r) => r.json()).then((data) => {
            console.log(data);
            setState({ forecasts: data, loading: false });
        });
    }, []);

    function renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {state.loading ? <p><em>Loading...</em></p> : renderForecastsTable(state.forecasts)}
        </div>
    );
};

export default ProtectedFetchData;
