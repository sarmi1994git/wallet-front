import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Input, Form, Label, FormFeedback, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';
import Swal from 'sweetalert2';

const isNumber = (val) => !isNaN(Number(val));
const maxLength = (len, val) => !(val) || (val.length <= len);
const minLength = (len, val) => (val) && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			identification: '',
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			touched: {
				identification: false,
				firstname: false,
				lastname: false,
				email: false,
				phone: false
			}
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		const errors = this.validateSubmit(this.state.identification, this.state.firstname, this.state.lastname,
											this.state.email, this.state.phone);
		if (!errors.error) {
			/*Se procede a realizar la operación de envio*/
			/*Armar request*/
			const data = {
				identification: this.state.identification,
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				email: this.state.email,
				phone: this.state.phone
			};
			console.log(data);
			axios.post(
				baseUrl + '/users',
				data
			)
			.then(response => {
				console.log(response);
				if (response.status === 201) {
					const data = response.data;
					if (data.code === 0) {
							Swal.fire(
							'Éxito',
							data.message,
							'success'
						);
						//resetear formulario
						this.reset();
					}
				} else if (response.status === 200) {
					const data = response.data;
					Swal.fire(
							'Oops...',
							data.message,
							'error'
						);
				}
			})
			.catch(error => {
				if (error.response) {
					Swal.fire(
						'Oops...',
						error.response.data.message,
						'error'
					);
			    } else {
			    	console.log(error);
			    }
			});
		}
		event.preventDefault();
	}

	reset() {
		this.setState({
			identification: '',
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			touched: {
				identification: false,
				firstname: false,
				lastname: false,
				email: false,
				phone: false
			}
		});
	}

	handleInputChange(event) {
		const target = event.target;
		const { name, value} = target;
		this.setState({
			[name]: value
		});
	}

	handleBlur = (field) => (event) => {
		this.setState({
			touched: { ...this.state.touched, [field]: true}
		});
	}

	validate(identification, firstname, lastname, email, phone) {
		const errors = {
			identification: '',
			firstname: '',
			lastname: '',
			email: '',
			phone: ''
		};
		const regx = /^[0-9]+$/;
		/*VALIDACION DE IDENTIFICACION (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (this.state.touched.identification && identification.length === 0) {
			errors.identification = 'Identificación es requerido';
			return errors;
		}
		if (this.state.touched.identification && !minLength(10, identification)) {
			errors.identification = 'Identificación debe tener al menos 10 caracteres';
			return errors;
		}
		if (this.state.touched.identification && !maxLength(15, identification)) {
			errors.identification = 'Identificación debe tener 15 caracteres o menos';
			return errors
		}
		if (this.state.touched.identification && !regx.test(identification)) {
			errors.identification = 'Identificación debe contener sólo números';
			return errors
		}
		/*VALIDACION DE NOMBRE (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (this.state.touched.firstname && firstname.length === 0) {
			errors.firstname = 'Nombre es requerido';
			return errors;
		}
		if (this.state.touched.firstname && !minLength(3, firstname)) {
			errors.firstname = 'Nombre debe tener al menos 3 caracteres';
			return errors;
		}
		if (this.state.touched.firstname && !maxLength(20, firstname)) {
			errors.firstname = 'Nombre debe tener 20 caracteres o menos';
			return errors
		}
		/*VALIDACION DE APELLIDO (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (this.state.touched.lastname && lastname.length === 0) {
			errors.lastname = 'Apellido es requerido';
			return errors;
		}
		if (this.state.touched.lastname && !minLength(3, lastname)) {
			errors.lastname = 'Apellido debe tener al menos 3 caracteres';
			return errors;
		}
		if (this.state.touched.lastname && !maxLength(20, lastname)) {
			errors.lastname = 'Apellido debe tener 20 caracteres o menos';
			return errors
		}
		/*VALIDACION DE EMAIL (REQUIRED, VALID EMAIL)*/
		if (this.state.touched.email && email.length === 0) {
			errors.email = 'Email es requerido';
			return errors;
		}
		if (this.state.touched.email && !validEmail(email)) {
			errors.email = 'Formato de email inválido';
			return errors;
		}
		/*VALIDACION DE TELEFONO (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (this.state.touched.phone && phone.length === 0) {
			errors.phone = 'Teléfono es requerido';
			return errors;
		}
		if (this.state.touched.phone && !minLength(10, phone)) {
			errors.phone = 'Teléfono debe tener al menos 10 caracteres';
			return errors;
		}
		if (this.state.touched.phone && !maxLength(15, phone)) {
			errors.phone = 'Teléfono debe tener 15 caracteres o menos';
			return errors
		}
		if (this.state.touched.phone && !regx.test(phone)) {
			errors.phone = 'Teléfono debe contener sólo números';
			return errors
		}
		return errors;
	}

	validateSubmit(identification, firstname, lastname, email, phone) {
		const errors = {
			error: false,
			identification: '',
			firstname: '',
			lastname: '',
			email: '',
			phone: ''
		};
		const regx = /^[0-9]+$/;
		/*VALIDACION DE IDENTIFICACION (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (identification.length === 0) {
			errors.error = true;
			errors.identification = 'Identificación es requerido';
			this.setState({
				touched: { ...this.state.touched, identification: true}
			});
			return errors;
		}
		if (!minLength(10, identification)) {
			errors.error = true;
			errors.identification = 'Identificación debe tener al menos 10 caracteres';
			this.setState({
				touched: { ...this.state.touched, identification: true}
			});
			return errors;
		}
		if (!maxLength(15, identification)) {
			errors.error = true;
			errors.identification = 'Identificación debe tener 15 caracteres o menos';
			this.setState({
				touched: { ...this.state.touched, identification: true}
			});
			return errors
		}
		if (!regx.test(identification)) {
			errors.error = true;
			errors.identification = 'Identificación debe contener sólo números';
			this.setState({
				touched: { ...this.state.touched, identification: true}
			});
			return errors
		}
		/*VALIDACION DE NOMBRE (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (firstname.length === 0) {
			errors.error = true;
			errors.firstname = 'Nombre es requerido';
			this.setState({
				touched: { ...this.state.touched, firstname: true}
			});
			return errors;
		}
		if (!minLength(3, firstname)) {
			errors.error = true;
			errors.firstname = 'Nombre debe tener al menos 3 caracteres';
			this.setState({
				touched: { ...this.state.touched, firstname: true}
			});
			return errors;
		}
		if (!maxLength(20, firstname)) {
			errors.error = true;
			errors.firstname = 'Nombre debe tener 20 caracteres o menos';
			this.setState({
				touched: { ...this.state.touched, firstname: true}
			});
			return errors
		}
		/*VALIDACION DE APELLIDO (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (lastname.length === 0) {
			errors.error = true;
			errors.lastname = 'Apellido es requerido';
			this.setState({
				touched: { ...this.state.touched, lastname: true}
			});
			return errors;
		}
		if (!minLength(3, lastname)) {
			errors.error = true;
			errors.lastname = 'Apellido debe tener al menos 3 caracteres';
			this.setState({
				touched: { ...this.state.touched, lastname: true}
			});
			return errors;
		}
		if (!maxLength(20, lastname)) {
			errors.error = true;
			errors.lastname = 'Apellido debe tener 20 caracteres o menos';
			this.setState({
				touched: { ...this.state.touched, lastname: true}
			});
			return errors
		}
		/*VALIDACION DE EMAIL (REQUIRED, VALID EMAIL)*/
		if (email.length === 0) {
			errors.error = true;
			errors.email = 'Email es requerido';
			this.setState({
				touched: { ...this.state.touched, email: true}
			});
			return errors;
		}
		if (!validEmail(email)) {
			errors.error = true;
			errors.email = 'Formato de email inválido';
			this.setState({
				touched: { ...this.state.touched, email: true}
			});
			return errors;
		}
		/*VALIDACION DE TELEFONO (REQUIRED, MINLENGTH, MAXLENGTH)*/
		if (phone.length === 0) {
			errors.error = true;
			errors.phone = 'Teléfono es requerido';
			this.setState({
				touched: { ...this.state.touched, phone: true}
			});
			return errors;
		}
		if (!minLength(10, phone)) {
			errors.error = true;
			errors.phone = 'Teléfono debe tener al menos 10 caracteres';
			this.setState({
				touched: { ...this.state.touched, phone: true}
			});
			return errors;
		}
		if (!maxLength(15, phone)) {
			errors.error = true;
			errors.phone = 'Teléfono debe tener 15 caracteres o menos';
			this.setState({
				touched: { ...this.state.touched, phone: true}
			});
			return errors
		}
		if (!regx.test(phone)) {
			errors.error = true;
			errors.phone = 'Teléfono debe contener sólo números';
			this.setState({
				touched: { ...this.state.touched, phone: true}
			});
			return errors
		}
		return errors;
	}

	render() {
		const errors = this.validate(this.state.identification, this.state.firstname, this.state.lastname,
									this.state.email, this.state.phone);
		return(
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to="/">Inicio</Link></BreadcrumbItem>
						<BreadcrumbItem active>Registro</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3 className="mr-3">Registro de usuario</h3>
						<hr />
					</div>         
				</div>
				<div className="row justify-content-center">
					<div className="col-12 col-md-8">
						<Form onSubmit={this.handleSubmit}>
							<Row className="form-group">
								<Label md={12} for="identification">Identificación</Label>
								<Col md={12}>
									<Input type="text" name="identification" id="identification"
										value={this.state.identification}
										invalid={errors.identification !== ''}
										onBlur={this.handleBlur('identification')}
										onChange={this.handleInputChange} />
									<FormFeedback>{errors.identification}</FormFeedback>
								</Col>
							</Row>
							<Row className="form-group">
								<Label md={12} for="firstname">Nombre</Label>
								<Col md={12}>
									<Input type="text" name="firstname" id="firstname"
										value={this.state.firstname}
										invalid={errors.firstname !== ''}
										onBlur={this.handleBlur('firstname')}
										onChange={this.handleInputChange} />
									<FormFeedback>{errors.firstname}</FormFeedback>
								</Col>
							</Row>
							<Row className="form-group">
								<Label md={12} for="lastname">Apellido</Label>
								<Col md={12}>
									<Input type="text" name="lastname" id="lastname"
										value={this.state.lastname}
										invalid={errors.lastname !== ''}
										onBlur={this.handleBlur('lastname')}
										onChange={this.handleInputChange} />
									<FormFeedback>{errors.lastname}</FormFeedback>
								</Col>
							</Row>
							<Row className="form-group">
								<Label md={12} for="email">Email</Label>
								<Col md={12}>
									<Input type="text" name="email" id="email"
										value={this.state.email}
										invalid={errors.email !== ''}
										onBlur={this.handleBlur('email')}
										onChange={this.handleInputChange} />
									<FormFeedback>{errors.email}</FormFeedback>
								</Col>
							</Row>
							<Row className="form-group">
								<Label md={12} for="phone">Teléfono</Label>
								<Col md={12}>
									<Input type="text" name="phone" id="phone"
										value={this.state.phone}
										invalid={errors.phone !== ''}
										onBlur={this.handleBlur('phone')}
										onChange={this.handleInputChange} />
									<FormFeedback>{errors.phone}</FormFeedback>
								</Col>
							</Row>
							<Row className="form-group" >
								<Col md={12} className="text-center">
									<div className="col-12 col-md-6 m-auto">
										<Button type="submit" color="primary" size="lg" block>
											Guardar
										</Button>
									</div>
								</Col>
							</Row>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}


export default Register;