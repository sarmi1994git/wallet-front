import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

function Menu(props) {
	return(
		<div className="container">
			<div className="row d-flex justify-content-center">
				<div className="col-12 col-md-8" style={{marginTop: '50px'}}>
					<Button color="primary" size="lg" block
						onClick={() => props.history.push('/register')}>
						Registro
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Menu;