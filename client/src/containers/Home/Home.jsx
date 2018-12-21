import React, { Component } from 'react';
import { Loader } from '../../components/UI';
import { addCar } from '../../api/routes/cars';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Home.scss';

const propTypes = {
    history: PropTypes.object
};

class Home extends Component {
    carTypes = ['Hatchback', 'Sedan', 'MPV', 'SUV', 'Crossover', 'Coupe', 'Convertible'];

    state = {
        isLoading: false,
        isSuccess: false,
        previousCars: [],
        vehicleNumber: '',
        carType: this.carTypes[0],
        carModel: ''
    };

    constructor(props) {
        super(props);

        this.handleVehicleNumberChange = this.handleVehicleNumberChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleFormSaveClick = this.handleFormSaveClick.bind(this);
    }

    async getAllCars() {
        const cars = await axios.get('/api/getAllCars');
        this.setState({
            previousCars: cars.data
        });
    }

    renderPreviousCars() {
        return this.state.previousCars.map((car, i) => {
            return (
                <div key={i} className="container">
                    <div className="row">
                        <div className="col-sm">
                            {car.vehicleNumber}
                        </div>
                        <div className="col-sm">
                            {car.carType}
                        </div>
                        <div className="col-sm">
                            {car.carModel}
                        </div>
                    </div>
                </div>
            );
        });
    }

    handleVehicleNumberChange = (e) => {
        this.setState({ vehicleNumber: e.target.value });
    };

    handleTypeChange = (e) => {
        this.setState({ carType: e.target.value });
    };

    handleModelChange = (e) => {
        this.setState({ carModel: e.target.value });
    };

    handleFormSaveClick = async (e) => {
        const { state } = this;
        this.setState({ isLoading: true, isSuccess: false });

        try {
            await axios.post('/api/addCar', {
                vehicleNumber: state.vehicleNumber,
                carType: state.carType,
                carModel: state.carModel
            });

            this.setState({
                isSuccess: true,
                vehicleNumber: '',
                carType: this.carTypes[0],
                carModel: ''
            });

            this.getAllCars();
        }
        catch (err) {
            this.setState({ isSuccess: false });
        }
        finally {
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { state } = this;

        return (
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-outline-secondary">
                            <div className="card-header">
                                <h3 className="mb-0">Add car</h3>
                            </div>
                            <div className="card-body">
                                <form className="form" autoComplete="off">
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Vehicle number</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" value={state.vehicleNumber} onChange={this.handleVehicleNumberChange} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Type</label>
                                        <div className="col-lg-9">
                                            <select className="form-control" size="0" value={state.carType} onChange={this.handleTypeChange}>
                                                {this.carTypes.map((e, i) => {
                                                    return <option key={i} value={e}>{e}</option>;
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Model</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" value={state.carModel} onChange={this.handleModelChange} />
                                        </div>
                                    </div>
                                    <div className="form-group row submit">
                                        <label className="col-lg-3 col-form-label form-control-label"></label>
                                        <div className="col-lg-9">
                                            {state.isLoading && <Loader />}
                                            {!state.isLoading && <input type="button" className="btn btn-primary" value="Save Changes" onClick={this.handleFormSaveClick} />}
                                            {state.isSuccess && <div className="badge badge-success">Success</div>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.previousCars.length > 0 &&
                    <div className="container">
                        <h3>Previous cars</h3>
                        <div className="container">
                            {this.renderPreviousCars()}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Home.propTypes = propTypes;

export default Home;