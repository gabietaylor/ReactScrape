const React = require('react');

// Create Saved Comp.
const Saved = React.createClass({

	getInitialState: function(){
		return {
			savedArticles: []
		}
	},
	// Delete Article w/ Clicks	
	deleteClick: function(result){
		this.props.deleteArticle(result);
	},
	// Saved Child recieve Props
	componentWillReceiveProps: function(nextProps){
		const that = this;
		console.log(nextProps);
		const myResults = nextProps.savedArticles.map(function(search, i){
			const stickClick = that.deleteClick.bind(that, search);
			return <div className="list-group-item" key={i}>
				   <a href={search.url} target="_blank">{search.title}</a>
				   <br />{search.date}<br />
				   <button type="button" className="btn btn-danger" style={{'float': 'right', 'marginTop': '-39px'}} onClick={stickClick}>Delete</button>
				   </div>
		});
		this.setState({savedArticles: myResults});
	},
	// Render HTML
	render: function(){
		return(
			<div className="panel panel-warning">
				<div className="panel-heading">
					<h3 className="panel-title text-center"><strong>Saved Articles</strong></h3>
				</div>
				<div className="panel-body">
					{/* Map function loops through an array in JSX*/}
					{this.state.savedArticles}
				</div>
			</div>
		)
	}
});

// Export Saved
module.exports = Saved;