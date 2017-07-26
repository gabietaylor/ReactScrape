const React = require('react');

// Create Results Comp.
const Results = React.createClass({

	getInitialState: function(){
		return {
			title: "",
			date: "",
			url: "",
			results: []
		}
	},
	// Save Article w/ Clicks
	saveClick: function(result){
		this.props.saveArticle(result.headline.main, result.pub_date, result.web_url);
	},
	// Results Child recieve Props
	componentWillReceiveProps: function(nextProps){
		const that = this;
		const myResults = nextProps.results.map(function(search, i){
		const stickClick = that.saveClick.bind(that, search);
			return <div className="list-group-item" key={i}>
				   <a href={search.web_url} target="_blank">{search.headline.main}</a>
				   <br />{search.pub_date}<br />
				   <button type="button" className="btn btn-primary" style={{'float': 'right', 'marginTop': '-39px'}} onClick={stickClick}>Save</button>
				   </div>
		});
		this.setState({results: myResults});
	},
	// Render HTML
	render: function(){
		return(
			<div className="panel panel-success">
				<div className="panel-heading">
					<h3 className="panel-title text-center"><strong>Articles</strong></h3>
				</div>
				<div className="panel-body">
						{/* Map function loops through an array in JSX*/}
						{this.state.results}
				</div>
			</div>
		)
	}
});

// Export Results
module.exports = Results;