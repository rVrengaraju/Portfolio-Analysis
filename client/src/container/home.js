
import React, { Component } from 'react';


class Home extends Component {
	
	state = {
		stocks: [],
		value: '',
	}	


	componentDidMount(){
		let tempStocks = [];
		const key = 'Q5DZG16T15D6USHS';
		fetch(`/user`)
	  	.then(res => res.json())
	  	.then(data => {
	  		tempStocks = data
	  		tempStocks.map(stock => {
	  			fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.name}&apikey=${key}`)
				.then(res => res.json())
				.then(data => {
					if(this.state.badStock === true){
						this.setState({badStock: false})
					}
					let dateString = data['Meta Data']['3. Last Refreshed'].split(" ")[0]
					let spread = this.state.stocks;
					let stockName = data['Meta Data']['2. Symbol'];
					let stockVal = data['Time Series (Daily)'][dateString]['2. high']
					spread = [...spread, [stockName, stockVal]];
					this.setState({stocks: spread})
					console.log(this.state.stocks) 
				})
				.catch(err => {
					this.setState({badStock: true})
					console.log(err)
				})
				return 0;
	  		})
	  	})
	  	.catch(err => console.log(err))
	}

	handleChange = (event) => {
    	this.setState({value: event.target.value});
  	}

	handleSubmit = (event) => {

		let insertFlag = false;
		const key = 'Q5DZG16T15D6USHS';
		let stockTicket = this.state.value;
		stockTicket = stockTicket.toUpperCase();

		for (var i = 0; i < this.state.stocks.length; i++) {
			if(this.state.stocks[i][0] === stockTicket){
				insertFlag = true;
			}
		}
		
		if(insertFlag === false){
			console.log(stockTicket)
			fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockTicket}&apikey=${key}`)
			.then(res => res.json())
			.then(data => {
				fetch('/user', {
						method: 'POST', // or 'PUT'
						body: JSON.stringify({"name": stockTicket}), // data can be `string` or {object}!
						headers:{
						'Content-Type': 'application/json'
					}
				})
				.then(res => res.json())
				.then(response => console.log('Success:', JSON.stringify(response)))
				.catch(error => console.error('Error:', error));
				console.log(data)
				if(this.state.badStock === true){
					this.setState({badStock: false})
				}
				let dateString = data['Meta Data']['3. Last Refreshed'].split(" ")[0]
				let spread = this.state.stocks;
				let stockName = data['Meta Data']['2. Symbol'];
				let stockVal = data['Time Series (Daily)'][dateString]['2. high']
				spread = [...spread, [stockName, stockVal]];
				this.setState({stocks: spread, value:""})
				console.log(this.state.stocks) 
			})
			.catch(err => {
				console.log(err)
				this.setState({badStock: true, value:""})
			})
		} else {
			console.log(stockTicket + " Duplicate")
			console.log(this.state.stocks)
			this.setState({value:""});
		}
		event.preventDefault();
	}

  sendInfo = () => {
  	fetch(`/user`)
  	.then(res => res.json())
  	.then(data => {
  		console.log(data)
  	})
  	.catch(err => console.log(err))
  }



	render() {

		let warning;
		if(this.state.badStock){
			warning = <span> Incorrect Stock Ticket </span>
		}
		return(
			<div>
				<button onClick={this.sendInfo}> Push Here </button>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
						<input type="text" value={this.state.value} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" /> 
					{warning}
				</form>
				{/*<div>
				{
					this.state.stocks.map( (data, index) => {
						return(
							<div key={index}>STOCK: {data[0]}, VALUE: ${data[1]}</div>
						)
					})
				}
				</div> */}
			</div>
		);
	}
}

export default Home;
